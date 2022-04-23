import { RequestHandler as Middleware } from 'express';

export const logger: Middleware = (req, res, next) => {
    console.log(req.path);
    next();
};