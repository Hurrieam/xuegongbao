import {Handler, IAdmin} from "../types";
import axios from "axios";
import wechatConfig from "../config/wechat";
import {isValidString} from "../util/checker";
import {StatusCode, StatusMessage} from "../constant/status";
import R from "../model/r";
import {Admin} from "../dao/_init";
import {encrypt} from "../util/encryptor";

const {appid, appsecret} = wechatConfig;
/**
 * 微信授权, 获得微信用户的唯一凭证: openid
 * @param req
 * @param res
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
    // 3. 返回openid
    res.redirect(`/static/index.html?openid=${openid}`);
}

/**
 * 管理员登陆
 * @param req
 * @param res
 */
export const login: Handler = async (req, res) => {
    const {username, password} = req.body;
    if (!isValidString(username) || !isValidString(password)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    const result: IAdmin | any = await Admin.findOne({
        where: {
            username,
            password: encrypt(password)
        }
    });

    if (!result) {
        res.send(
            R.error(StatusCode.PASSWORD_ERROR, StatusMessage.PASSWORD_ERROR)
        );
        return;
    } else if (result.status == false) {
        res.send(
            R.error(StatusCode.ACCOUNT_DISABLED, StatusMessage.ACCOUNT_DISABLED)
        );
        return;
    }

    res.send(
        R.ok(null, StatusMessage.OK)
    );
}

/**
 * 从微信服务器获取access_token
 * @param code
 */
const getAccessTokenFromWechat = async (code: string) => {
    // 1. 请求获取access_token
    const response = await axios.request({
        method: "get",
        url: "https://api.weixin.qq.com/sns/oauth2/access_token",
        params: {
            grant_type: "authorization_code",
            appid: appid,
            secret: appsecret,
            code: code
        }
    })
    const {status, data} = response;
    if (status != 200) {
        return null;
    }

    return data;
}