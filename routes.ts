import {Method, Route} from './types';
import {login} from "./handler/authorize";
import {upload} from "./handler/upload";
import {uploader} from "./middleware/uploader";
import bodyParser from "./middleware/body-parser";
import {xss} from "./middleware/xss";
import {createUser, getUserinfo, updateUser} from "./handler/user";
import {authAdmin, authUser} from "./middleware/auth";
import {
    createMessage,
    deleteMessage,
    findMessageDetail,
    findMessageList,
    findUserMessage,
    updateMessageStatus
} from "./handler/message";
import {
    createLAFItem,
    deleteLAF,
    findLAFByType,
    findLAFDetail,
    findLAFList,
    findUserLAFList,
    updateLAFStatus
} from "./handler/lostandfound";
import {
    createPhoneItem,
    deletePhoneItem,
    findPhonebookByType,
    findPhonebookList,
    searchPhone
} from "./handler/phonebook";
import {
    createDormRepairItem,
    deleteRepairItem,
    findRepairItem,
    findRepairList,
    updateRepairItemStatus
} from "./handler/dorm-repair";
import {
    createReservationItem,
    deleteReservation,
    findReservation,
    findReservationList,
    updateReservationStatus
} from "./handler/reservation";
import {
    createCanteenEval,
    deleteCanteenEval,
    findCanteenEvalDetail,
    findCanteenEvalList,
    findCanteenEvalSummary,
} from "./handler/canteen-eval";
import {getDayUsage, getMonthUsage} from "./handler/extend";

const userRoutes: Route[] = [
    {
        method: Method.POST,
        path: '/user/create',
        middleware: [xss, bodyParser],
        handler: createUser
    },
    {
        method: Method.GET,
        path: '/user/detail',
        middleware: [],
        handler: getUserinfo
    },
    {
        method: Method.POST,
        path: '/user/update',
        middleware: [xss, bodyParser],
        handler: updateUser
    },
]

const messageRoutes: Route[] = [
    {
        method: Method.POST,
        path: '/message/create',
        middleware: [authUser, xss, bodyParser],
        handler: createMessage
    },
    {
        method: Method.POST,
        path: '/message/delete',
        middleware: [authUser, authAdmin, bodyParser],
        handler: deleteMessage
    },
    {
        method: Method.POST,
        path: '/message/status',
        middleware: [authUser, authAdmin, bodyParser],
        handler: updateMessageStatus
    },
    {
        method: Method.GET,
        path: '/message/detail',
        middleware: [authUser],
        handler: findMessageDetail
    },
    {
        method: Method.GET,
        path: '/message/by-user',
        middleware: [],
        handler: findUserMessage
    },
    {
        method: Method.GET,
        path: '/message/list',
        middleware: [authUser, authAdmin],
        handler: findMessageList
    },
]

const lafRoutes: Route[] = [
    {
        method: Method.POST,
        path: '/laf/create',
        middleware: [authUser, xss, bodyParser],
        handler: createLAFItem
    },
    {
        method: Method.POST,
        path: '/laf/delete',
        middleware: [authUser, bodyParser],
        handler: deleteLAF
    },
    {
        method: Method.POST,
        path: '/laf/status',
        middleware: [authUser, bodyParser],
        handler: updateLAFStatus
    },
    {
        method: Method.GET,
        path: '/laf/list',
        middleware: [],
        handler: findLAFList
    },
    {
        method: Method.GET,
        path: '/laf/detail',
        middleware: [authUser],
        handler: findLAFDetail
    },
    {
        method: Method.GET,
        path: '/laf/by-user',
        middleware: [authUser],
        handler: findUserLAFList
    },
    {
        method: Method.GET,
        path: '/laf/by-type',
        middleware: [authUser],
        handler: findLAFByType
    },
]

