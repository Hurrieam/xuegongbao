"use strict";
(function (doc) {
    var oForm = doc.getElementsByTagName('form')[0], oSubmit = doc.getElementsByTagName('button')[0];
    var init = function () {
        console.log(oForm);
        // 1. 事件绑定
        oSubmit.addEventListener('click', onSubmit, false);
    };
    var onSubmit = function (e) {
        e.preventDefault();
        // 1. 获取表单数据
        var _a = getDataFromForm(oForm), dormitory = _a.dormitory, room = _a.room, content = _a.content, contact = _a.contact;
        // 2. 数据校验
        validate({ dormitory: dormitory, room: room, content: content, contact: contact });
        // 3. 提交数据
    };
    // 获取表单数据
    var getDataFromForm = function (oForm) {
        var oData = new FormData(oForm);
        var dormitory = oData.get('dormitory');
        var room = oData.get('room');
        var content = oData.get('content');
        var contact = oData.get('contact');
        return {
            dormitory: dormitory,
            room: room,
            content: content,
            contact: contact
        };
    };
    // 数据校验
    var validate = function (_a) {
        // 1. 校验数据
        var dormitory = _a.dormitory, room = _a.room, content = _a.content, contact = _a.contact;
        // 2. 校验结果
        // 3. 返回结果
    };
    init();
})(document, tools);
