import {Handler, ILostAndFound} from "../types";
import R from "../model/r";
import CommonDAO from "../dao/common";
import model from "../dao/model";
import {isDigit, isValidString, toValidDigit} from "../util/checker";
import {StatusCode, StatusMessage} from "../constant/status";

/**
 * @description 添加一条失物招领信息 参数: {openid, itemName, location?, lostTime?, description, images?, stuName?, contact}
 */
export const addLAF: Handler = async (req, res) => {
    const laf: ILostAndFound = req.body;
    if (!isValidString(laf.openid)
        || !isValidString(laf.itemName)
        || !isValidString(laf.description)
        || !isValidString(laf.contact)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    const item = await CommonDAO.addOne(model.LOST_AND_FOUND, laf)
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
}

/**
 * @description 根据id删除一条失物招领信息 参数: {id}
 */
export const delLAF: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    await CommonDAO.delOne(model.LOST_AND_FOUND, toValidDigit(id));
    res.send(R.ok(null, StatusMessage.OK));
}


/**
 * @description 根据id更新失物招领的状态 未找到 —> 已找到 参数: {id}
 */
export const updateLAFStatus: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    const item = await CommonDAO.updateStatus(model.LOST_AND_FOUND, toValidDigit(id), true);
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
}

/**
 * @description 分页查找失物招领信息 参数: {start, limit}
 */
export const findLAFs: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if (!isDigit(start) || !isDigit(limit)) {
        res.send(R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM));
        return;
    }
    const lafs = await CommonDAO.getSome(model.LOST_AND_FOUND, toValidDigit(start), toValidDigit(limit));
    const data = {
        total: lafs.length,
        items: lafs
    }
    const r = lafs ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}
/**
 * @description 根据id查找失物招领信息 参数: {id}
 */
export const findLAFbyId: Handler = async (req, res) => {
    const {id} = req.query;
    if (!isDigit(id)) {
        res.send(R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM));
        return;
    }
    const laf = await CommonDAO.getOne(model.LOST_AND_FOUND, toValidDigit(id));
    const r = laf ? R.ok(laf, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @description 根据openid查找失物招领信息 参数: {openid}
 */
export const findLAFbyUser: Handler = async (req, res) => {
    const {openid, start, limit} = req.query;
    if (!isValidString(openid) || !isDigit(start) || !isDigit(limit)) {
        res.send(R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM));
        return;
    }
    const laf = await CommonDAO.getSome(model.LOST_AND_FOUND,toValidDigit(start), toValidDigit(limit));
    const data = {
        total: laf.length,
        items: laf
    }
    const r = laf ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}