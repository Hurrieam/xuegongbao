import {Handler, IReservation} from "../types";
import {isValidString, toValidDigit} from "../util/checker";
import R from "../model/r";
import {StatusCode, StatusMessage} from "../constant/status";
import CommonDAO from "../dao/common";
import model from "../dao/model";
import {getOpenidFromHeader} from "../util/openid";

/**
 * @tag user
 * @description 添加一个预约项 参数: {}
 */
export const addReservationItem: Handler = async (req, res) => {
    const params: IReservation = req.body;
    const {type, stuName, sdept, content, time, contact} = params;
    if (!isValidString(type)
        || !isValidString(stuName)
        || !isValidString(sdept)
        || !isValidString(content)
        || !isValidString(time)
        || !isValidString(contact)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.addOne(model.RESERVATION, params, getOpenidFromHeader(req));
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
};

/**
 * @tag admin
 * @description 分页查询预约项列表 参数: {start, limit}
 */
export const findAllReservations: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if (!isValidString(start) || !isValidString(limit)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const {rows, count: total} = await CommonDAO.findSome(model.RESERVATION, toValidDigit(start), toValidDigit(limit));
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
 * @description 根据id查询预约项 参数: {id}
 */
export const findReservationById: Handler = async (req, res) => {
    const {id} = req.query;
    if (!isValidString(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.findOne(model.RESERVATION, toValidDigit(id));
    const r = item ? R.ok(item, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
};


/**
 * @tag admin
 * @description 根据id删除预约项 参数: {id}
 */
export const deleteReservationById: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isValidString(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.delOne(model.RESERVATION, toValidDigit(id));
    const r = item ? R.ok(item, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
};

/**
 * @tag admin
 * @description 根据有id更新预约状态 参数: {id}
 */
export const updateReservationById: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isValidString(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.updateStatus(model.RESERVATION, toValidDigit(id), true);
    const r = item ? R.ok(item, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
}