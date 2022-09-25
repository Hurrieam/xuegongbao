import {ModelCtor} from "sequelize";
import {IModel} from "../types";

/**
 * 通用的DAO操作
 */
const CommonDAO = {

    /**
     * 获取多条数据
     * @param model 模型(数据表)
     * @param page 开始页
     * @param pageSize 每页数量
     * @param orderByASC
     * @returns  数据列表
     */
    findSome: async (
        model: ModelCtor<any>,
        page: number,
        pageSize: number,
        orderByASC?: boolean
    ): Promise<{ rows: IModel[], count: number }> => {
        return await model.findAndCountAll({
            where: {
                deleted: Number(false)
            },
            offset: page,
            limit: pageSize,
            order: [
                ['id', orderByASC ? "ASC" : "DESC"]
            ]
        });
    },

    /**
     * 添加一条记录
     * @param model 模型(数据表)
     * @param item 新记录
     * @param stuId
     * @returns 此条记录
     */
    addOne: async (model: ModelCtor<any>, item: IModel, stuId?: string): Promise<IModel> => {
        return await model.create({...item, stuId});
    },

    /**
     * 根据id删除一条记录
     * @param model 模型(数据表)
     * @param id 记录id
     * @returns 影响行数(数组形式)
     */
    delOne: async (model: ModelCtor<any>, id: number): Promise<[affectedCount: number]> => {
        return await model.update({
            deleted: Number(true)
        }, {
            where: {
                id: id
            }
        });
    },

    /**
     * 更新一条phonebook记录
     * @param model 模型(数据表)
     * @param id 记录的id
     * @param item 更新的记录
     * @returns 影响行数(数组形式)
     */
    updateOne: async (model: ModelCtor<any>, id: number, item: IModel): Promise<[affectedCount: number]> => {
        return await model.update(item, {
            where: {
                id: id
            }
        });
    },

    /**
     * 根据id更改状态
     * @param model
     * @param id 记录的id
     * @param status 状态
     */
    updateStatus: async (model: ModelCtor<any>, id: number, status: boolean): Promise<[affectedCount: number]> => {
        return await model.update({
            status: Number(status)
        }, {
            where: {
                id: id
            }
        });
    },

    /**
     * 根据id获取一条记录
     * @param model
     * @param id 记录的id
     */
    findOne: async (model: ModelCtor<any>, id: number): Promise<IModel> => {
        return await model.findOne({
            where: {
                id: id
            }
        });
    }
}

export default CommonDAO;