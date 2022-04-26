import crypto from "crypto";

const algorithm = "aes128"; // algorithm: 加密算法
const key = "93BBF494DA8816F2"; // key: 加密密钥  aes128->16位长度 aes192->24位长度 aes256->32位长度
const iv = "0396DBF13C492447";  // iv: 初始化向量

export const encrypt = (str: string) => {
    // crypto.createCipheriv（algorithm, key, iv [options]）
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(str, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted.toUpperCase();
};