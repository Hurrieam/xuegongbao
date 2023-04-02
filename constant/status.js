"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMessage = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 10000] = "OK";
    StatusCode[StatusCode["ILLEGAL_PARAM"] = 10001] = "ILLEGAL_PARAM";
    StatusCode[StatusCode["PASSWORD_ERROR"] = 10002] = "PASSWORD_ERROR";
    StatusCode[StatusCode["ACCOUNT_DISABLED"] = 10003] = "ACCOUNT_DISABLED";
    StatusCode[StatusCode["UPLOAD_FILE_NOT_FOUND"] = 10004] = "UPLOAD_FILE_NOT_FOUND";
    StatusCode[StatusCode["UPLOAD_FILE_TYPE_ERROR"] = 10005] = "UPLOAD_FILE_TYPE_ERROR";
    StatusCode[StatusCode["UNKNOWN_ERROR"] = 10006] = "UNKNOWN_ERROR";
    StatusCode[StatusCode["UNAUTHORIZED"] = 10007] = "UNAUTHORIZED";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
var StatusMessage;
(function (StatusMessage) {
    StatusMessage["OK"] = "\u6210\u529F";
    StatusMessage["ILLEGAL_PARAM"] = "\u975E\u6CD5\u53C2\u6570";
    StatusMessage["PASSWORD_ERROR"] = "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF";
    StatusMessage["ACCOUNT_DISABLED"] = "\u8D26\u53F7\u5DF2\u88AB\u7981\u7528";
    StatusMessage["UPLOAD_FILE_NOT_FOUND"] = "\u4E0A\u4F20\u6587\u4EF6\u4E0D\u5B58\u5728";
    StatusMessage["UPLOAD_FILE_TYPE_ERROR"] = "\u4E0A\u4F20\u6587\u4EF6\u7C7B\u578B\u9519\u8BEF";
    StatusMessage["UNKNOWN_ERROR"] = "\u5931\u8D25";
    StatusMessage["UNAUTHORIZED"] = "\u4F60\u6CA1\u6709\u6743\u9650\u8BBF\u95EE\u8BE5\u8D44\u6E90";
})(StatusMessage = exports.StatusMessage || (exports.StatusMessage = {}));
