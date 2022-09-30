import COS from 'cos-nodejs-sdk-v5';
import {DataTypes, Sequelize} from 'sequelize';
import config from "../util/env-parser";

const {DATABASE, USERNAME, PASSWORD, HOST, PORT, SECRET_ID, SECRET_KEY} = config;

export const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    port: Number(PORT),
    dialect: "mysql",
    timezone: "+08:00",
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        timestamps: true,
        freezeTableName: true
    },
    pool: {
        max: 20,
        min: 1,
        acquire: 30000,
        idle: 5
    }
});

export const cos = new COS({
    SecretId: SECRET_ID,
    SecretKey: SECRET_KEY
});

// 以下都为数据库表模型
/**
 * 数据库表: 用户表
 */
export const User = sequelize.define('user', {
    fingerprint: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "客户端指纹"
    },
    stuId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "学生学号"
    },
    stuClass: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "学生班级"
    },
    stuName: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "学生姓名"
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "当日是否活跃: true-活跃 false-不活跃"
    }
}, {
    timestamps: true,
    underscored: true
});

/**
 *  数据库表: 管理员表
 */
export const Manager = sequelize.define("manager", {
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
    superAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "是否为超级管理员: true-是 false-否"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "账号状态: true-正常 false-禁用"
    }
}, {
    timestamps: true,
    underscored: true
});

/**
 * 数据库表: 电话簿
 */
export const PhoneBook = sequelize.define("phonebook", {
    type: {
        type: DataTypes.ENUM,
        values: ["DEPT", "PEOPLE"],
        allowNull: false,
        comment: "类型: DEPT-部门 PEOPLE-人员"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "名称"
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        comment: "电话号码"
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    timestamps: true,
    underscored: true
});

/**
 * 数据库表: 失物招领
 */
export const LostAndFound = sequelize.define("lostandfound", {
    fingerprint: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "客户端指纹"
    },
    stuId: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "学生ID"
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "标题"
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "相关标签"
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "丢失地点"
    },
    date: {
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
    contactMethod: {
        type: DataTypes.ENUM,
        values: ["QQ", "微信", "电话"],
        allowNull: false,
        comment: "联系方式类型"
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "联系方式"
    },
    type: {
        type: DataTypes.ENUM,
        values: ["LOST", "FOUND"],
        allowNull: false,
        comment: "类型: LOST-丢失, FOUND-招领"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "状态: true-完成, false-未完成"
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    timestamps: true,
    underscored: true
});

/**
 * 数据库表: 咨询预约
 */
export const Reservation = sequelize.define("reservation", {
    fingerprint: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "客户端指纹"
    },
    stuId: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "学生ID"
    },
    type: {
        type: DataTypes.ENUM,
        values: ["心理咨询", "职业规划咨询"],
        allowNull: false,
        comment: "咨询类型: 0-心理咨询, 1-职业规划咨询"
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "大致内容"
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "预约时间"
    },
    contactMethod: {
        type: DataTypes.ENUM,
        values: ["QQ", "微信", "电话"],
        allowNull: false,
        comment: "联系方式类型"
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "联系方式"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "状态: true-已处理, false-未处理"
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    timestamps: true,
    underscored: true
});

/**
 * 数据库表: 留言
 */
export const Message = sequelize.define("message", {
    fingerprint: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "客户端指纹"
    },
    stuId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "学生ID",
    },
    content: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        comment: "留言内容"
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "父评论ID"
    },
    anonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "是否匿名"
    },
    replied: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "是否被回复: true-已回复, false-未回复"
    },
    isReply: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "是否是回复型留言: true-回复型留言, false-普通留言"
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    timestamps: true,
    underscored: true
});

/**
 * @deprecated
 * 数据库表: 反馈
 */
// export const Feedback = sequelize.define("feedback", {
//     openid: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         comment: "用户唯一标识"
//     },
//     content: {
//         type: DataTypes.STRING(1024),
//         allowNull: false,
//         comment: "反馈内容"
//     },
//     contact: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         comment: "联系方式"
//     },
//     deleted: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: false,
//         comment: "状态: true-已删除, false-正常"
//     }
// }, {
//     freezeTableName: true
// });

/**
 * 数据库表: 宿舍报修
 */
export const DormRepair = sequelize.define("dorm_repair", {
    fingerprint: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "客户端指纹"
    },
    stuId: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "学生ID"
    },
    itemName: {
        type: DataTypes.STRING(25),
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
        comment: "宿舍楼号"
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "宿舍号"
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "联系方式"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "状态: true-已处理, false-未处理"
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    timestamps: true,
    underscored: true
});

/**
 * 数据库表: 食堂评价
 */
export const CanteenEval = sequelize.define("canteen_eval", {
    fingerprint: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "客户端指纹"
    },
    stuId: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "学生ID"
    },
    canteen: {
        type: DataTypes.ENUM,
        values: ["CS", "ZK", "MZ", "CY"],
        allowNull: false,
        comment: "食堂名称"
    },
    ratings: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        comment: "评价分数"
    },
    idea: {
        type: DataTypes.STRING(512),
        allowNull: true,
        comment: "建议或意见"
    },
    lowScoreItems: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        comment: "低分项(小于等于4分)"
    },
    highScoreItems: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        comment: "高分项(满10分)"
    },
    totalScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "评价总分(共100分)"
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "状态: true-已删除, false-正常"
    }
}, {
    timestamps: true,
    underscored: true
});

/**
 * 数据库表: 食堂评价总结
 */
export const EvalSummary = sequelize.define("eval_summary", {
    canteen: {
        type: DataTypes.ENUM,
        values: ["CS", "ZK", "MZ", "CY"],
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
        allowNull: false,
        defaultValue: 0,
        comment: "平均分"
    },
    changeRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        comment: "分数变化率"
    }
}, {
    timestamps: true,
    underscored: true,
    hooks: {
        afterUpdate: (instance, options) => {
            // 更新后计算平均分
            const totalScore = instance.getDataValue("totalScore");
            const totalCount = instance.getDataValue("totalCount");
            const beforeAvgScore = instance.getDataValue("avgScore");
            const nowAvgScore = totalScore / totalCount;
            EvalSummary.update({
                avgScore: nowAvgScore,
                changeRate: (nowAvgScore - beforeAvgScore) / beforeAvgScore
            }, {
                where: {
                    canteen: instance.getDataValue("canteen")
                }
            });
        },
    }
});

/**
 * 数据库表: 每日系统使用量
 */
export const DailyUsage = sequelize.define("daily_usage", {
    userCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "当日活跃用户数"
    },
    messageCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "当日留言数"
    },
    repairCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "当日报修数"
    },
    reservationCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "当日预约数"
    }
}, {
    timestamps: true,
    underscored: true
});

/**
 * 初始化数据库
 */
const init = async (force: boolean) => {
    await sequelize.sync({force});
    EvalSummary.findOrCreate({
        where: {canteen: "CS"},
        defaults: {canteen: "CS", totalScore: 100, totalCount: 1, avgScore: 100}
    });
    EvalSummary.findOrCreate({
        where: {canteen: "ZK"},
        defaults: {canteen: "ZK", totalScore: 100, totalCount: 1, avgScore: 100}
    });
    EvalSummary.findOrCreate({
        where: {canteen: "MZ"},
        defaults: {canteen: "MZ", totalScore: 100, totalCount: 1, avgScore: 100}
    });
    EvalSummary.findOrCreate({
        where: {canteen: "CY"},
        defaults: {canteen: "CY", totalScore: 100, totalCount: 1, avgScore: 100}
    });
}

// init(true);
// init(false);