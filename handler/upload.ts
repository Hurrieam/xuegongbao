import {StatusCode, StatusMessage} from "../constant/status";
import {Handler} from "../types";
import R from "../model/r";
import {cos} from "../dao/_init";
import config from "../util/env-parser";

const {BUCKET, REGION, KEY_PREFIX} = config;
/**
 * @tag user
 * @description 上传图片并返回图片地址 参数: {file}
 */
export const upload: Handler = async (req, res) => {
    // 1. 获取上传文件
    const {file} = req;
    if (!file) {
        return res.send(
            R.error(StatusCode.UPLOAD_FILE_NOT_FOUND, StatusMessage.UPLOAD_FILE_NOT_FOUND)
        );
    }
    // 2. 获取文件元数据
    const {originalname: filename, mimetype} = file;
    const extname = filename.substring(filename.lastIndexOf(".")) || ".png";
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return res.send(
            R.error(StatusCode.UPLOAD_FILE_TYPE_ERROR, StatusMessage.UPLOAD_FILE_TYPE_ERROR)
        );
    }
    const tempFilename = `${Date.now()}${extname}`;
    // 3. 上传文件
    const response = await cos.putObject({
        Bucket: BUCKET,
        Region: REGION,
        ACL: 'public-read',
        Key: KEY_PREFIX + tempFilename,
        StorageClass: 'STANDARD',
        Body: file.buffer
    });
    const {statusCode, Location} = response;
    statusCode === 200 ?
        res.send(R.ok(Location, StatusMessage.OK)) :
        res.send(R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR));
};