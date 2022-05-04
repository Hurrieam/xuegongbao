import {Route} from './types';
import {authentic} from "./handler/authentic";
import {authorize, login} from "./handler/authorize";
import {ping} from "./handler/ping";
import {upload} from "./handler/upload";
import {uploader} from "./middleware/uploader";
import {auth} from "./middleware/auth";
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
import {errorHandler} from "./middleware/error-handler";
import {addCanteenEval, deleteCanteenEvalById, getCanteenEvalById, getCanteenEvalList} from "./handler/eval";


export const routes: Route[] = [
    {
        method: "get",
        path: '/authentic',
        middleware: [],
        handler: authentic,
    },
    {
        method: "get",
        path: '/authorize',
        middleware: [],
        handler: authorize,
    },
    {
        method: "post",
        path: '/login',
        middleware: [bodyParser],
        handler: login,
    },
    {
        method: "post",
        path: '/comment/add',
        middleware: [bodyParser],
        handler: addCommentItem
    },
    {
        method: "post",
        path: '/comment/delete',
        middleware: [auth, bodyParser],
        handler: deleteCommentItemById
    },
    {
        method: "post",
        path: '/comment/status',
        middleware: [auth, bodyParser],
        handler: updateCommentStatusById
    },
    {
        method: "get",
        path: '/comment/by-user',
        middleware: [],
        handler: findCommentsByUser
    },
    {
        method: "get",
        path: '/comment/detail',
        middleware: [],
        handler: findCommentsById
    },
    {
        method: "get",
        path: '/comment/list',
        middleware: [auth],
        handler: findAllComments
    },
    {
        method: "post",
        path: '/laf/add',
        middleware: [bodyParser],
        handler: addLAFItem
    },
    {
        method: "post",
        path: '/laf/delete',
        middleware: [bodyParser],
        handler: delLAFById
    },
    {
        method: "post",
        path: '/laf/status',
        middleware: [bodyParser],
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
        middleware: [],
        handler: findLAFbyId
    },
    {
        method: "get",
        path: '/laf/by-user',
        middleware: [],
        handler: findLAFsByUser
    },
    {
        method: "post",
        path: '/phonebook/add',
        middleware: [auth, bodyParser],
        handler: addPhoneItem
    },
    {
        method: "post",
        path: '/phonebook/delete',
        middleware: [auth, bodyParser],
        handler: deletePhoneItemById
    },
    {
        method: "get",
        path: '/phonebook/list',
        middleware: [],
        handler: findAllPhoneItems
    },
    {
        method: "post",
        path: '/dorm-repair/add',
        middleware: [bodyParser],
        handler: addDormRepairItem
    },
    {
        method: "get",
        path: '/dorm-repair/list',
        middleware: [auth],
        handler: findAllRepairItems
    },
    {
        method: "get",
        path: '/dorm-repair/get',
        middleware: [],
        handler: findRepairItemById
    },
    {
        method: "post",
        path: '/dorm-repair/delete',
        middleware: [auth, bodyParser],
        handler: deleteRepairItemById
    },
    {
        method: "post",
        path: '/dorm-repair/status',
        middleware: [auth, bodyParser],
        handler: updateRepairItemStatusById
    },
    {
        method: "post",
        path: '/reservation/add',
        middleware: [bodyParser],
        handler: addReservationItem
    },
    {
        method: "get",
        path: '/reservation/list',
        middleware: [auth],
        handler: findAllReservations
    },
    {
        method: "get",
        path: '/reservation/get',
        middleware: [],
        handler: findReservationById
    },
    {
        method: "post",
        path: '/reservation/delete',
        middleware: [auth, bodyParser],
        handler: deleteReservationById
    },
    {
        method: "post",
        path: '/reservation/status',
        middleware: [auth, bodyParser],
        handler: updateReservationById
    },
    {
        method: "post",
        path: '/eval/add',
        middleware: [bodyParser],
        handler: addCanteenEval
    },
    {
        method: "get",
        path: '/eval/list',
        middleware: [auth],
        handler: getCanteenEvalList
    },
    {
        method: "get",
        path: '/eval/get',
        middleware: [auth],
        handler: getCanteenEvalById
    },
    {
        method: "post",
        path: '/eval/delete',
        middleware: [auth],
        handler: deleteCanteenEvalById
    },
    {
        method: "get",
        path: '/day-usage',
        middleware: [auth],
        handler: getDayUsage
    },
    {
        method: "get",
        path: '/month-usage',
        middleware: [auth],
        handler: getMonthUsage
    },
    {
        method: "post",
        path: '/visit',
        middleware: [bodyParser],
        handler: addOneUsageRecordByOpenid
    },
    {
        method: "post",
        path: '/upload',
        middleware: [uploader, bodyParser],
        handler: upload
    },
    {
        method: "get",
        path: '/ping',
        // @ts-ignore
        middleware: [],
        handler: ping
    }
];