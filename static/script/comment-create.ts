(async (win, doc, tools) => {
    const oWrapper = doc.getElementById('J_wrapper') as HTMLDivElement,
        oTextarea = doc.getElementsByTagName('textarea')[0] as HTMLTextAreaElement,
        oAnonymity = doc.getElementById('J_anonymity') as HTMLInputElement,
        oSubmit = doc.getElementById('J_submit') as HTMLButtonElement;

    const init = async () => {
        tools.checkLogin();
        tools.createHeader(oWrapper, '我要留言');
        bindEvent();
    }

    const bindEvent = () => {
        oTextarea.addEventListener('input', onTextareaInput, false);
        oSubmit.addEventListener("click", onSubmit, false);
    }

    // 提交数据
    const onSubmit = async () => {
        const formData = getInputData();
        if (!formData) {
            return;
        }
        try {
            const {code} = await tools.post('/api/comment/add', formData);
            if (code != 10000) {
                tools.showAlert(oWrapper, "提交失败，请重试", false);
                return;
            }
            tools.showAlert(oWrapper, "提交成功", true);
            tools.disableButton(oSubmit);
        } catch (e) {
            tools.showAlert(oWrapper, "提交失败，请重试", false);
        } finally {
            tools.hideAlert();
        }
    }

    // 获取留言数据
    const getInputData = (): API.Comment | null => {
        const content = oTextarea.value.trim();
        if (!content) {
            tools.showAlert(oWrapper, '请输入留言内容', false);
            tools.hideAlert();
            return null;
        }
        const stuName = oAnonymity.checked ? "" : tools.getUserinfo()?.stuName || "";
        return {
            content,
            stuName
        }
    }

    // Textarea输入事件
    const onTextareaInput = (e: Event) => {
        tools.computeWordCount(e);
    }

    await init();
})(window, document, tools);