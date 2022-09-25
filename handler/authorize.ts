import {Handler, IManager} from "../types";
import {StatusCode, StatusMessage} from "../constant/status";
import R from "../model/r";
import {encrypt} from "../util/encryptor";
import {generateToken} from "../util/jwt";
import {Manager} from "../dao/_init";
import paramValidator from "../util/param-validator";

/**
 * @description 微信授权, 获得微信用户的唯一凭证: openid
 */
// export const authorize: Handler = async (req, resp) => {
//     // 1. 获取code
//     const code = req.query.code as string;
//     // 2. 获取用户信息
//     const respult: IAuthorize | null = await getAccessTokenFromWechat(code);
//     if (!respult) {
//         return resp.redirect(`/static/index.html?message=${encodeURIComponent("微信授权失败")}`);
//     }
//     const {access_token, openid} = respult;
//     const userInfo: IUserInfo | null = await getUserInfoFromWechat(access_token, openid);
//     if (!userInfo || userInfo.errcode) {
//         return resp.redirect(`/static/index.html?message=${encodeURIComponent("获取用户信息失败")}`);
//     }
//     // 3. 将用户信息存入数据库
//     saveNewToDatabase(userInfo, openid);
//     // 4. 返回数据给前端
//     resp.redirect(302, `/static/index.html?openid=${openid}`);
// }

/**
 * @description 管理员登陆
 */
export const login: Handler = async (req, resp) => {
    const {username, password} = req.body;
    if (!paramValidator(resp, username, password)) {
        return;
    }
    const manager: IManager | any = await Manager.findOne({
        where: {
            username,
            password: encrypt(password)
        }
    });

    if (!manager) {
        return resp.send(
            R.error(StatusCode.PASSWORD_ERROR, StatusMessage.PASSWORD_ERROR)
        );
    } else if (manager.status == false) {
        return resp.send(
            R.error(StatusCode.ACCOUNT_DISABLED, StatusMessage.ACCOUNT_DISABLED)
        );
    }
    const token = await generateToken(username);
    resp.send(
        R.ok({token}, StatusMessage.OK)
    );
}

/**
 * @description 从微信服务器获取openid
 * @param code
 * 请求地址：https://api.weixin.qq.com/sns/oauth2/access_token
 */
// const getAccessTokenFromWechat = async (code: string) => {
//     // 1. 请求获取access_token
//     const promise = doRequest("https://api.weixin.qq.com/sns/oauth2/access_token", {
//         grant_type: "authorization_code",
//         appid: APPID,
//         secret: APPSECRET,
//         code: code
//     }, "get");
//
//     let respult;
//     try {
//         respult = await promise;
//     } catch (e) {
//         return null;
//     }
//     // @ts-ignore
//     const {access_token, openid} = respult;
//     return {
//         access_token,
//         openid
//     } as IAuthorize;
// }

/**
 * @description 根据access_token, openid获取微信用户信息
 * @param access_token
 * @param openid
 * 请求地址：https://api.weixin.qq.com/sns/userinfo
 */
// export const getUserInfoFromWechat = async (access_token: string, openid: string) => {
//     const promise = doRequest("https://api.weixin.qq.com/sns/userinfo", {
//         access_token: access_token,
//         openid: openid,
//         lang: "zh_CN",
//     }, "get");
//
//     let respult;
//     try {
//         respult = await promise;
//     } catch (e) {
//         return null;
//     }
//
//     // @ts-ignore
//     const {nickname, avatar} = respult;
//     return {
//         nickname,
//         avatar
//     } as IUserInfo;
// }

// const doRequest = (url: string, data: any, method: string) => {
//     return new Promise((respolve, reject) => {
//         request.defaults({
//             strictSSL: false,
//             rejectUnauthorized: false
//         })({
//             method: method,
//             url: url,
//             qs: {...data}
//         }, (err, respponse, body) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 respolve(JSON.parse(body));
//             }
//         })
//     })
// }