import {Middleware} from "../types";

// Middleware: 日志
const logger: Middleware = (req, res, next) => {
    console.log("path: [", req.path, "]\t method: [", req.method, "]\t query: [", req.query, "]\t body: [", req.body, "]");
    next();
};

export default logger;