import {Handler, ILostAndFound, IPhoneBook} from "../types";
import R from "../model/r";
import CommonDAO from "../dao/common";
import model from "../dao/model";
import {PhoneBook} from "../dao/_init";
import {isDigit, isValidString, toValidDigit} from "../util/checker";

export const addPhoneNumber: Handler = async (req, res) => {
    const phoneItem: IPhoneBook = req.body;
    if (!isValidString(phoneItem.deptName) || !isValidString(phoneItem.phone)) {
        res.send(R.error(-1, "非法参数"));
        return;
    }
    const item = await CommonDAO.addOne(model.PHONE_BOOK, phoneItem)
    const r = item ? R.ok(item, "添加成功") : R.error(-1, "添加失败")
    res.send(r);
}

export const delPhoneNumber: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id) || id <= 0) {
        res.send(R.error(-1, "非法参数"));
        return;
    }
    await CommonDAO.delOne(model.PHONE_BOOK, toValidDigit(id));
    res.send(R.ok(null, "删除成功"));
}

export const findPhoneBook: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if (!isDigit(start) || !isDigit(limit)) {
        res.send(R.error(-1, "非法参数"));
        return;
    }
    const phonebook = await CommonDAO.getSome(model.PHONE_BOOK, toValidDigit(start), toValidDigit(limit));
    const data = {
        total: phonebook.length,
        items: phonebook
    }
    const r = phonebook ? R.ok(data, "查询成功") : R.error(-1, "查询失败")
    res.send(r);
}

