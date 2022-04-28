import {Handler} from "../types";

export const ping: Handler = (req, res) => {
    res.status(200).send("pong");
};