import {ModelCtor, Model, Op} from "sequelize";
import {IModel} from "../types";

/**
 * 通用的DAO操作
 */
const CommonDAO = {

    /**
     * 获取多条数据
     * @param model 模型(数据表)
     * @param start 开始位置
     * @param limit 每页数量
     * @returns  数据列表
     */
    getSome: async (model: ModelCtor<any>, start: number, limit: number): Promise<IModel[]> => {
        return await model.findAll({
            where: {
                isDeleted: false
            },
            offset: start,
            limit: limit
        });
    },

    /**
     * 添加一条记录
     * @param model 模型(数据表)
     * @param item 新记录
     * @returns 此条记录
     */
    addOne: async (model: ModelCtor<Model<any, any>>, item: IModel): Promise<IModel> => {
        return await model.create(item);
    },

    /**
     * 根据id删除一条记录
     * @param model 模型(数据表)
     * @param id 记录id
     * @returns 影响行数(数组形式)
     */
    delOne: async (model: ModelCtor<any>, id: number): Promise<[affectedCount: number]> => {
        return await model.update({
            isDeleted: true
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
}

export default CommonDAO;