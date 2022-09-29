import {Middleware} from "../types";
import {verifyToken} from "../util/jwt";
import {StatusCode, StatusMessage} from "../constant/status";
import R from "../model/r";

export const authAdmin: Middleware = (req, res, next) => {
    if (!req.headers["authorization"] || !verifyToken(req.headers["authorization"])) {
        return res.send(
            R.error(StatusCode.UNAUTHORIZED, StatusMessage.UNAUTHORIZED)
        )
    }
    next();
};

// export const authUser: Middleware = (req, res, next) => {
//     if (!getStuId(req)) {
//         return res.send(
//             R.error(StatusCode.UNAUTHORIZED, StatusMessage.UNAUTHORIZED)
//         );
//     }
//     next();
// }