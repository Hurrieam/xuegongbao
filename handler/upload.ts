import {StatusCode, StatusMessage} from "../constant/status";
import {Handler} from "../types";
import R from "../model/r";
import {cos} from "../dao/_init";
import cosConfig from "../config/cos";

export const upload: Handler = async (req, res) => {
    // 1. 获取上传文件
    const {file} = req;
    if (!file) {
        res.send(
            R.error(StatusCode.UPLOAD_FILE_NOT_FOUND, StatusMessage.UPLOAD_FILE_NOT_FOUND)
        );
        return;
    }
    // 2. 获取文件元数据
    const {originalname: filename, mimetype} = file;
    const extname = filename.substring(filename.lastIndexOf(".")) || ".png";
    if(mimetype !== "image/jpeg" && mimetype !== "image/png") {
        res.send(
            R.error(StatusCode.UPLOAD_FILE_TYPE_ERROR, StatusMessage.UPLOAD_FILE_TYPE_ERROR)
        );
        return;
    }
    const tempFilename = `${Date.now()}${extname}`;
    // 3. 上传文件
    const response = await cos.putObject({
        Bucket: cosConfig.BUCKET,
        Region: cosConfig.REGION,
        Key: cosConfig.KEY_PREFIX + tempFilename,
        StorageClass: 'STANDARD',
        Body: file.buffer
    });
    const {statusCode, Location} = response;
    statusCode === 200 ?
        res.send(R.ok(Location, StatusMessage.OK)) :
        res.send(R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR));
};