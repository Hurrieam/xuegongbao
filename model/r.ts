import {IR} from "../types";
import {StatusCode} from "../constant/status";

/**
 * 统一响应结构
 */
class R implements IR {
    code: number;
    data?: any;
    message?: string | undefined;
    description?: string | undefined;

    private constructor(r: IR) {
        this.code = r.code;
        this.message = r.message;
        this.data = r.data;
        this.description = r.description;
    }

    static ok(data?: any, message?: string, description?: string): IR {
        return new R({
            code: StatusCode.OK,
            data: data,
            message: message,
            description: description,
        });
    }

    static error(code: number, message?: string, description?: string): IR {
        return new R({
            code: code,
            message: message,
            description: description,
        });
    }
}

export default R;