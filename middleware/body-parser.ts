import {Middleware} from "../types";
import express from "express";

// Middleware: 解析POST请求的body
const bodyParser: Middleware = (req, res, next) => {
    express.urlencoded({extended: true})(req, res, () => {
        express.json()(req, res, next);
    });
};
export default bodyParser;