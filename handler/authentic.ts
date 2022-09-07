// import sha1 from "sha1";
// import {Handler} from "../types";
// import {StatusMessage} from "../constant/status";
// import config from "../util/env-parser";
//
// const {WECHAT_TOKEN} = config;
// /**
//  * @description 用于验证微信服务器的请求
//  */
// export const authentic: Handler = (req, res) => {
//     const {signature, echostr, timestamp, nonce} = req.query;
//
//     // 将参与微信加密签名的三个参数按照字典排序并组合
//     const str = [WECHAT_TOKEN, timestamp, nonce].sort().join('');
//     const sha1Str = sha1(str);
//
//     if (sha1Str === signature) {
//         res.send(echostr);
//     } else {
//         res.end(StatusMessage.UNKNOWN_ERROR);
//     }
// };