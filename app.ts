import express from 'express';
import path from 'path';
import {routes} from "./routes";
import cors from "./middleware/cors";
import bodyParser from "./middleware/body-parser";

const app = express();
const PORT = 3000;
const API_PREFIX = '/api';

// 静态页面
app.use("/static", express.static(path.resolve(__dirname, "static")));

// 路由
routes.forEach((route) => {
    const {method, path, middleware, handler} = route;
    app[method](API_PREFIX + path, [...middleware, cors, bodyParser], handler);
});

app.all('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static/error.html'));
});

app.listen(PORT, () => {
    console.log(`Express with Typescript! http://localhost:${PORT}`);
});
