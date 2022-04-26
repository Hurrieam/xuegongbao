import {Op} from "sequelize";
import {isDigit, isValidString, toValidDigit} from "../util/checker";
import {StatusCode, StatusMessage} from "../constant/status";
import {Handler, IComment} from "../types";
import CommonDAO from "../dao/common";
import {Comment} from "../dao/_init";
import model from "../dao/model";
import R from "../model/r";

export const addComment: Handler = async (req, res) => {
    const comment: IComment = req.body;
    if (!comment || !isValidString(comment.openid) || !isValidString(comment.content)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    comment.time = new Date().getTime().toString();
    const item = await CommonDAO.addOne(model.COMMENT, comment)
    const r = item ? R.ok(null, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}

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

export const updateCommentStatus: Handler = async (req, res) => {
    const {id} = req.body;
    if (!isDigit(id)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    await CommonDAO.updateStatus(model.COMMENT, id, true);
    res.send(R.ok(null, StatusMessage.OK));
}

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

export const findComments: Handler = async (req, res) => {
    const {start, limit} = req.query;
    if (!isDigit(start) || !isDigit(limit)) {
        res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
        return;
    }
    const comments = await CommonDAO.getSome(model.COMMENT, toValidDigit(start), toValidDigit(limit));
    const data = {
        total: comments.length,
        items: comments
    }
    const r = comments ? R.ok(data, StatusMessage.OK) : R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR);
    res.send(r);
}