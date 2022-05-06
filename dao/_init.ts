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
// 数据库表: 用户表
export const User = sequelize.define('User', {
    openid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "微信用户唯一标识"
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
        comment: "当日是否活跃 true: 活跃 false: 不活跃"
    }
}, {
    freezeTableName: true
});

// 数据库表: 管理员表
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

// 数据库表: 咨询预约
export const Reservation = sequelize.define("Reservation", {
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
    stuName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "学生姓名"
    },
    sdept: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "学院名称"
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "大致内容"
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "预约时间"
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
        comment: "状态: true-已处理, false-未处理"
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
export const Repair = sequelize.define("Repair", {
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

// 数据库表: 食堂评价
export const CanteenEval = sequelize.define("CanteenEval", {
    openid: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "用户唯一标识"
    },
    canteenName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "食堂名称"
    },
    content: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        comment: "评价内容"
    },
    mainProblem: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "主要问题"
    },
    totalScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "评价总分"
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

// 数据库表: 食堂评价总结
export const EvalSummary = sequelize.define("EvalSummary", {
    canteenName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "食堂名称"
    },
    totalScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "评价总分(所有人的总分)"
    },
    totalCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "评价人数"
    },
    avgScore: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
        comment: "平均分"
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
        comment: "分数变化率"
    },
}, {
    freezeTableName: true,
    hooks: {
        afterUpdate: (instance, options) => {
            // 更新后计算平均分
            const totalScore = instance.getDataValue("totalScore");
            const totalCount = instance.getDataValue("totalCount");
            const beforeAvgScore = instance.getDataValue("avgScore");
            const nowAvgScore = totalScore / totalCount;
            EvalSummary.update({
                avgScore: nowAvgScore,
                rate: (nowAvgScore - beforeAvgScore) / beforeAvgScore
            }, {
                where: {
                    canteenName: instance.getDataValue("canteenName")
                }
            });
        },
    }
});

// 数据库表: 每日系统使用量
export const DailyUsage = sequelize.define("DailyUsage", {
    users: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "当日活跃用户数"
    },
    comments: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "当日评论数"
    },
    repairs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "当日报修数"
    },
    reservations: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "当日预约数"
    }
}, {
    freezeTableName: true
});

/**
 * 初始化数据库模型
 */
const init = async () => {
    await sequelize.sync({force: false});
    EvalSummary.findOrCreate({
        where: {canteenName: "CS"},
        defaults: {canteenName: "CS", totalScore: 100, totalCount: 1, avgScore: 100}
    });
    EvalSummary.findOrCreate({
        where: {canteenName: "ZK"},
        defaults: {canteenName: "ZK", totalScore: 100, totalCount: 1, avgScore: 100}
    });
    EvalSummary.findOrCreate({
        where: {canteenName: "MZ"},
        defaults: {canteenName: "MZ", totalScore: 100, totalCount: 1, avgScore: 100}
    });
    EvalSummary.findOrCreate({
        where: {canteenName: "CY"},
        defaults: {canteenName: "CY", totalScore: 100, totalCount: 1, avgScore: 100}
    });
}

// init();