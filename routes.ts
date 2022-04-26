import {Route} from './types';
import logger from "./middleware/logger";
import {authentic} from "./handler/authentic";
import {authorize} from "./handler/authorize";
import {addComment, delComment, findComments, findCommentsByOpenid, updateCommentStatus} from "./handler/comment";
import {addLAF, delLAF, findLAFs} from "./handler/lostandfound";
import {addPhoneNumber, delPhoneNumber, findPhoneBook} from "./handler/phonebook";

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
        method: "get",
        path: '/laf/list',
        middleware: [logger],
        handler: findLAFs
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
    }
];