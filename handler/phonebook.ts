import {isDigit, isValidString, toValidDigit} from "../util/checker";
import {StatusCode, StatusMessage} from "../constant/status";
import {Handler, IPhoneBook} from "../types";
import CommonDAO from "../dao/common";
import model from "../dao/model";
import R from "../model/r";

/**
 * @description 新增联系人 参数: (deptName, phone)
 */
export const addPhoneNumber: Handler = async (req, res) => {
    const phoneItem: IPhoneBook = req.body;
    if (!isValidString(phoneItem.deptName) || !isValidString(phoneItem.phone)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    const item = await CommonDAO.addOne(model.PHONE_BOOK, phoneItem)
    const r = item ? R.ok(item, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @description 根据id删除联系人 参数: id
 */
export const delPhoneNumber: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id) || id <= 0) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    await CommonDAO.delOne(model.PHONE_BOOK, toValidDigit(id));
    res.send(R.ok(null, StatusMessage.OK));
}

/**
 * @description 分页查找联系人 参数: {page, limit}
 */
export const findPhoneBook: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if (!isDigit(start) || !isDigit(limit)) {
        res.send(R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM));
        return;
    }
    const phonebook = await CommonDAO.getSome(model.PHONE_BOOK, toValidDigit(start), toValidDigit(limit));
    const data = {
        total: phonebook.length,
        items: phonebook
    }
    const r = phonebook ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR)
    res.send(r);
}
