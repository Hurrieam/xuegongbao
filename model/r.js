"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var status_1 = require("../constant/status");
/**
 * 统一响应结构
 */
var R = /** @class */ (function () {
    function R(r) {
        this.code = r.code;
        this.message = r.message;
        this.data = r.data;
        this.description = r.description;
    }
    R.ok = function (data, message, description) {
        return new R({
            code: status_1.StatusCode.OK,
            data: data,
            message: message,
            description: description,
        });
    };
    R.error = function (code, message, description) {
        return new R({
            code: code,
            message: message,
            description: description,
        });
    };
    return R;
}());
exports.default = R;
