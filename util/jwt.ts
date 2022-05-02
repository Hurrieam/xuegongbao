import jwt from 'jsonwebtoken';
import config from "../util/env-parser";

const {JWT_TOKEN} = config

/**
 * @description 生产token
 * @param data payload
 * @returns token
 */
export const generateToken = (data: string) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 7 days
        data: data
    }, JWT_TOKEN);
}

/**
 * @description 验证token是否有效
 * @param  token token
 * @return  true or false
 */
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_TOKEN);
    } catch (e) {
        return false
    }
}
