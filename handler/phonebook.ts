import {toDigit} from "../util/checker";
import {StatusMessage} from "../constant/status";
import {Handler, IPhoneBook} from "../types";
import CommonDAO from "../dao/common";
import R from "../model/r";
import paramValidator from "../util/param-validator";
import table from "../dao/table";
import {PhoneBook} from "../dao/_init";
import {Op} from "sequelize";

/**
 * @tag admin
 * @description 新增联系人
 * @params {deptName, phone}
 */
export const createPhoneItem: Handler = async (req, resp) => {
    const phoneItem: IPhoneBook = req.body;
    const {type, name, phone} = phoneItem;
    if (!paramValidator(resp, type, name, phone)) {
        return;
    }
    await PhoneBook.create({
        type: (type as string).toUpperCase(),
        name, phone
    })
    resp.send(R.ok(null, StatusMessage.OK));
}

/**
 * @tag admin
 * @description 根据id删除联系人
 * @params {id}
 */
export const deletePhoneItem: Handler = async (req, resp) => {
    const {id} = req.body;
    await CommonDAO.delOne(table.PHONE_BOOK, toDigit(id));
    resp.send(R.ok(null, StatusMessage.OK));
}

/**
 * @tag user & admin
 * @description 通过类型查找联系人
 * @params {page, pageSize}
 */
export const findPhonebookByType: Handler = async (req, resp) => {
    const {type, page, pageSize} = req.query;
    const {rows, count: total} = await PhoneBook.findAndCountAll({
        where: {
            [Op.and]: {
                deleted: false,
                type: (type as string).toUpperCase()
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
        count: rows.length,
        total: total
    }
    resp.send(R.ok(data, StatusMessage.OK));
}
/**
 * @tag user & admin
 * @description 查找联系人
 * @params {page, pageSize}
 */
export const findPhonebookList: Handler = async (req, resp) => {
    const {page, pageSize} = req.query;
    const {rows, count: total} = await PhoneBook.findAndCountAll({
        where: {
            deleted: false
        },
        offset: toDigit(page),
        limit: toDigit(pageSize),
        order: [
            ['id', 'DESC']
        ]
    })
    const data = {
        items: rows,
        count: rows.length,
        total: total
    }
    resp.send(R.ok(data, StatusMessage.OK));
}
/**
 * @tag user
 * @description 搜素联系人
 * @params {name}
 */
export const searchPhone: Handler = async (req, resp) => {
    const {name} = req.query;
    const items = await PhoneBook.findAll({
        where: {
            [Op.and]: {
                deleted: false,
                name: {
                    [Op.like]: '%' + name + '%'
                }
            }
        },
    });
    const dept = items.filter(phone => phone.getDataValue("type") === "DEPT");
    const people = items.filter(phone => phone.getDataValue("type") === "PEOPLE");
    const data = {
        dept: {
            items: dept,
            count: dept?.length
        },
        people: {
            items: people,
            count: people?.length
        }
    }
    resp.send(R.ok(data, StatusMessage.OK));
}