import {Handler, IUser} from "../types";
import {isValidString} from "../util/checker";
import {StatusCode, StatusMessage} from "../constant/status";
import R from "../model/r";
import {User} from "../dao/_init";
import {IUserInfo} from "./authorize";
import {getOpenidFromHeader} from "../util/openid";

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
        nickname: userInJson.nickname,
        avatar: userInJson.avatar,
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
    if (!isValidString(stuName) || !isValidString(stuClass) || !isValidString(stuId)) {
        return res.send(
            R.error(StatusCode.ILLEGAL_PARAM, StatusMessage.ILLEGAL_PARAM)
        );
    }
    const result = await User.update({
        stuName, stuClass, stuId
    }, {
        where: {
            openid: getOpenidFromHeader(req)
        }
    });

    return result[0] != 0 ? res.send(R.ok(null, StatusMessage.OK)) : res.send(R.error(StatusCode.UNKNOWN_ERROR, StatusMessage.UNKNOWN_ERROR));
}

export const saveNewToDatabase = async (userinfo: IUserInfo, openid: string) => {
    const [user, created] = await User.findOrCreate({
        where: {openid},
        defaults: {...userinfo, openid}
    });

    if (!created) {
        User.update({
            nickname: userinfo.nickname,
            avatar: userinfo.avatar,
        }, {
            where: {
                openid
            }
        });
    }
}