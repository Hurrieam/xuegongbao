import BodyParser from 'body-parser';
import {Middleware} from "../types";

// Middleware: body-parser
const bodyParser :Middleware = (req, res, next)=>{
    BodyParser.json()(req, res, ()=>{
        BodyParser.urlencoded({extended: false})(req, res, next);
    });
};
export default bodyParser;