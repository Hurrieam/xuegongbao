import {Route} from './types';
import {authentic} from "./handler/authentic";
import {authorize, login} from "./handler/authorize";
import {
    addComment,
    delComment,
    findAllComments,
    findCommentsById,
    findCommentsByUser,
    updateCommentStatus
} from "./handler/comment";
import {addLAF, delLAF, findLAFbyId, findLAFbyUser, findLAFs, updateLAFStatus} from "./handler/lostandfound";
import {addPhoneNumber, delPhoneNumber, findPhoneBook} from "./handler/phonebook";
import {ping} from "./handler/ping";
import {upload} from "./handler/upload";
import {uploader} from "./middleware/uploader";
import {auth} from "./middleware/auth";

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
        handler: addComment
    },
    {
        method: "post",
        path: '/comment/delete',
        middleware: [auth],
        handler: delComment
    },
    {
        method: "post",
        path: '/comment/status',
        middleware: [auth],
        handler: updateCommentStatus
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
        handler: addLAF
    },
    {
        method: "post",
        path: '/laf/delete',
        middleware: [auth],
        handler: delLAF
    },
    {
        method: "post",
        path: '/laf/status',
        middleware: [],
        handler: updateLAFStatus
    },
    {
        method: "get",
        path: '/laf/list',
        middleware: [],
        handler: findLAFs
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
        handler: findLAFbyUser
    },
    {
        method: "post",
        path: '/phonebook/add',
        middleware: [auth],
        handler: addPhoneNumber
    },
    {
        method: "post",
        path: '/phonebook/delete',
        middleware: [auth],
        handler: delPhoneNumber
    },
    {
        method: "get",
        path: '/phonebook/list',
        middleware: [],
        handler: findPhoneBook
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