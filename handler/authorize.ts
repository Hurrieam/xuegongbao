import {Handler, IAdmin} from "../types";
import axios from "axios";
import {isValidString} from "../util/checker";
import {StatusCode, StatusMessage} from "../constant/status";
import R from "../model/r";
import {Admin, User} from "../dao/_init";
import {encrypt} from "../util/encryptor";
import config from "../util/env-parser";
import {generateToken} from "../util/jwt";
import CommonDAO from "../dao/common";
import model from "../dao/model";

const {APPID, APPSECRET} = config;
/**
 * @description 微信授权, 获得微信用户的唯一凭证: openid
 */
export const authorize: Handler = async (req, res) => {
    // 1. 获取code
    const code = req.query.code as string;
    // 2. 获取access_token
    const result = await getAccessTokenFromWechat(code);
    if (!result) {
        res.redirect(`/static/error.html?message=${encodeURIComponent("微信授权失败")}`);
        return;
    }
    const {openid} = result;
    await User.findOrCreate({where: {openid}, defaults: {openid}});
    // 3. 返回openid
    res.redirect(`/static/index.html?openid=${openid}`);
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
    // 登陆成功后, 将用户信息存入session
    // @ts-ignore
    const token = await generateToken(username);
    res.send(
        R.ok({token}, StatusMessage.OK)
    );
}

/**
 * @description 从微信服务器获取access_token/openid
 * @param code
 */
export const getAccessTokenFromWechat = async (code: string) => {
    // 1. 请求获取access_token
    const response = await axios.request({
        method: "get",
        url: "https://api.weixin.qq.com/sns/oauth2/access_token",
        params: {
            grant_type: "authorization_code",
            appid: APPID,
            secret: APPSECRET,
            code: code
        }
    })
    const {status, data} = response;
    if (status != 200) {
        return null;
    }
    return data;
}