import {Route} from './types';
import {authentic} from "./handler/authentic";
import {login} from "./handler/authorize";
import {ping} from "./handler/ping";
import {upload} from "./handler/upload";
import {uploader} from "./middleware/uploader";
import bodyParser from "./middleware/body-parser";
import {addPhoneItem, deletePhoneItemById, findAllPhoneItems} from "./handler/phonebook";
import {
    addCommentItem,
    deleteCommentItemById,
    findAllComments,
    findCommentsById,
    findCommentsByUser,
    updateCommentStatusById,
} from "./handler/comment";
import {
    addDormRepairItem,
    deleteRepairItemById,
    findAllRepairItems,
    findRepairItemById,
    updateRepairItemStatusById
} from "./handler/dorm-repair";
import {
    addReservationItem,
    deleteReservationById,
    findAllReservations,
    findReservationById,
    updateReservationById
} from "./handler/reservation";
import {addOneUsageRecordByOpenid, getDayUsage, getMonthUsage} from "./handler/extend";
import {
    addLAFItem,
    delLAFById,
    findLAFbyId,
    findLAFList,
    findLAFsByUser,
    updateLAFStatusById
} from "./handler/lostandfound";
import {
    addCanteenEval,
    deleteCanteenEvalById,
    getCanteenEvalById,
    getCanteenEvalList,
    getEvalSummary
} from "./handler/eval";
import {xss} from "./middleware/xss";
import {getUserinfoByOpenid, updateUserinfoByOpenid} from "./handler/user";
import {authAdmin, authUser} from "./middleware/auth";


export const routes: Route[] = [
    {
        method: "get",
        path: '/authentic',
        middleware: [],
        handler: authentic,
    },
    // {
    //     method: "get",
    //     path: '/authorize',
    //     middleware: [],
    //     handler: authorize,
    // },
    {
        method: "post",
        path: '/login',
        middleware: [authUser, xss, bodyParser],
        handler: login,
    },
    {
        method: "post",
        path: '/comment/add',
        middleware: [authUser, xss, bodyParser],
        handler: addCommentItem
    },
    {
        method: "post",
        path: '/comment/delete',
        middleware: [authUser, authAdmin, xss, bodyParser],
        handler: deleteCommentItemById
    },
    {
        method: "post",
        path: '/comment/status',
        middleware: [authUser, authAdmin, xss, bodyParser],
        handler: updateCommentStatusById
    },
    {
        method: "get",
        path: '/comment/by-user',
        middleware: [authUser],
        handler: findCommentsByUser
    },
    {
        method: "get",
        path: '/comment/detail',
        middleware: [authUser],
        handler: findCommentsById
    },
    {
        method: "get",
        path: '/comment/list',
        middleware: [authUser, authAdmin],
        handler: findAllComments
    },
    {
        method: "post",
        path: '/laf/add',
        middleware: [authUser, xss, bodyParser],
        handler: addLAFItem
    },
    {
        method: "post",
        path: '/laf/delete',
        middleware: [authUser, xss, bodyParser],
        handler: delLAFById
    },
    {
        method: "post",
        path: '/laf/status',
        middleware: [authUser, xss, bodyParser],
        handler: updateLAFStatusById
    },
    {
        method: "get",
        path: '/laf/list',
        middleware: [],
        handler: findLAFList
    },
    {
        method: "get",
        path: '/laf/get',
        middleware: [authUser],
        handler: findLAFbyId
    },
    {
        method: "get",
        path: '/laf/by-user',
        middleware: [authUser],
        handler: findLAFsByUser
    },
    {
        method: "post",
        path: '/phonebook/add',
        middleware: [authUser, authAdmin, xss, bodyParser],
        handler: addPhoneItem
    },
    {
        method: "post",
        path: '/phonebook/delete',
        middleware: [authUser, authAdmin, xss, bodyParser],
        handler: deletePhoneItemById
    },
    {
        method: "get",
        path: '/phonebook/list',
        middleware: [authUser],
        handler: findAllPhoneItems
    },
    {
        method: "post",
        path: '/dorm-repair/add',
        middleware: [authUser, xss, bodyParser],
        handler: addDormRepairItem
    },
    {
        method: "get",
        path: '/dorm-repair/list',
        middleware: [authUser, authAdmin],
        handler: findAllRepairItems
    },
    {
        method: "get",
        path: '/dorm-repair/get',
        middleware: [authUser],
        handler: findRepairItemById
    },
    {
        method: "post",
        path: '/dorm-repair/delete',
        middleware: [authUser, authAdmin, xss, bodyParser],
        handler: deleteRepairItemById
    },
    {
        method: "post",
        path: '/dorm-repair/status',
        middleware: [authUser, authAdmin, xss, bodyParser],
        handler: updateRepairItemStatusById
    },
    {
        method: "post",
        path: '/reservation/add',
        middleware: [authUser, xss, bodyParser],
        handler: addReservationItem
    },
    {
        method: "get",
        path: '/reservation/list',
        middleware: [authUser, authAdmin],
        handler: findAllReservations
    },
    {
        method: "get",
        path: '/reservation/get',
        middleware: [authUser],
        handler: findReservationById
    },
    {
        method: "post",
        path: '/reservation/delete',
        middleware: [authUser, authAdmin, xss, bodyParser],
        handler: deleteReservationById
    },
    {
        method: "post",
        path: '/reservation/status',
        middleware: [authUser, authAdmin, xss, bodyParser],
        handler: updateReservationById
    },
    {
        method: "post",
        path: '/eval/add',
        middleware: [xss, bodyParser],
        handler: addCanteenEval
    },
    {
        method: "get",
        path: '/eval/list',
        middleware: [authUser, authAdmin],
        handler: getCanteenEvalList
    },
    {
        method: "get",
        path: '/eval/get',
        middleware: [authUser, authAdmin],
        handler: getCanteenEvalById
    },
    {
        method: "post",
        path: '/eval/delete',
        middleware: [authUser, authAdmin, xss, bodyParser],
        handler: deleteCanteenEvalById
    },
    {
        method: "get",
        path: '/eval/summary',
        middleware: [authUser, authAdmin],
        handler: getEvalSummary
    },
    {
        method: "get",
        path: '/user/get',
        middleware: [authUser],
        handler: getUserinfoByOpenid
    },
    {
        method: "post",
        path: '/user/update',
        middleware: [xss, bodyParser],
        handler: updateUserinfoByOpenid
    },
    {
        method: "get",
        path: '/day-usage',
        middleware: [authUser, authAdmin],
        handler: getDayUsage
    },
    {
        method: "get",
        path: '/month-usage',
        middleware: [authUser, authAdmin],
        handler: getMonthUsage
    },
    {
        method: "post",
        path: '/visit',
        middleware: [authUser, xss, bodyParser],
        handler: addOneUsageRecordByOpenid
    },
    {
        method: "post",
        path: '/upload',
        middleware: [authUser, uploader, bodyParser],
        handler: upload
    },
    {
        method: "get",
        path: '/ping',
        middleware: [],
        handler: ping
    }
];