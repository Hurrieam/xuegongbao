import {Handler, IReservation} from "../types";
import R from "../model/r";
import {StatusMessage} from "../constant/status";
import CommonDAO from "../dao/common";
import model from "../dao/table";
import paramValidator from "../util/param-validator";
import {getFingerprint, getStuId} from "../util/header-param";
import {toDigit} from "../util/checker";
import {Reservation} from "../dao/_init";
import {findUserByStuId} from "./user";
import {wrapWithOwner} from "../util/query-owner";

/**
 * @tag user
 * @description 添加一个预约项
 * @params {stuId, type, content, time, contactNumber}
 */
export const createReservationItem: Handler = async (req, resp) => {
    const respervation: IReservation = req.body;
    const {type, content, date, contactMethod, contactNumber} = respervation;
    if (!paramValidator(resp, type, content, date, contactMethod, contactNumber)) {
        return;
    }
    await Reservation.create({
        fingerprint: getFingerprint(req),
        stuId: getStuId(req),
        type, content, date, contactMethod, contactNumber
    })
    resp.send(R.ok(null, StatusMessage.OK));
};

/**
 * @tag admin
 * @description 分页查询预约项列表
 * @params {page, pageSize}
 */
export const findReservationList: Handler = async (req, resp) => {
    const {page, pageSize} = req.query;
    const {rows, count: total} = await CommonDAO.findSome(model.RESERVATION, toDigit(page), toDigit(pageSize));
    await wrapWithOwner(rows);
    const data = {
        items: rows,
        count: rows?.length,
        total: total
    };
    resp.send(R.ok(data, StatusMessage.OK));
};

/**
 * @tag admin & user
 * @description 根据id查询预约项
 * @params {id}
 */
export const findReservation: Handler = async (req, resp) => {
    const {id} = req.query;
    const item = await CommonDAO.findOne(model.RESERVATION, toDigit(id));
    if (item) {
        const stuId = item.getDataValue("stuId");
        item.setDataValue("owner", await findUserByStuId(stuId));
    }
    resp.send(R.ok(item, StatusMessage.OK));
};


/**
 * @tag admin
 * @description 根据id删除预约项
 * @params {id}
 */
export const deleteReservation: Handler = async (req, resp) => {
    const {id} = req.body;
    const item = await CommonDAO.delOne(model.RESERVATION, toDigit(id));
    resp.send(R.ok(item, StatusMessage.OK));
};

/**
 * @tag admin
 * @description 根据有id更新预约状态
 * @params {id}
 */
export const updateReservationStatus: Handler = async (req, resp) => {
    const {id} = req.body;
    const item = await CommonDAO.updateStatus(model.RESERVATION, toDigit(id), true);
    resp.send(R.ok(item, StatusMessage.OK));
}