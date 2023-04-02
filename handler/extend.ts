import schedule from "node-schedule"
import {Op} from "sequelize";
import {Handler} from "../types";
import R from "../model/r";
import {StatusMessage} from "../constant/status";
import {DailyUsage, DormRepair, Message, Reservation, User} from "../dao/_init";
import {RealDataStatisticsCache} from "../job/realtime-data-statistics-job";

export type DataType = {
    users: number;
    messages: number;
    repairs: number;
    reservations: number;
}

/**
 * @tag admin
 * @description 监视当日系统使用量
 */
export const getDayUsage: Handler = async (req, resp) => {
    // const data: DataType = await getDayUsageFromDB();
    resp.send(
        R.ok(RealDataStatisticsCache, StatusMessage.OK)
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
