import {Middleware} from "../types";
import {getFingerprint, getStuId} from "../util/header-param";

// Middleware: 日志
const logger: Middleware = (req, res, next) => {
    console.log("path: [", req.path, "], method: [", req.method, "], query: ", req.query, ", body: ", req.body, ", stuId: [", getStuId(req), "]", ", fingerprint: [", getFingerprint(req), "]");
    next();
};

export default logger;