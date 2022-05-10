import express, {Request, Response} from 'express';
import path from 'path';
import {routes} from "./routes";
import {API_PREFIX} from "./constant/common";
import logger from "./middleware/logger";
import {errorHandler} from "./util/error-handler";

const app = express();
const PORT = 3000;

app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Openid, Accept, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    req.method.toLowerCase() == 'options' ? res.status(200).end() : next();
});

// 静态页面
app.use("/static", express.static(path.resolve(__dirname, "static")));

// 路由
routes.forEach((route) => {
    const {method, path, middleware, handler} = route;
    app[method](API_PREFIX + path, [...middleware, logger],
        (req: Request, res: Response) => handler(req, res)?.catch((err: Error) => errorHandler(err, req, res)));
});

app.all('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static/error.html'));
});

app.listen(PORT, () => {
    console.log(`Express with Typescript! http://localhost:${PORT}`);
});
