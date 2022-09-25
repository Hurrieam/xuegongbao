import {Handler, ICanteenEval} from "../types";
import {toDigit} from "../util/checker";
import R from "../model/r";
import {StatusCode, StatusMessage} from "../constant/status";
import CommonDAO from "../dao/common";
import model from "../dao/table";
import {CanteenEval, EvalSummary, sequelize} from "../dao/_init";
import paramValidator from "../util/param-validator";
import {getFingerprint, getStuId} from "../util/header-param";

/**
 * @tag user
 * @description 添加一条评价
 * @params {canteen, ratings, idea}
 */
export const createCanteenEval: Handler = async (req, respp) => {
    const evaluation: ICanteenEval = req.body;
    const {canteen, ratings, idea} = evaluation;
    if (!paramValidator(respp, canteen)) {
        return;
    }
    // 解析评分
    let ratingArray = [];
    try {
        ratingArray = JSON.parse(ratings);
    } catch (e) {
        return respp.send(R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM));
    }
    const lowScoreItems = [];
    const highScoreItems = [];
    let totalScore = 0;
    let zeroScoreItemCount = 0;
    for (let rateItem of ratingArray) {
        if (zeroScoreItemCount === 5) {
            return respp.send(R.ok(null, StatusMessage.OK));
        }
        if (rateItem.rate === 0) {
            zeroScoreItemCount++;
        } else if (rateItem.rate < 5) {
            lowScoreItems.push(rateItem);
        } else if (rateItem.rate === 10) {
            highScoreItems.push(rateItem);
        }
        totalScore += rateItem.rate;
    }
    const tx = await sequelize.transaction();
    try {
        await CanteenEval.create({
            fingerprint: getFingerprint(req),
            stuId: getStuId(req),
            lowScoreItems: JSON.stringify(lowScoreItems),
            highScoreItems: JSON.stringify(highScoreItems),
            canteen, idea, ratings, totalScore
        })
        // 添加评价后，更新评价总分数
        await updateEvalSummaryOnCreate(canteen, totalScore);

        await tx.commit();
    } catch (e) {
        console.log(e)
        await tx.rollback();
    }

    respp.send(R.ok(null, StatusMessage.OK));
}

/**
 * @tag admin
 * @description 获取评价列表
 * @params {page, pageSize}
 */
// TODO: 评价表 与 用户表 关联查询
export const findCanteenEvalList: Handler = async (req, respp) => {
    const {page, pageSize} = req.query;
    const {rows, count: total} = await CommonDAO.findSome(model.CANTEEN_EVAL, toDigit(page), toDigit(pageSize));
    const data = {
        items: rows,
        count: rows?.length,
        total: total
    };
    respp.send(R.ok(data, StatusMessage.OK));
}

/**
 * @tag admin
 * @description 根据id获取评价详情
 * @params {id}
 */
export const findCanteenEvalDetail: Handler = async (req, respp) => {
    const {id} = req.query;
    const item = await CommonDAO.findOne(model.CANTEEN_EVAL, toDigit(id));
    respp.send(R.ok(item, StatusMessage.OK));
}

/**
 * @tag admin
 * @description 根据id删除评价
 * @params {id}
 */
export const deleteCanteenEval: Handler = async (req, respp) => {
    const {id} = req.body;
    const item = await CommonDAO.delOne(model.CANTEEN_EVAL, toDigit(id));
    // 删除评价后，更新评价总分
    updateEvalSummaryOnDel(toDigit(item));

    respp.send(R.ok(null, StatusMessage.OK));
}

/**
 * @tag admin
 * @description 获取评价总结
 */
export const findCanteenEvalSummary: Handler = async (req, respp) => {
    const items = await EvalSummary.findAll();
    const data = {
        items: items,
        count: items?.length
    }
    respp.send(R.ok(data, StatusMessage.OK));
}

// 当增加评价数据时，更新评价总数
const updateEvalSummaryOnCreate = (canteen: string, score: number) => {
    EvalSummary.findOne({  // 1. 根据餐厅名查询评价总结数据
        where: {canteen}
    }).then((item: any) => {
        if (item) {
            EvalSummary.update({  // 2. 更新评价总结数据
                totalScore: item.totalScore + score,
                totalCount: item.totalCount + 1,
            }, {
                where: {canteen},
                individualHooks: true   // 必须设置此值, 否则无法调用afterUpdate钩子
            })
        }
    });
}

// 当删除评价数据时，更新评价总数 id: 待删除的评价id
const updateEvalSummaryOnDel = (id: number) => {
    CanteenEval.findOne({   // 1. 根据id查找待删除的评价数据
        where: {id: id}
    }).then((item: any) => {
        if (item) {
            EvalSummary.findOne({  // 2. 根据餐厅名称查找总结数据
                where: {
                    canteen: item.canteen
                }
            }).then((summary: any) => {
                if (summary) {
                    EvalSummary.update({  // 3. 更新总结数据
                        totalScore: summary.totalScore - item.totalScore,
                        totalCount: summary.totalCount - 1,
                    }, {
                        where: {
                            canteen: item.canteen
                        },
                        individualHooks: true   // 必须设置此值, 否则无法调用afterUpdate钩子
                    })
                }
            })
        }
    })
}