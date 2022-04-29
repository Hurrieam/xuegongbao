import {Route} from './types';
import logger from "./middleware/logger";
import {authentic} from "./handler/authentic";
import {authorize, login} from "./handler/authorize";
import {
    addComment,
    delComment,
    findComments,
    findCommentsById,
    findCommentsByOpenid,
    updateCommentStatus
} from "./handler/comment";
import {addLAF, delLAF, findLAFbyId, findLAFbyUser, findLAFs, updateLAFStatus} from "./handler/lostandfound";
import {addPhoneNumber, delPhoneNumber, findPhoneBook} from "./handler/phonebook";
import {ping} from "./handler/ping";
import {upload} from "./handler/upload";
import {uploader} from "./middleware/uploader";

export const routes: Route[] = [
    {
        method: "get",
        path: '/authentic',
        middleware: [logger],
        handler: authentic,
    },
    {
        method: "get",
        path: '/authorize',
        middleware: [logger],
        handler: authorize,
    },
    {
        method: "post",
        path: '/login',
        middleware: [logger],
        handler: login,
    },
    {
        method: "post",
        path: '/comment/add',
        middleware: [logger],
        handler: addComment
    },
    {
        method: "post",
        path: '/comment/delete',
        middleware: [logger],
        handler: delComment
    },
    {
        method: "post",
        path: '/comment/status',
        middleware: [logger],
        handler: updateCommentStatus
    },
    {
        method: "get",
        path: '/comment/by-user',
        middleware: [logger],
        handler: findCommentsByOpenid
    },
    {
        method: "get",
        path: '/comment/detail',
        middleware: [logger],
        handler: findCommentsById
    },
    {
        method: "get",
        path: '/comment/list',
        middleware: [logger],
        handler: findComments
    },
    {
        method: "post",
        path: '/laf/add',
        middleware: [logger],
        handler: addLAF
    },
    {
        method: "post",
        path: '/laf/delete',
        middleware: [logger],
        handler: delLAF
    },
    {
        method: "post",
        path: '/laf/status',
        middleware: [logger],
        handler: updateLAFStatus
    },
    {
        method: "get",
        path: '/laf/list',
        middleware: [logger],
        handler: findLAFs
    },
    {
        method: "get",
        path: '/laf/get',
        middleware: [logger],
        handler: findLAFbyId
    },
    {
        method: "get",
        path: '/laf/by-user',
        middleware: [logger],
        handler: findLAFbyUser
    },
    {
        method: "post",
        path: '/phonebook/add',
        middleware: [logger],
        handler: addPhoneNumber
    },
    {
        method: "post",
        path: '/phonebook/delete',
        middleware: [logger],
        handler: delPhoneNumber
    },
    {
        method: "get",
        path: '/phonebook/list',
        middleware: [logger],
        handler: findPhoneBook
    },
    {
        method: "post",
        path: '/upload',
        middleware: [logger, uploader],
        handler: upload
    },
    {
        method: "get",
        path: '/ping',
        middleware: [logger],
        handler: ping
    }
];