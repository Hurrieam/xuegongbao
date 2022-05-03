import {Route} from './types';
import {authentic} from "./handler/authentic";
import {authorize, login} from "./handler/authorize";
import {ping} from "./handler/ping";
import {upload} from "./handler/upload";
import {uploader} from "./middleware/uploader";
import {auth} from "./middleware/auth";
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
        middleware: [],
        handler: login,
    },
    {
        method: "post",
        path: '/comment/add',
        middleware: [],
        handler: addCommentItem
    },
    {
        method: "post",
        path: '/comment/delete',
        middleware: [auth],
        handler: deleteCommentItemById
    },
    {
        method: "post",
        path: '/comment/status',
        middleware: [auth],
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
        middleware: [],
        handler: addLAFItem
    },
    {
        method: "post",
        path: '/laf/delete',
        middleware: [],
        handler: delLAFById
    },
    {
        method: "post",
        path: '/laf/status',
        middleware: [],
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
        middleware: [auth],
        handler: addPhoneItem
    },
    {
        method: "post",
        path: '/phonebook/delete',
        middleware: [auth],
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
        middleware: [],
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
        middleware: [auth],
        handler: deleteRepairItemById
    },
    {
        method: "post",
        path: '/dorm-repair/status',
        middleware: [auth],
        handler: updateRepairItemStatusById
    },
    {
        method: "post",
        path: '/reservation/add',
        middleware: [],
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
        middleware: [auth],
        handler: deleteReservationById
    },
    {
        method: "post",
        path: '/reservation/status',
        middleware: [auth],
        handler: updateReservationById
    },
    {
        method: "get",
        path: '/day-usage',
        middleware: [],
        handler: getDayUsage
    },
    {
        method: "get",
        path: '/month-usage',
        middleware: [],
        handler: getMonthUsage
    },
    {
        method: "post",
        path: '/visit',
        middleware: [],
        handler: addOneUsageRecordByOpenid
    },
    {
        method: "post",
        path: '/upload',
        middleware: [uploader],
        handler: upload
    },
    {
        method: "get",
        path: '/ping',
        middleware: [],
        handler: ping
    }
];