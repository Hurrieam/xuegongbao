import {Handler} from "../types";

/**
 * @tag user & admin
 * @description 用于客户端和服务端的连接检测
 * @deprecated since now
 */
const ping: Handler = (req, resp) => {
    const header = req.headers;
    console.log(header);
    console.log(JSON.stringify(header));
    resp.status(200).end("pong");
};