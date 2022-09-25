import {Response} from 'express';
import {isAllNotBlank} from "./checker";
import R from "../model/r";
import {StatusCode, StatusMessage} from "../constant/status";

const paramValidator = (res: Response, ...args: any[]) => {
    if (!isAllNotBlank(args)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return false;
    }
    return true;
}

export default paramValidator;