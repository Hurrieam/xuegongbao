import {Handler, IUser} from "../types";
import {isValidString} from "../util/checker";
import {StatusCode, StatusMessage} from "../constant/status";
import R from "../model/r";
import {User} from "../dao/_init";
import {getOpenidFromHeader, isValidOpenid} from "../util/openid";

interface IUserInfo {
    openid: string;
    stuName: string;
    stuClass: string;
    stuId: string;
}

/**
 * @tag user admin
 * @description 获取用户信息
 */
export const getUserinfoByOpenid: Handler = async (req, res) => {
    const openid = getOpenidFromHeader(req);
    if (!openid) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const user = await User.findOne({
        where: {
            openid
        }
    });
    if (!user) {
        return res.send(
            R.error(StatusCode.USER_NOT_EXIST, StatusMessage.USER_NOT_EXIST)
        );
    }
    const userInJson: IUserInfo = user.toJSON();
    const userInfo: IUserInfo = {
        openid: userInJson.openid,
        stuName: userInJson.stuName,
        stuClass: userInJson.stuClass,
        stuId: userInJson.stuId
    }
    return res.send(R.ok(userInfo, StatusMessage.OK));
}

/**
 * @tag user
 * @description 修改用户信息
 */
export const updateUserinfoByOpenid: Handler = async (req, res) => {
    const user: IUser = req.body;
    const {stuName, stuClass, stuId} = user;
    if (!isValidString(stuName) || !isValidString(stuClass) || !isValidOpenid(stuId)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    User.findOrCreate({
        where: {
            openid: stuId
        },
        defaults: {
            openid: stuId, stuName, stuClass, stuId
        }
    }).then(async ([user, created]) => {
        if (created) {
            return res.send(R.ok(null, StatusMessage.OK));
        }
        await user.update({
            stuName, stuClass
        });
        return res.send(R.ok(null, StatusMessage.OK));
    });
}
