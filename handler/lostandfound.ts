import {Op} from "sequelize";
import {Handler, ILostAndFound, QueryKey} from "../types";
import R from "../model/r";
import CommonDAO from "../dao/common";
import model from "../dao/table";
import {toDigit} from "../util/checker";
import {StatusMessage} from "../constant/status";
import {LostAndFound} from "../dao/_init";
import paramValidator from "../util/param-validator";
import {getFingerprint, getStuId} from "../util/header-param";
import {findUserByStuId} from "./user";

/**
 * @tag user
 * @description 添加一条失物/招领信息
 * @params {stuId, itemName,  description,  contactNumber, type}
 */
export const createLAFItem: Handler = async (req, resp) => {
    const laf: ILostAndFound = req.body;
    const {title, location, date, description, contactMethod, contactNumber, type, tags, images} = laf;
    if (!paramValidator(resp, title, description, contactMethod, contactNumber, type)) {
        return;
    }
    await LostAndFound.create({
        stuId: getStuId(req),
        fingerprint: getFingerprint(req),
        type: type.toUpperCase(),
        title, location, date, description, contactMethod, contactNumber, tags, images
    })
    resp.send(R.ok(null, StatusMessage.OK));
}

/**
 * @tag admin
 * @description 根据id删除一条失物招领信息
 * @params {id}
 */
export const deleteLAF: Handler = async (req, resp) => {
    const {id} = req.body;
    await CommonDAO.delOne(model.LOST_AND_FOUND, toDigit(id));
    resp.send(R.ok(null, StatusMessage.OK));
}


/**
 * @tag user
 * @description 根据id更新失物招领的状态 未找到 —> 已找到
 * @params {id}
 */
export const updateLAFStatus: Handler = async (req, resp) => {
    const {id} = req.body;
    await CommonDAO.updateStatus(model.LOST_AND_FOUND, toDigit(id), true);
    resp.send(R.ok(null, StatusMessage.OK));
}

/**
 * @tag user & admin
 * @description 分页查找失物招领信息列表
 * @params {page, pageSize}
 */
export const findLAFList: Handler = async (req, resp) => {
    const {page, pageSize} = req.query;
    const {rows, count: total} = await LostAndFound.findAndCountAll({
        where: {
            [Op.and]: {
                deleted: Number(false),
                status: Number(false)
            }
        },
        offset: toDigit(page),
        limit: toDigit(pageSize),
        order: [['id', 'DESC']]
    });
    const data = {
        items: rows,
        count: rows?.length,
        total: total
    }
    resp.send(R.ok(data, StatusMessage.OK));
}

/**
 * @tag user & admin
 * @description 根据id查找某条失物招领信息详情
 * @params {id}
 */
export const findLAFDetail: Handler = async (req, resp) => {
    const {id} = req.query;
    const item = await CommonDAO.findOne(model.LOST_AND_FOUND, toDigit(id));
    if (item) {
        const stuId = item.getDataValue("stuId");
        item.setDataValue("owner", await findUserByStuId(stuId));
    }
    resp.send(R.ok(item, StatusMessage.OK));
}

/**
 * @tag user
 * @description 根据用户查找失物招领信息列表
 * @params {page, pageSize}
 */
export const findUserLAFList: Handler = async (req, resp) => {
    const {page, pageSize} = req.query;
    const queryKey : QueryKey = {
        fingerprint: getFingerprint(req)
    };
    const stuId = getStuId(req);
    if (stuId) {
        queryKey["stuId"] = stuId;
    }
    const {rows, count: total} = await LostAndFound.findAndCountAll({
        where: {
            [Op.and]: {
                deleted: false,
                [Op.or]: {
                    ...queryKey
                }
            }
        },
        offset: toDigit(page),
        limit: toDigit(pageSize),
        order: [
            ['id', 'DESC']
        ]
    });
    const data = {
        items: rows,
        count: rows?.length,
        total: total
    }
    resp.send(R.ok(data, StatusMessage.OK));
}

/**
 * @tag user
 * @description 根据类型查找失物/招领列表
 * @params {type, page, pageSize}
 */
export const findLAFByType: Handler = async (req, resp) => {
    const {type, page, pageSize} = req.query;
    if (!paramValidator(resp, type)) {
        return;
    }
    const {rows, count: total} = await LostAndFound.findAndCountAll({
        where: {
            [Op.and]: {
                type: (type as string).toUpperCase(),
                deleted: false,
                [Op.or]: {
                    stuId: getStuId(req),
                    fingerprint: getFingerprint(req)
                }
            }
        },
        offset: toDigit(page),
        limit: toDigit(pageSize),
        order: [
            ['id', 'DESC']
        ]
    });
    const data = {
        items: rows,
        count: rows?.length,
        total: total
    }
    resp.send(R.ok(data, StatusMessage.OK));
}