const phonebookRoutes: Route[] = [
    {
        method: Method.POST,
        path: '/phonebook/create',
        middleware: [authUser, authAdmin, xss, bodyParser],
        handler: createPhoneItem
    },
    {
        method: Method.POST,
        path: '/phonebook/delete',
        middleware: [authUser, authAdmin, bodyParser],
        handler: deletePhoneItem
    },
    {
        method: Method.GET,
        path: '/phonebook/list',
        middleware: [],
        handler: findPhonebookList
    },
    {
        method: Method.GET,
        path: '/phonebook/by-type',
        middleware: [],
        handler: findPhonebookByType
    },
    {
        method: Method.GET,
        path: '/phonebook/search',
        middleware: [],
        handler: searchPhone
    }
]

const dormRepairRoutes: Route[] = [
    {
        method: Method.POST,
        path: '/dorm-repair/create',
        middleware: [authUser, xss, bodyParser],
        handler: createDormRepairItem
    },
    {
        method: Method.GET,
        path: '/dorm-repair/list',
        middleware: [authUser, authAdmin],
        handler: findRepairList
    },
    {
        method: Method.GET,
        path: '/dorm-repair/detail',
        middleware: [authUser],
        handler: findRepairItem
    },
    {
        method: Method.POST,
        path: '/dorm-repair/delete',
        middleware: [authUser, authAdmin, bodyParser],
        handler: deleteRepairItem
    },
    {
        method: Method.POST,
        path: '/dorm-repair/status',
        middleware: [authUser, authAdmin, bodyParser],
        handler: updateRepairItemStatus
    },
]

const reservationRoutes: Route[] = [
    {
        method: Method.POST,
        path: '/reservation/create',
        middleware: [authUser, xss, bodyParser],
        handler: createReservationItem
    },
    {
        method: Method.GET,
        path: '/reservation/list',
        middleware: [authUser, authAdmin],
        handler: findReservationList
    },
    {
        method: Method.GET,
        path: '/reservation/detail',
        middleware: [authUser],
        handler: findReservation
    },
    {
        method: Method.POST,
        path: '/reservation/delete',
        middleware: [authUser, authAdmin, bodyParser],
        handler: deleteReservation
    },
    {
        method: Method.POST,
        path: '/reservation/status',
        middleware: [authUser, authAdmin, bodyParser],
        handler: updateReservationStatus
    },
]

const canteenEvalRoutes: Route[] = [
    {
        method: Method.POST,
        path: '/canteen-eval/create',
        middleware: [xss, bodyParser],
        handler: createCanteenEval
    },
    {
        method: Method.GET,
        path: '/canteen-eval/list',
        middleware: [authUser, authAdmin],
        handler: findCanteenEvalList
    },
    {
        method: Method.GET,
        path: '/canteen-eval/detail',
        middleware: [authUser, authAdmin],
        handler: findCanteenEvalDetail
    },
    {
        method: Method.POST,
        path: '/canteen-eval/delete',
        middleware: [authUser, authAdmin, bodyParser],
        handler: deleteCanteenEval
    },
    {
        method: Method.GET,
        path: '/canteen-eval/summary',
        middleware: [authUser, authAdmin],
        handler: findCanteenEvalSummary
    },
]

const fileRoutes: Route[] = [
    {
        method: Method.POST,
        path: '/upload',
        middleware: [authUser, uploader, bodyParser],
        handler: upload
    },
]

const extRoutes: Route[] = [
    {
        method: Method.POST,
        path: '/login',
        middleware: [xss, bodyParser],
        handler: login,
    },
    {
        method: Method.GET,
        path: '/day-usage',
        middleware: [authUser, authAdmin],
        handler: getDayUsage
    },
    {
        method: Method.GET,
        path: '/month-usage',
        middleware: [authUser, authAdmin],
        handler: getMonthUsage
    },
]

export const routes: Route[] = [
    ...userRoutes,
    ...messageRoutes,
    ...lafRoutes,
    ...phonebookRoutes,
    ...dormRepairRoutes,
    ...reservationRoutes,
    ...canteenEvalRoutes,
    ...fileRoutes,
    ...extRoutes
];