"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllNotBlank = exports.isBlank = exports.toDigit = exports.isDigit = void 0;
// 是否是数字类型
var isDigit = function (digit) {
    return digit != undefined && (typeof digit === 'number' || !isNaN(Number(digit)));
};
exports.isDigit = isDigit;
// 转换数字
var toDigit = function (digit) {
    if ((0, exports.isDigit)(digit)) {
        return Number(digit) > 0 ? Number(digit) : 0;
    }
    return 0;
};
exports.toDigit = toDigit;
// 是否是有效字符串
var isBlank = function (str) {
    return str.replace(/\s+/g, '').length === 0;
};
exports.isBlank = isBlank;
var isAllNotBlank = function (args) {
    return !args.some(function (arg) { return (0, exports.isBlank)(arg); });
};
exports.isAllNotBlank = isAllNotBlank;
