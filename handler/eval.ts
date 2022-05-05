import {Handler, IEvaluation} from "../types";
import {isDigit, isValidString, toValidDigit} from "../util/checker";
import R from "../model/r";
import {StatusCode, StatusMessage} from "../constant/status";
import CommonDAO from "../dao/common";
import model from "../dao/model";
import {CanteenEval, EvalSummary} from "../dao/_init";

/**
 * @tag user
 * @description 添加一条评价
 */
export const addCanteenEval: Handler = async (req, res) => {
    const data: IEvaluation = req.body;
    const {openid, canteenName, content, mainProblem, totalScore} = data;
    if (!isValidString(openid)
        || !isValidCanteen(canteenName)
        || !isValidString(content)
        || !isValidString(mainProblem)
        || !isDigit(totalScore)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.addOne(model.CANTEEN_EVAL, data);
    // 添加评价后，更新评价总数
    updateEvalSummaryOnAdd(canteenName, totalScore);

    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @tag admin
 * @description 分页获取评价列表 参数: {start, limit}
 */
export const getCanteenEvalList: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if (!isDigit(start) || !isDigit(limit)) {
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
    if (!isDigit(id)) {
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
    const {id} = req.body;
    if (!isDigit(id)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const item = await CommonDAO.delOne(model.CANTEEN_EVAL, toValidDigit(id));
    // 删除评价后，更新评价总数
    updateEvalSummaryOnDel(toValidDigit(id));

    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @tag admin
 * @description 获取评价总结
 */
export const getEvalSummary: Handler = async (req, res) => {
    const items = await EvalSummary.findAll();
    const data = {
        items: items,
        count: items?.length
    }
    const r = items ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

// 判断餐厅名称是否有效
const isValidCanteen = (canteenName: string) => {
    return canteenName == "CS" || canteenName == "ZK" || canteenName == "MZ" || canteenName == "CY";
}

// 当增加评价数据时，更新评价总数
const updateEvalSummaryOnAdd = (canteenName: string, score: number) => {
    EvalSummary.findOne({  // 1. 根据餐厅名查询评价总结数据
        where: {
            canteenName: canteenName
        }
    }).then((item: any) => {
        if (item) {
            EvalSummary.update({  // 2. 更新评价总结数据
                totalScore: item.totalScore + score,
                totalCount: item.totalCount + 1,
            }, {
                where: {
                    canteenName: canteenName
                },
                individualHooks: true   // 必须设置此值, 否则无法调用afterUpdate钩子
            })
        }
    });
}

// 当删除评价数据时，更新评价总数 id: 待删除的评价id
const updateEvalSummaryOnDel = (id: number) => {
    CanteenEval.findOne({   // 1. 根据id查找待删除的评价数据
        where: {
            id: id
        }
    }).then((item: any) => {
        if (item) {
            EvalSummary.findOne({  // 2. 根据餐厅名称查找总结数据
                where: {
                    canteenName: item.canteenName
                }
            }).then((summary: any) => {
                if (summary) {
                    EvalSummary.update({  // 3. 更新总结数据
                        totalScore: summary.totalScore - item.totalScore,
                        totalCount: summary.totalCount - 1,
                    }, {
                        where: {
                            canteenName: item.canteenName
                        },
                        individualHooks: true   // 必须设置此值, 否则无法调用afterUpdate钩子
                    })
                }
            })
        }
    })
}