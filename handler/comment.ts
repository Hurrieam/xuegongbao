import {Op} from "sequelize";
import {isDigit, isValidString, toValidDigit} from "../util/checker";
import {StatusCode, StatusMessage} from "../constant/status";
import {Handler, IComment} from "../types";
import CommonDAO from "../dao/common";
import {Comment} from "../dao/_init";
import model from "../dao/model";
import R from "../model/r";

const ADMIN_OPENID = "00000000";
/**
 * @description 添加一条留言 参数：{openid, content, parentId?}
 */
export const addComment: Handler = async (req, res) => {
    const comment: IComment = req.body;
    if (!comment || !isValidString(comment.openid) || !isValidString(comment.content)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    const item = await CommonDAO.addOne(model.COMMENT, comment)
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @description 根据id删除一条留言 参数：id
 */
export const delComment: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    await CommonDAO.delOne(model.COMMENT, toValidDigit(id));
    res.send(R.ok(null, StatusMessage.OK));
}
/**
 * @description 更新留言状态 未回复 -> 已回复 参数：id
 */
export const updateCommentStatus: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    await Comment.update({
        hasReply: 1
    }, {
        where: {
            id: id
        }
    })
    res.send(R.ok(null, StatusMessage.OK));
}

/**
 * @description 根据openid查找留言列表,包含留言回复 参数：openid
 */
export const findCommentsByOpenid: Handler = async (req, res) => {
    const {openid} = req.query;
    if (!isValidString(openid)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
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
    const r = comments ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}
/**
 * @description 根据id查找留言,包含回复留言 参数：id
 */
export const findCommentsById: Handler = async (req, res) => {
    const {id} = req.query;
    if (!isDigit(id)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    const comment = await Comment.findAll({
        where: {
            [Op.and]: {
                isDeleted: false,
                [Op.or]: [
                    {id: toValidDigit(id)},
                    {parentId: toValidDigit(id)}
                ]
            }
        },
        order: [
            ['createdAt', 'ASC']
        ]
    });
    const data = {
        total: comment.length,
        items: comment
    }
    const r = comment ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

/**
 * @description 分页查找所有留言 参数：start, limit
 */
export const findComments: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if (!isDigit(start) || !isDigit(limit)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    const comments = await Comment.findAll({
        where: {
            [Op.and]: [
                {
                    isDeleted: 0,
                    openid: {
                        [Op.ne]: ADMIN_OPENID
                    }
                }
            ]
        },
        offset: toValidDigit(start) - 1,
        limit: toValidDigit(limit),
    })
    const data = {
        total: comments.length,
        items: comments
    }
    const r = comments ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}