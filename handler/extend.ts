import schedule from "node-schedule"
import {Op} from "sequelize";
import {Handler} from "../types";
import R from "../model/r";
import {StatusMessage} from "../constant/status";
import {Comment, DailyUsage, Repair, Reservation, User} from "../dao/_init";
import {ADMIN_OPENID} from "../constant/common";

type DataType = {
    dayUsers: number;
    dayComments: number;
    dayRepairs: number;
    dayReservations: number;
}

/**
 * @tag admin
 * @description 监视当日系统使用量
 */
export const getDayUsage: Handler = async (req, res) => {
    const data: DataType = await getDayUsageFromDB();
    res.send(
        R.ok(data, StatusMessage.OK)
    );
}

/**
 * @tag admin
 * @description 获取近30天的系统使用数据
 */
export const getMonthUsage: Handler = async (req, res) => {
    const data = await getMonthUsageFromDB();
    res.send(
        R.ok(data, StatusMessage.OK)
    );
}

/**
 * @description 定时任务: 每天晚上0点执行(记录当日数据)
 */
schedule.scheduleJob("0 0 0 * * ?", async () => {
    const data: DataType = await getDayUsageFromDB();
    await addLogRecord(data);
    await resetUserStatus();
});

/**
 * @description 获取当日数据
 */
const getDayUsageFromDB = async (): Promise<DataType> => {
    // 1. 当日系统使用人数
    const dayUsers = await User.count({
        where: {
            active: 1
        }
    });

    // 2. 当日留言数量
    const dayComments = await Comment.count({
        where: {
            [Op.and]: [
                {
                    createdAt: {
                        [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0))
                    }
                },
                {
                    openid: {
                        [Op.ne]: ADMIN_OPENID
                    }
                }
            ]
        }
    });

    // 3. 当日报修单数
    const dayRepairs = await Repair.count({
        where: {
            createdAt: {
                [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0))
            }
        }
    });

    // 4. 当日预约数
    const dayReservations = await Reservation.count({
        where: {
            createdAt: {
                [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0))
            }
        }
    });

    return {
        dayUsers,
        dayComments,
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
const resetUserStatus = async () => {
    await User.update({
        active: 0
    }, {
        where: {
            active: 1
        }
    });
}

/**
 * @description 添加日志记录
 */
const addLogRecord = async (data: DataType) => {
    await DailyUsage.create({
        users: data.dayUsers,
        comments: data.dayComments,
        repairs: data.dayRepairs,
        reservations: data.dayReservations
    });
}