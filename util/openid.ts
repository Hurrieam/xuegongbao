import {Request} from "express";

/**
 * @description 从请求中获取openid
 */
export const getOpenidFromHeader = (req: Request): string => {
    const openid = req.headers["openid"] as string || "";
    return isValidOpenid(openid) ? openid : "";
}

/**
 * @description 浅校验openid
 */
export const isValidOpenid = (openid: string): boolean => {
    return !isNaN(Number(openid)) && openid.length >= 8;
}
