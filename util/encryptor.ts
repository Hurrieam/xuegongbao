import crypto from "crypto";
import config from "../util/env-parser";

/**
 * algorithm: 加密算法
 * key: 加密密钥 aes128->16位长度 aes192->24位长度 aes256->32位长度
 * iv: 初始化向量
 */
const {ALGORITHM, KEY, IV} = config;
export const encrypt = (str: string) => {
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
    let encrypted = cipher.update(str, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted.toUpperCase();
};