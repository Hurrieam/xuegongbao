import {Middleware} from "../types";
import multer from "multer";
import {StatusCode, StatusMessage} from "../constant/status";
import R from "../model/r";

// Middleware: file uploader
export const uploader: Middleware = (req, res, next) => {
    multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    }).single("image")(req, res, (err) => {
        if (err) {
            return res.send(
                R.error(StatusCode.ILLEGAL_PARAM,StatusMessage.ILLEGAL_PARAM)
            )
        } else {
            next();
        }
    });
};