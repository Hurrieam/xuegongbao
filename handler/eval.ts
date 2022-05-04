import {Handler} from "../types";
import {isDigit, isValidString, toValidDigit} from "../util/checker";
import R from "../model/r";
import {StatusCode, StatusMessage} from "../constant/status";
import CommonDAO from "../dao/common";
import model from "../dao/model";

/**
 * @tag user
 * @description 添加一条评价
 */
export const addCanteenEval: Handler = async (req, res) => {
    const {openid, evals} = req.body;
    if (!isValidString(openid) || !evals || evals.length === 0) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.addOne(model.CANTEEN_EVAL, {openid, content: JSON.stringify(evals)});
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @tag admin
 * @description 分页获取评价列表 参数: {start, limit}
 */
export const getCanteenEvalList: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if(!isDigit(start) || !isDigit(limit)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const items = await CommonDAO.getSome(model.CANTEEN_EVAL, toValidDigit(start), toValidDigit(limit));
    const total = await CommonDAO.getCount(model.CANTEEN_EVAL);
    const data = {
        items: items,
        count: items?.length,
        total: total
    };
    const r = items ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @tag admin
 * @description 根据id获取评价
 */
export const getCanteenEvalById: Handler = async (req, res) => {
    const {id} = req.query;
    if(!isDigit(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.getOne(model.CANTEEN_EVAL, toValidDigit(id));
    const r = item ? R.ok(item, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @tag admin
 * @description 根据id删除评价
 */
export const deleteCanteenEvalById: Handler = async (req, res) => {
    const {id} = req.query;
    if(!isDigit(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.delOne(model.CANTEEN_EVAL, toValidDigit(id));
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}