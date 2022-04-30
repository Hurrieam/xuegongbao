import {Middleware} from "../types";
import config from "../util/env-parser";

const origins = config.ADMIN_URL.split(',');

// Middleware: 允许跨源请求
const cors: Middleware = (req, res, next) => {
    const origin = req.headers.origin as string;
    if(origins.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', "true");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
};

export default cors;
