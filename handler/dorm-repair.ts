import {Handler, IRepairItem} from "../types";
import {isDigit, isValidString, toValidDigit} from "../util/checker";
import R from "../model/r";
import {StatusCode, StatusMessage} from "../constant/status";
import CommonDAO from "../dao/common";
import model from "../dao/model";
import {getOpenidFromHeader} from "../util/openid";

/**
 * @tag user
 * @description 添加一个保修订单 参数: {openid, itemName, description, dorm, room, stuName?, contact}
 */
export const addDormRepairItem: Handler = async (req, res) => {
    const repairItem: IRepairItem = req.body;
    const {itemName, description, dorm, room, stuName, contact} = repairItem;
    if (!isValidString(itemName)
        || !isValidString(description)
        || !isValidString(dorm)
        || !isValidString(room)
        || !isValidString(stuName)
        || !isValidString(contact)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.addOne(model.REPAIR, repairItem, getOpenidFromHeader(req));
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
};

/**
 * @tag admin
 * @description 分页查询所有报修订单 参数: {start, limit}
 */
export const findAllRepairItems: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if (!isDigit(start) || !isDigit(limit)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const {rows, count: total} = await CommonDAO.findSome(model.REPAIR, toValidDigit(start), toValidDigit(limit));
    const data = {
        items: rows,
        count: rows?.length,
        total: total
    };
    const r = rows ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
};

/**
 * @tag admin & user
 * @description 根据id查询报修订单 参数: {id}
 */
export const findRepairItemById: Handler = async (req, res) => {
    const {id} = req.query;
    if (!isDigit(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.findOne(model.REPAIR, toValidDigit(id));
    const r = item ? R.ok(item, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
};

/**
 * @tag admin
 * @description 根据id删除报修订单 参数: {id}
 */
export const deleteRepairItemById: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.delOne(model.REPAIR, toValidDigit(id));
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
};

/**
 * @tag admin
 * @description 根据id更新报修订单状态 参数: {id}
 */
export const updateRepairItemStatusById: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.updateStatus(model.REPAIR, toValidDigit(id), true);
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
};
