import {Op} from "sequelize";
import {StatusMessage} from "../constant/status";
import {Handler, IMessage} from "../types";
import CommonDAO from "../dao/common";
import table from "../dao/table";
import R from "../model/r";
import {Message, User} from "../dao/_init";
import paramValidator from "../util/param-validator";
import {getFingerprint, getStuId} from "../util/header-param";
import {toDigit} from "../util/checker";
import {findUserByStuId} from "./user";

/**
 * @tag user & admin
 * @description 添加一条留言
 * @params {fingerprint, content, anonymous}
 */
export const createMessage: Handler = async (req, resp) => {
    const message: IMessage = req.body;
    const {content, anonymous, parentId, isReply} = message;
    if (!paramValidator(resp, content)) {
        return;
    }
    await Message.create({
        stuId: getStuId(req),
        fingerprint: getFingerprint(req),
        content, anonymous, parentId, isReply
    })
    resp.send(R.ok(null, StatusMessage.OK));
}

/**
 * @tag admin
 * @description 根据id删除一条留言
 * @params {id}
 */
export const deleteMessage: Handler = async (req, resp) => {
    const {id} = req.body;
    await CommonDAO.delOne(table.MESSAGE, toDigit(id));
    resp.send(R.ok(null, StatusMessage.OK));
}

/**
 * @tag admin
 * @description 更新留言状态 未回复 -> 已回复
 * @params {id}
 */
export const updateMessageStatus: Handler = async (req, resp) => {
    const {id} = req.body;
    await Message.update({
        replied: true
    }, {
        where: {
            id: id
        }
    })
    resp.send(R.ok(null, StatusMessage.OK));
}

/**
 * @tag user
 * @description 根据用户查找留言列表,不包含留言回复
 * @params {page, pageSize}
 */
export const findUserMessage: Handler = async (req, resp) => {
    const {page, pageSize} = req.query;
    const {rows, count: total} = await Message.findAndCountAll({
        where: {
            [Op.and]: {
                isReply: false,
                parentId: null,
                deleted: false,
                [Op.or]: {
                    stuId: getStuId(req),
                    fingerprint: getFingerprint(req)
                },
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
 * @tag user & admin
 * @description 根据id查找某条留言,包含回复留言
 * @params {id}
 */
export const findMessageDetail: Handler = async (req, resp) => {
    const {id} = req.query;
    const items = await Message.findAll({
        where: {
            [Op.and]: {
                deleted: false,
                [Op.or]: {
                    id: toDigit(id),
                    parentId: toDigit(id)
                }
            }
        },
        order: [
            ['id', 'ASC']
        ]
    });
    if (items.length) {
        const stuId = items[0].getDataValue("stuId");
        items[0].setDataValue("owner", await findUserByStuId(stuId));
    }
    const data = {
        count: items.length,
        items: items
    }
    resp.send(R.ok(data, StatusMessage.OK));
}

/**
 * @tag admin
 * @description 分页查找留言
 * @params {page, pageSize}
 */
export const findMessageList: Handler = async (req, resp) => {
    const {page, pageSize} = req.query;
    const {rows, count: total} = await Message.findAndCountAll({
        where: {
            [Op.and]:
                {
                    deleted: false,
                    isReply: false
                }
        },
        offset: toDigit(page),
        limit: toDigit(pageSize),
        order: [
            ['id', 'DESC']
        ]
    })
    const data = {
        items: rows,
        count: rows?.length,
        total: total
    }
    resp.send(R.ok(data, StatusMessage.OK));
}