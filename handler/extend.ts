import schedule from "node-schedule"
import {Op} from "sequelize";
import {Handler} from "../types";
import R from "../model/r";
import {StatusMessage} from "../constant/status";
import {DailyUsage, DormRepair, Message, Reservation, User} from "../dao/_init";

type DataType = {
    dayUsers: number;
    dayMessages: number;
    dayRepairs: number;
    dayReservations: number;
}

/**
 * @tag admin
 * @description 监视当日系统使用量
 */
export const getDayUsage: Handler = async (req, resp) => {
    const data: DataType = await getDayUsageFromDB();
    resp.send(
        R.ok(data, StatusMessage.OK)
    );
}

/**
 * @tag admin
 * @description 获取近30天的系统使用数据
 */
export const getMonthUsage: Handler = async (req, resp) => {
    const data = await getMonthUsageFromDB();
    resp.send(
        R.ok(data, StatusMessage.OK)
    );
}

// /**
//  * @tag user
//  * @description 添加用户登录日志
//  */
// export const addOneUsageRecordByOpenid: Handler = async (req, resp) => {
//     const openid = getOpenidFromHeader(req);
//     const user = await User.findOne({
//         where: {
//             openid
//         }
//     })
//     if (!user) {
//         return resp.send(
//             R.error(StatusCode.USER_NOT_EXIST, StatusMessage.USER_NOT_EXIST)
//         );
//     }
//     User.update({
//         active: 1
//     }, {
//         where: {
//             openid: openid
//         }
//     });
//     resp.send(
//         R.ok(StatusCode.OK, StatusMessage.OK)
//     );
// }
/**
 * 添加一个匿名用户或更新用户状态
 * @param openid
 */
export const createOrUpdateStatus = (openid: string) => {
    User.findOrCreate({
        where: {
            openid: openid
        },
        defaults: {
            openid: openid
        }
    }).then(async ([user, created]) => {
        if (!created) {
            await user.update({
                active: true
            })
        }
    })
}
/**
 * @description 定时任务: 每天晚上23点58分执行(记录当日数据)
 */
const rule = new schedule.RecurrenceRule();
rule.tz = "Asia/Shanghai";
rule.hour = 23;
rule.minute = 58;
rule.second = 0;
schedule.scheduleJob(rule, async () => {
    const data: DataType = await getDayUsageFromDB();
    await addLogRecord(data);
    await respetUserStatus();
});

/**
 * @description 获取当日数据
 */
const getDayUsageFromDB = async (): Promise<DataType> => {
    // 1. 当日系统使用人数
    const dayUsers = await User.count({
        where: {
            active: true
        }
    });

    // 2. 当日留言数量
    const dayMessages = await Message.count({
        where: {
            [Op.and]: {
                created_at: {
                    [Op.gte]: new Date(new Date().toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})).setHours(0, 0, 0, 0)
                },
                isReply: {
                    [Op.eq]: false
                }
            }
        }
    });

    // 3. 当日报修单数
    const dayRepairs = await DormRepair.count({
        where: {
            created_at: {
                [Op.gte]: new Date(new Date().toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})).setHours(0, 0, 0, 0)
            }
        }
    });

    // 4. 当日预约数
    const dayReservations = await Reservation.count({
        where: {
            created_at: {
                [Op.gte]: new Date(new Date().toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})).setHours(0, 0, 0, 0)
            }
        }
    });

    return {
        dayUsers,
        dayMessages,
        dayRepairs,
        dayReservations
    } as DataType;
}

/**
 * @description 获取近30天的系统使用数据
 */
const getMonthUsageFromDB = async () => {
    return await DailyUsage.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 30
    });
}

/**
 * @description 重置用户状态
 */
const respetUserStatus = async () => {
    await User.update({
        active: Number(false)
    }, {
        where: {
            active: Number(true)
        }
    });
}

/**
 * @description 添加日志记录
 */
const addLogRecord = async (data: DataType) => {
    await DailyUsage.create({
        users: data.dayUsers,
        comments: data.dayMessages,
        repairs: data.dayRepairs,
        respervations: data.dayReservations
    });
}