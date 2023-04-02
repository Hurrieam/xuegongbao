import {Middleware} from "../types";
import {verifyToken} from "../util/jwt";

export const authAdmin: Middleware = (req, res, next) => {
    if (!req.headers["authorization"] || !verifyToken(req.headers["authorization"])) {
        console.log("authAdmin failed");
        return res.status(401).json({code: 401, message: "Unauthorized"});
    }
    next();
};