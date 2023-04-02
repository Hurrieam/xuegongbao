import {Handler} from "../types";
import paramValidator from "../util/param-validator";
import {sendMail} from "../util/mailer";
import R from "../model/r";

/**
 * @tag user
 * @description 用户反馈
 */
export const createFeedback: Handler = async (req, resp) => {
    const feedback = req.body;
    const {type, content, images} = feedback;
    if (!paramValidator(resp, type, content)) {
        return;
    }
    let html = `
        <h3>${type}:</h3>
        <p>${content}</p>
    `;
    const imgs = JSON.parse(images);
    if (imgs.length > 0) {
        for(const img of imgs) {
            html += `<img src="${'https://' + img}"/>`;
        }
    }
    const messageId = await sendMail("学工宝-功能反馈", html, null);
    resp.send(R.ok(messageId));
};