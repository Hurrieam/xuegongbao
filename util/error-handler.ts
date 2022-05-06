import {Request, Response} from 'express';
import {StatusCode, StatusMessage} from "../constant/status";
import R from "../model/r";

export const errorHandler = (err: any, req: Request, res: Response) => {
    switch (err.name) {
        case 'SequelizeDatabaseError':
            return res.send(
                // @ts-ignore
                R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM, err?.parent.sqlMessage)
            );
        default:
            return res.send(
                // @ts-ignore
                R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR, err.message)
            );
    }
}