import {Handler, IDormRepair,} from "../types";
import R from "../model/r";
import {StatusMessage} from "../constant/status";
import CommonDAO from "../dao/common";
import model from "../dao/table";
import {toDigit} from "../util/checker";
import paramValidator from "../util/param-validator";
import {DormRepair} from "../dao/_init";
import {getFingerprint, getStuId} from "../util/header-param";
import {findUserByStuId} from "./user";
import {wrapWithOwner} from "../util/query-owner";

/**
 * @tag user
 * @description 添加一个报修单
 * @params  {stuId, itemName, description, dorm, room, contact}
 */
export const createDormRepairItem: Handler = async (req, resp) => {
    const repairItem: IDormRepair = req.body;
    const {itemName, description, dorm, room, contactNumber} = repairItem;
    if (!paramValidator(resp, itemName, description, dorm, room, contactNumber)) {
        return;
    }
    await DormRepair.create({
        fingerprint: getFingerprint(req),
        stuId: getStuId(req),
        itemName, description, dorm, room, contactNumber
    });
    resp.send(R.ok(null, StatusMessage.OK));
};

/**
 * @tag admin
 * @description 分页查询报修单
 * @params  {page, pageSize}
 */
export const findRepairList: Handler = async (req, resp) => {
    const {page, pageSize} = req.query;
    const {rows, count: total} = await DormRepair.findAndCountAll({
        where: {
            deleted: false,
        },
        offset: toDigit(page),
        limit: toDigit(pageSize),
        order: [
            ['id', 'DESC']
        ]
    });
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
 * @description 根据id查询报修单
 * @params  {id}
 */
export const findRepairItem: Handler = async (req, resp) => {
    const {id} = req.query;
    const item = await CommonDAO.findOne(model.REPAIR, toDigit(id));
    if (item) {
        const stuId = item.getDataValue("stuId");
        item.setDataValue("owner", await findUserByStuId(stuId));
    }
    resp.send(R.ok(item, StatusMessage.OK));
};

/**
 * @tag admin
 * @description 根据id删除报修订单
 * @params  {id}
 */
export const deleteRepairItem: Handler = async (req, resp) => {
    const {id} = req.body;
    await CommonDAO.delOne(model.REPAIR, toDigit(id));
    resp.send(R.ok(null, StatusMessage.OK));
};

/**
 * @tag admin
 * @description 根据id更新报修单状态
 * @params  {id}
 */
export const updateRepairItemStatus: Handler = async (req, resp) => {
    const {id} = req.body;
    await CommonDAO.updateStatus(model.REPAIR, toDigit(id), true);
    resp.send(R.ok(null, StatusMessage.OK));
};
