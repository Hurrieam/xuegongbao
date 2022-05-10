import {Middleware} from "../types";
import {getOpenidFromHeader} from "../util/openid";

// Middleware: 日志
const logger: Middleware = (req, res, next) => {
    console.log("path: [", req.path, "]\t method: [", req.method, "]\t query: [", req.query, "]\t body: [", req.body, "]", "\t openid: [", getOpenidFromHeader(req), "]");
    next();
};

export default logger;