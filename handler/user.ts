import {Handler, IUser} from "../types";
import {StatusMessage} from "../constant/status";
import R from "../model/r";
import {User} from "../dao/_init";
import {getFingerprint} from "../util/header-param";
import paramValidator from "../util/param-validator";

/**
 * @tag user
 * @description 创建用户
 * @params {fingerprint}
 */
export const createUser: Handler = async (req, res) => {
    const fingerprint = getFingerprint(req);
    User.findOrCreate({
        where: {
            fingerprint
        },
        defaults: {
            fingerprint
        }
    })
    return res.send(R.ok(null, StatusMessage.OK));
}
/**
 * @tag user admin
 * @description 获取用户信息
 * @params {fingerprint}
 */
export const getUserinfo: Handler = async (req, res) => {
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
        return res.send(R.ok(userInfo, StatusMessage.OK));
    }
}

/**
 * @tag user
 * @description 修改用户信息
 */
export const updateUser: Handler = async (req, res) => {
    const userinfo: IUser = req.body;
    const fingerprint = getFingerprint(req);
    const {stuId, stuName, stuClass} = userinfo;
    if (!paramValidator(res, stuId, stuName, stuClass)) {
        return;
    }
    await User.update({
        stuId, stuName, stuClass
    }, {
        where: {
            fingerprint
        }
    });
    return res.send(R.ok(userinfo, StatusMessage.OK));
}

export const findUserByStuId = async (stuId: string) => {
    if (stuId) {
        return await User.findOne({
            where: {stuId}
        })
    }
    return null;
}