import nodemailer from "nodemailer";
import config from "../util/env-parser";

const {MAIL_SENDER, MAIL_CLIENT_KEY, MAIL_RECIPIENTS} = config;

/**
 * 发送邮件
 * @param to 邮件接收者,多个用都逗号分割
 */
export const sendMail = async (subject: string, content: string, to: string | null) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.exmail.qq.com",
        port: 465,
        secure: true,
        auth: {
            user: MAIL_SENDER,
            pass: MAIL_CLIENT_KEY
        }
    });
    const info = await transporter.sendMail({
        from: MAIL_SENDER,
        to: to ?? MAIL_RECIPIENTS,
        subject: subject,
        html: content
    });
    return info.messageId;
}