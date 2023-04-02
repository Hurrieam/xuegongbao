import schedule from "node-schedule"
import {Op} from "sequelize";
import {DailyUsage, DormRepair, Message, Reservation, User} from "../dao/_init";
import {DataType} from "../handler/extend";

/**
 * @description 定时任务: 每天晚上23点58分执行(记录当日数据)
 */
const rule = new schedule.RecurrenceRule();
rule.tz = "Asia/Shanghai";
rule.hour = 23;
rule.minute = 58;
rule.second = 0;

export const DailyDataStatisticsJob = () => {
    return () => {
        schedule.scheduleJob("DailyDataStatisticsJob", rule, async () => {
            const data: DataType = await getDayUsageFromDB();
            await createLogRecord(data);
            await resetUserStatus();
        });
    }
}

/**
 * @description 获取当日数据
 */
const getDayUsageFromDB = async (): Promise<DataType> => {
    // 1. 当日系统使用人数
    const users = await User.count({
        where: {
            active: true
        }
    });

    // 2. 当日留言数量
    const messages = await Message.count({
        where: {
            [Op.and]: {
                createdAt: {
                    [Op.gte]: new Date(new Date().toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})).setHours(0, 0, 0, 0)
                },
                isReply: false,
                deleted: false
            }
        }
    });

    // 3. 当日报修单数
    const repairs = await DormRepair.count({
        where: {
            createdAt: {
                [Op.gte]: new Date(new Date().toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})).setHours(0, 0, 0, 0)
            }
        }
    });

    // 4. 当日预约数
    const reservations = await Reservation.count({
        where: {
            createdAt: {
                [Op.gte]: new Date(new Date().toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})).setHours(0, 0, 0, 0)
            }
        }
    });

    return {
        users,
        messages,
        repairs,
        reservations
    } as DataType;
}

/**
 * @description 重置用户状态
 */
const resetUserStatus = async () => {
    await User.update({
        active: false
    }, {
        where: {
            active: true
        }
    });
}

/**
 * @description 添加日志记录
 */
const createLogRecord = async (data: DataType) => {
    await DailyUsage.create({
        userCount: data.users,
        messageCount: data.messages,
        repairCount: data.repairs,
        reservationCount: data.reservations
    });
}