import _xss from 'xss';
import {Middleware} from "../types";

export const xss: Middleware = (req, res, next) => {
    req.body = _xss(req.body);
    next();
};
