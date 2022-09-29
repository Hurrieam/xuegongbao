import sharp from "sharp";
import {StatusCode, StatusMessage} from "../constant/status";
import {Handler} from "../types";
import R from "../model/r";
import {cos} from "../dao/_init";
import config from "../util/env-parser";

const {BUCKET, REGION} = config;

const uploadToCos = async (prefix: string, filename: string, buffer: any) => {
    const response = await cos.putObject({
        Bucket: BUCKET,
        Region: REGION,
        ACL: 'public-read',
        Key: `${prefix}/${filename}`,
        StorageClass: 'STANDARD',
        Body: buffer
    });
    const {statusCode, Location: url} = response;
    const ok = statusCode === 200;
    return {ok, url};
}

/**
 * @tag user
 * @description 上传图片并返回图片地址 参数: {file}
 */
export const uploadImage: Handler = async (req, resp) => {
    const {file} = req;
    const {type} = req.query;
    if (!type) {
        return R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM);
    }
    if (!file) {
        return resp.send(
            R.error(StatusCode.UPLOAD_FILE_NOT_FOUND, StatusMessage.UPLOAD_FILE_NOT_FOUND)
        );
    }
    const {mimetype} = file;
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return resp.send(
            R.error(StatusCode.UPLOAD_FILE_TYPE_ERROR, StatusMessage.UPLOAD_FILE_TYPE_ERROR)
        );
    }
    const {webpBuffer, filename} = await toWebp(file);
    const {ok, url} = await uploadToCos(type as string, filename, webpBuffer);
    resp.send(ok ? R.ok(url, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR))
};
/**
 * 图片转webp格式
 * @param file 预备图片文件
 */
const toWebp = async (file: Express.Multer.File) => {
    const filename = `${Date.now()}.webp`;
    const buffer = file.buffer;
    const webpBuffer = await sharp(buffer)
        // .webp({lossless: true})
        .webp()
        .toBuffer();
    return {webpBuffer, filename};
}