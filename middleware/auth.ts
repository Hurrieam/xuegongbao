import expressSession from "express-session";
import {Middleware} from "../types";

export const session = expressSession({
    secret: "onezol.com", // 对session id 相关的cookie 进行签名
    resave: false, // 是否每次都重新保存会话
    saveUninitialized: true, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: false,
        httpOnly: true
    },
    rolling:true
});

export const auth: Middleware = (req, res, next) => {
    // @ts-ignore
    if (req.session && req.session.admin) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};