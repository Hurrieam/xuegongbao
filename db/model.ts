import sequelize from "./config";

const {DataTypes} = require("sequelize");

export const User = sequelize.define("user", {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
});

// 数据库表: 电话簿
export const PhoneBook = sequelize.define("phone_book", {
    department: DataTypes.TEXT,  // 部门名称
    phone: DataTypes.TEXT, // 电话号码
    status: DataTypes.INTEGER // 状态 0:正常状态 1:异常状态
});

// 数据库表: 失物招领
export const LostAndFound = sequelize.define("lost_and_found", {
    itemName: DataTypes.TEXT,  // 物品名称
    location: DataTypes.TEXT,  // 丢失地点
    description: DataTypes.TEXT,  // 详情描述
    images: DataTypes.TEXT,  // 图片
    name: DataTypes.TEXT, // 姓名
    contact: DataTypes.TEXT,  // 联系方式
    status: DataTypes.INTEGER  // 状态
});

// 数据库表: 咨询服务
export const Counseling = sequelize.define("consultation", {
    type: DataTypes.TEXT,  // 咨询类型: 心理咨询 | 职业规划咨询
    stuName: DataTypes.TEXT, // 姓名
    class: DataTypes.TEXT, // 班级
    sdept: DataTypes.TEXT, // 院系/专业
    contact: DataTypes.TEXT,  // 联系方式
    status: DataTypes.INTEGER // 状态: 待处理 | 已处理
});

// (async () => {
//     await sequelize.sync({force: true});
// })();