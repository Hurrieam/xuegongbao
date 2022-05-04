import {Handler} from "../types";

/**
 * @tag user & admin
 * @description 用于客户端和服务端的连接检测
 */
export const ping: Handler = (req, res) => {
    res.status(200).end("pong");
};