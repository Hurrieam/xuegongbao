import {Sequelize, DataTypes} from 'sequelize';
import dbConfig from '../config/database';

/**
 * 初始化数据库连接池
 */
const {database, username, password, host, port} = dbConfig;
const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

/**
 * 初始化数据库模型
 */
(async () => {
    await sequelize.sync({force: false});
})();

/**
 * 初始化数据库表结构
 */
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
        allowNull: false,
        comment: "丢失地点"
    },
    lostTime: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "丢失时间"
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "描述信息"
    },
    images: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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

