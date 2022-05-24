import {Handler} from "../types";

/**
 * @tag user & admin
 * @description 用于客户端和服务端的连接检测
 */
export const ping: Handler = (req, res) => {
    const header = req.headers;
    console.log(header);
    console.log(JSON.stringify(header));
    res.status(200).end("pong");
};