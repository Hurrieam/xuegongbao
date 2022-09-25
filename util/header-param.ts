import {Request} from "express";

/**
 * @description 从请求中获取学生ID
 */
export const getStuId = (req: Request): string => {
    return  req.headers["stuid"] as string;
}

/**
 * @description 从请求中获取客户端指纹
 */
export const getFingerprint = (req: Request): string => {
    return req.headers["fingerprint"] as string || "";
}