import schedule from "node-schedule"
import {Op} from "sequelize";
import {DormRepair, Message, Reservation, User} from "../dao/_init";
import {DataType} from "../handler/extend";

export const RealDataStatisticsCache: DataType = {
    users: 0,
    messages: 0,
    repairs: 0,
    reservations: 0
};

/**
 * @description 定时任务: 每隔五分钟执行(记录实时统计数据)
 */
const rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 1);

export const RealtimeDataStatisticsJob = () => {
    schedule.scheduleJob("RealtimeDataStatisticsJob", rule, async () => {
        const data = await getDataFormDB();
        RealDataStatisticsCache.users = data.users;
        RealDataStatisticsCache.messages = data.messages;
        RealDataStatisticsCache.repairs = data.repairs;
        RealDataStatisticsCache.reservations = data.reservations;
    })
}

/**
 * @description 获取数据
 */
const getDataFormDB = async (): Promise<DataType> => {
    // 1. 当日系统使用人数
    const users = await User.count({
        where: {
            active: true
        }
    });

    // 2. 未回复留言数
    const messages = await Message.count({
        where: {
            [Op.and]: {
                parentId: null,
                replied: false,
                deleted: false
            }
        }
    });

    // 3. 未处理的保修单数
    const repairs = await DormRepair.count({
        where: {
            [Op.and]: {
                status: false,
                deleted: false
            }
        }
    });

    // 4. 未处理预约数
    const reservations = await Reservation.count({
        where: {
            [Op.and]: {
                status: false,
                deleted: false
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
