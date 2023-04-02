"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checker_1 = require("./checker");
var r_1 = require("../model/r");
var status_1 = require("../constant/status");
var paramValidator = function (res) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!(0, checker_1.isAllNotBlank)(args)) {
        res.send(r_1.default.error(status_1.StatusCode.ILLEGAL_PARAM, status_1.StatusMessage.ILLEGAL_PARAM));
        return false;
    }
    return true;
};
exports.default = paramValidator;
