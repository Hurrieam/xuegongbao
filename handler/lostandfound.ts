import {Handler, ILostAndFound} from "../types";
import R from "../model/r";
import CommonDAO from "../dao/common";
import model from "../dao/model";
import {isDigit, isValidString, toValidDigit} from "../util/checker";

export const addLAF: Handler = async (req, res) => {
    const laf: ILostAndFound = req.body;
    if (!isValidString(laf.openid)
        || !isValidString(laf.itemName)
        || !isValidString(laf.location)
        || !isValidString(laf.description)
        || !isValidString(laf.contact)) {
        res.send("非法参数");
        return;
    }
    const item = await CommonDAO.addOne(model.LOST_AND_FOUND, laf)
    const r = item ? R.ok(null, "添加成功") : R.error(-1, "添加失败")
    res.send(r);
}

export const delLAF: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        res.send(R.error(-1, "非法参数"));
        return;
    }
    await CommonDAO.delOne(model.LOST_AND_FOUND, toValidDigit(id));
    res.send(R.ok(null, "删除成功"));
}

export const findLAFs: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if (!isDigit(start) || !isDigit(limit)) {
        res.send(R.error(-1, "非法参数"));
        return;
    }
    const lafs = await CommonDAO.getSome(model.LOST_AND_FOUND, toValidDigit(start), toValidDigit(limit));
    const data = {
        total: lafs.length,
        items: lafs
    }
    const r = lafs ? R.ok(data, "查询成功") : R.error(-1, "查询失败");
    res.send(r);
}