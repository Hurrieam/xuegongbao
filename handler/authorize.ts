import request from "request";
import {Handler, IAdmin} from "../types";
import {isValidString} from "../util/checker";
import {StatusCode, StatusMessage} from "../constant/status";
import R from "../model/r";
import {Admin} from "../dao/_init";
import {encrypt} from "../util/encryptor";
import config from "../util/env-parser";
import {generateToken} from "../util/jwt";
import {saveNewToDatabase} from "./user";

const {APPID, APPSECRET} = config;

interface IAuthorize {
    access_token: string;
    openid: string;
}

export interface IUserInfo {
    nickname: string;
    stuName: string;
    stuClass: string;
    stuId: string;
    avatar: string;
    errcode?: number;
}

/**
 * @description 微信授权, 获得微信用户的唯一凭证: openid
 */
export const authorize: Handler = async (req, res) => {
    // 1. 获取code
    const code = req.query.code as string;
    // 2. 获取用户信息
    const result: IAuthorize | null = await getAccessTokenFromWechat(code);
    if (!result) {
        return res.redirect(`/static/index.html?message=${encodeURIComponent("微信授权失败")}`);
    }
    const {access_token, openid} = result;
    const userInfo: IUserInfo | null = await getUserInfoFromWechat(access_token, openid);
    if (!userInfo || userInfo.errcode) {
        return res.redirect(`/static/index.html?message=${encodeURIComponent("获取用户信息失败")}`);
    }
    // 3. 将用户信息存入数据库
    saveNewToDatabase(userInfo, openid);
    // 4. 返回数据给前端
    res.redirect(302, `/static/index.html?openid=${openid}`);
}

/**
 * @description 管理员登陆
 */
export const login: Handler = async (req, res) => {
    const {username, password} = req.body;
    if (!isValidString(username) || !isValidString(password)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const result: IAdmin | any = await Admin.findOne({
        where: {
            username,
            password: encrypt(password)
        }
    });

    if (!result) {
        return res.send(
            R.error(StatusCode.PASSWORD_ERROR, StatusMessage.PASSWORD_ERROR)
        );
    } else if (result.status == false) {
        return res.send(
            R.error(StatusCode.ACCOUNT_DISABLED, StatusMessage.ACCOUNT_DISABLED)
        );
    }
    const token = await generateToken(username);
    res.send(
        R.ok({token}, StatusMessage.OK)
    );
}

/**
 * @description 从微信服务器获取openid
 * @param code
 * 请求地址：https://api.weixin.qq.com/sns/oauth2/access_token
 */
const getAccessTokenFromWechat = async (code: string) => {
    // 1. 请求获取access_token
    const promise = doRequest("https://api.weixin.qq.com/sns/oauth2/access_token", {
        grant_type: "authorization_code",
        appid: APPID,
        secret: APPSECRET,
        code: code
    }, "get");

    let result;
    try {
        result = await promise;
    } catch (e) {
        return null;
    }
    // @ts-ignore
    const {access_token, openid} = result;
    return {
        access_token,
        openid
    } as IAuthorize;
}

/**
 * @description 根据access_token, openid获取微信用户信息
 * @param access_token
 * @param openid
 * 请求地址：https://api.weixin.qq.com/sns/userinfo
 */
export const getUserInfoFromWechat = async (access_token: string, openid: string) => {
    const promise = doRequest("https://api.weixin.qq.com/sns/userinfo", {
        access_token: access_token,
        openid: openid,
        lang: "zh_CN",
    }, "get");

    let result;
    try {
        result = await promise;
    } catch (e) {
        return null;
    }

    // @ts-ignore
    const {nickname, avatar} = result;
    return {
        nickname,
        avatar
    } as IUserInfo;
}

const doRequest = (url: string, data: any, method: string) => {
    return new Promise((resolve, reject) => {
        request.defaults({
            strictSSL: false,
            rejectUnauthorized: false
        })({
            method: method,
            url: url,
            qs: {...data}
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })
}