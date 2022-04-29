import COS from 'cos-nodejs-sdk-v5';
import {DataTypes, Sequelize} from 'sequelize';
import config from "../util/env-parser";

const {DATABASE, USERNAME, PASSWORD, HOST, PORT, SECRET_ID, SECRET_KEY} = config;
/**
 * 初始化数据库连接池
 */
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    port: Number(PORT),
    dialect: "mysql",
    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
});

export const cos = new COS({
    SecretId: SECRET_ID,
    SecretKey: SECRET_KEY
});

/**
 * 初始化数据库表结构
 */

export const Admin = sequelize.define("Admin", {
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        comment: "用户名"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "密码"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
        comment: "账号状态 true:正常 false:禁用"
    },
}, {
    freezeTableName: true
});

// 数据库表: 电话簿
export const PhoneBook = sequelize.define("PhoneBook", {
    deptName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "部门名称"
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "电话"
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    freezeTableName: true
});

// 数据库表: 失物招领
export const LostAndFound = sequelize.define("LostAndFound", {
    openid: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "用户唯一标识"
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "物品名称"
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "丢失地点"
    },
    lostTime: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "丢失时间"
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: "描述信息"
    },
    images: {
        type: DataTypes.STRING(1024),
        allowNull: true,
        comment: "图片列表"
    },
    stuName: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "学生姓名"
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "联系方式"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "状态: true-已找到, false-未找到"
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    freezeTableName: true
});

// 数据库表: 咨询服务
export const Consultation = sequelize.define("Consultation", {
    openid: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "用户唯一标识"
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "咨询类型: 心理咨询 | 职业规划咨询"
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "咨询时间"
    },
    stuName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "学生姓名"
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "班级"
    },
    sdept: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "学院名称"
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "联系方式"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "状态: true-完成, false-未完成"
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    freezeTableName: true
});

// 数据库表: 评论
export const Comment = sequelize.define("Comment", {
    openid: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "用户唯一标识"
    },
    content: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        comment: "评论内容"
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "父评论ID"
    },
    hasReply: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "是否被回复: true-有, false-无"
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    freezeTableName: true
});

// 数据库表: 反馈
export const Feedback = sequelize.define("Feedback", {
    openid: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "用户唯一标识"
    },
    content: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        comment: "反馈内容"
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "联系方式"
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    freezeTableName: true
});

// 数据库表: 宿舍报修
export const RepairItem = sequelize.define("Repair", {
    openid: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "用户唯一标识"
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "物品名称"
    },
    description: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        comment: "描述信息"
    },
    dorm: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "宿舍楼"
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "宿舍号"
    },
    stuName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "学生姓名"
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "联系方式"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "状态: true-完成, false-未完成"
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    freezeTableName: true
});


/**
 * 初始化数据库模型
 */
// (async () => {
//     await sequelize.sync({force: false});
//     // Admin.create({
//     //     username: "admin",
//     //     password: encrypt("admin")
//     // });
//     Comment.create({
//         openid: "123",
//         content: "不要以为你长的狼样，我就能把你看成是灰太狼"
//     });
//     Comment.create({
//         openid: "123",
//         content: "每个人都会死，但并非每个人都真正活过。每个人都在追求高质量的生活，但并非每个人都活出了自我。"
//     });
//     Comment.create({
//         openid: "123",
//         content: "我们都是灰太狼，但我们都不是灰太狼。"
//     });
//     LostAndFound.create({
//         openid: "123",
//         itemName: "钱包",
//         description: "钱包是我的，我没有了，你有吗？",
//         dorm: "1栋",
//         room: "1-101",
//         stuName: "张三",
//         contact: "12345678901",
//         isDeleted: false
//     });
//     LostAndFound.create({
//         openid: "123",
//         itemName: "钱包",
//         description: "钱包是我的，我没有了，你有吗？",
//         dorm: "1栋",
//         room: "1-101",
//         stuName: "张三",
//         contact: "12345678901",
//         isDeleted: false
//     });
//     LostAndFound.create({
//         openid: "123",
//         itemName: "钱包",
//         description: "钱包是我的，我没有了，你有吗？",
//         dorm: "1栋",
//         room: "1-101",
//         stuName: "张三",
//         contact: "12345678901"
//     });
//     PhoneBook.create({
//         deptName: "张三",
//         phone: "12345678901"
//     });
//     PhoneBook.create({
//         deptName: "张三",
//         phone: "12345678901"
//     });
// })();