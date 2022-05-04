import {Request, Response} from 'express';
import {StatusCode} from "../constant/status";
import R from "../model/r";

export const errorHandler = (err: any, req: Request, res: Response, next: () => void) => {
    if (err) {
        return res.send(
            R.error(StatusCode.UNKNOWN_ERROR, err.message)
        );
    }
    next();
}