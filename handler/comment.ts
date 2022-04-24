import {isDigit, isValidString, toValidDigit} from "../util/checker";

const {Op} = require("sequelize");
import {Handler, IComment} from "../types";
import R from "../model/r";
import CommonDAO from "../dao/common";
import model from "../dao/model";
import {Comment} from "../dao/_init";


export const addComment: Handler = async (req, res) => {
    const comment: IComment = req.body;
    if(!isValidString(comment.openid) || !isValidString(comment.content)) {
        res.send("非法参数");
        return;
    }
    comment.time = new Date().getTime().toString();
    const item = await CommonDAO.addOne(model.COMMENT, comment)
    const r = item ? R.ok(null, "添加成功") : R.error(-1, "添加失败")
    res.send(r);
}

export const delComment: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        res.send(R.error(-1, "非法参数"));
        return;
    }
    await CommonDAO.delOne(model.COMMENT, toValidDigit(id));
    res.send(R.ok(null, "删除成功"));
}

export const findComments: Handler = async (req, res) => {
    const {openid} = req.query;
    if (!isValidString(openid)) {
        res.send(R.error(-1, "无效openid"));
        return;
    }
    const comments = await Comment.findAll({
        where: {
            [Op.and]: {
                isDeleted: false,
                [Op.or]: [
                    {openid: openid},
                    {parentId: openid}
                ]
            }
        }
    });
    const data = {
        total: comments.length,
        items: comments
    }
    const r = comments ? R.ok(data, "查询成功") : R.error(-1, "查询失败");
    res.send(r);
}