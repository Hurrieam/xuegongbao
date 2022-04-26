import {Middleware} from "../types";
import express from "express";

// Middleware: body-parser
const bodyParser: Middleware = (req, res, next) => {
    express.urlencoded({extended: true})(req, res, () => {
        express.json()(req, res, next);
    });
};
export default bodyParser;