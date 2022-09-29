import {Handler, IUser} from "../types";
import {StatusMessage} from "../constant/status";
import R from "../model/r";
import {User} from "../dao/_init";
import {getFingerprint} from "../util/header-param";
import paramValidator from "../util/param-validator";
import { Op } from "sequelize";

/**
 * @tag user
 * @description 创建用户
 * @params {fingerprint}
 */
export const createUser: Handler = async (req, resp) => {
    const fingerprint = getFingerprint(req);
    User.findOrCreate({
        where: {
            fingerprint
        },
        defaults: {
            fingerprint
        }
    })
    return resp.send(R.ok(null, StatusMessage.OK));
}
/**
 * @tag user admin
 * @description 获取用户信息
 * @params {fingerprint}
 */
export const findUserinfo: Handler = async (req, resp) => {
    const fingerprint = getFingerprint(req);
    const user = await User.findOne({
        where: {
            fingerprint
        }
    });

    if (user) {
        const userInJson: IUser = user.toJSON();
        const userInfo: IUser = {
            stuName: userInJson.stuName,
            stuClass: userInJson.stuClass,
            stuId: userInJson.stuId,
            fingerprint: userInJson.fingerprint
        }
        return resp.send(R.ok(userInfo, StatusMessage.OK));
    }
}

/**
 * @tag user
 * @description 修改用户信息
 */
export const updateUser: Handler = async (req, resp) => {
    const userinfo: IUser = req.body;
    const fingerprint = getFingerprint(req);
    const {stuId, stuName, stuClass} = userinfo;
    if (!paramValidator(resp, stuId, stuName, stuClass)) {
        return;
    }
    await User.update({
        stuId, stuName, stuClass
    }, {
        where: {
            fingerprint
        }
    });
    return resp.send(R.ok(userinfo, StatusMessage.OK));
}
/**
 * @tag user
 * @description 记录用户访问
 */
export const recordUserVisit: Handler = async (req, resp) => {
    await User.update({
        active: true
    }, {
        where: {
            [Op.and]: {
                fingerprint: getFingerprint(req),
                active: false
            }
        }
    });
    return resp.send(R.ok(null, StatusMessage.OK));
}

/**
 * 根据有StuId查找用户
 * @param stuId
 */
export const findUserByStuId = async (stuId: string) => {
    if (stuId) {
        return await User.findOne({
            where: {stuId}
        })
    }
    return null;
}