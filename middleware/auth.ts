import {Middleware} from "../types";
import {verifyToken} from "../util/jwt";

export const auth: Middleware = (req, res, next) => {
    if (req.headers["authorization"] && verifyToken(req.headers["authorization"] as string)) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};