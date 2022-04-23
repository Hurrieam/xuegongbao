import {Route} from './types';
import {logger} from "./middleware/logger";
import {authentic} from "./handler/authentic";
import {authorize} from "./handler/authorize";

export const routes: Route[] = [
    {
        method: "get",
        path: '/auth',
        middleware: [logger],
        handler: authentic,
    },
    {
        method: "get",
        path: '/authorize',
        middleware: [logger],
        handler: authorize,
    }
];