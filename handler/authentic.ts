import sha1 from "sha1";
import {Handler} from "../types";
import wechatConfig from "../config/wechat";
import {StatusMessage} from "../constant/status";

/**
 * 用于验证微信服务器的请求
 * @param req
 * @param res
 */
export const authentic: Handler = (req, res) => {
    const {signature, echostr, timestamp, nonce} = req.query;
    const {token} = wechatConfig;

    // 将参与微信加密签名的三个参数按照字典排序并组合
    const str = [token, timestamp, nonce].sort().join('');
    const sha1Str = sha1(str);

    if (sha1Str === signature) {
        res.send(echostr);
    } else {
        res.end(StatusMessage.UNKNOWN_ERROR);
    }
};