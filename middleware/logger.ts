import {Middleware} from "../types";

// Middleware: 日志
const logger: Middleware = (req, res, next) => {
    console.log("path: [", req.path, "]\tmethod: [", req.method, "]\tquery: [", req.query, "]\tbody: [", req.body, "]");
    next();
};

export default logger;