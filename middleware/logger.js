"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware: 日志
var logger = function (req, res, next) {
    console.log("path: [", req.path, "]\t method: [", req.method, "]\t query: [", req.query, "]\t body: [", req.body, "]");
    next();
};
exports.default = logger;
