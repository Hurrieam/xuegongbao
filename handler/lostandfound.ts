import {Op} from "sequelize";
import {Handler, ILostAndFound} from "../types";
import R from "../model/r";
import CommonDAO from "../dao/common";
import model from "../dao/model";
import {isDigit, isValidString, toValidDigit} from "../util/checker";
import {StatusCode, StatusMessage} from "../constant/status";
import {LostAndFound} from "../dao/_init";

/**
 * @tag user
 * @description 添加一条失物招领信息 参数: {openid, itemName, location?, lostTime?, description, images?, stuName?, contact}
 */
export const addLAFItem: Handler = async (req, res) => {
    const laf: ILostAndFound = req.body;
    if (!isValidString(laf.openid)
        || !isValidString(laf.itemName)
        || !isValidString(laf.description)
        || !isValidString(laf.contact)
        || (laf.type != "lost" && laf.type != "found")) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.addOne(model.LOST_AND_FOUND, laf)
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
}

/**
 * @tag admin
 * @description 根据id删除一条失物招领信息 参数: {id}
 */
export const delLAFById: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    await CommonDAO.delOne(model.LOST_AND_FOUND, toValidDigit(id));
    res.send(R.ok(null, StatusMessage.OK));
}


/**
 * @tag user
 * @description 根据id更新失物招领的状态 未找到 —> 已找到 参数: {id}
 */
export const updateLAFStatusById: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.updateStatus(model.LOST_AND_FOUND, toValidDigit(id), true);
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
}

/**
 * @tag user & admin
 * @description 分页查找失物招领信息列表 参数: {start, limit}
 */
export const findLAFList: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if (!isDigit(start) || !isDigit(limit)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const lafs = await LostAndFound.findAll({
        where: {
            [Op.and]: [
                {isDeleted: 0},
                {status: 0}
            ]
        },
        offset: toValidDigit(start),
        limit: toValidDigit(limit),
        order: [['id', 'DESC']]
    });
    const total = await CommonDAO.getCount(model.LOST_AND_FOUND);
    const data = {
        items: lafs,
        count: lafs.length,
        total: total
    }
    const r = lafs ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @tag user & admin
 * @description 根据id查找某条失物招领信息详情 参数: {id}
 */
export const findLAFbyId: Handler = async (req, res) => {
    const {id} = req.query;
    if (!isDigit(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const laf = await CommonDAO.getOne(model.LOST_AND_FOUND, toValidDigit(id));
    const r = laf ? R.ok(laf, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @tag user
 * @description 根据openid查找分页查找失物招领信息列表 参数: {openid, start, limit}
 */
export const findLAFsByUser: Handler = async (req, res) => {
    const {openid, start, limit} = req.query;
    if (!isValidString(openid) || !isDigit(start) || !isDigit(limit)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const lafs = await LostAndFound.findAll({
        where: {
            [Op.and]: [
                {
                    openid: openid
                },
                {
                    isDeleted: 0
                }
            ]
        },
        limit: toValidDigit(limit),
        offset: toValidDigit(start),
        order: [
            ['id', 'DESC']
        ]
    });
    const total = await CommonDAO.getCount(model.LOST_AND_FOUND);
    const data = {
        items: lafs,
        count: lafs.length,
        total: total
    }
    const r = lafs ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}