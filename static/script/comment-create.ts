(async (doc, tools) => {
    const oWrapper = doc.getElementsByClassName('J_wrapper')[0] as HTMLDivElement,
        oTextarea = doc.getElementsByTagName('textarea')[0] as HTMLTextAreaElement,
        oSubmit = doc.getElementsByClassName('button_wrapper')[0] as HTMLButtonElement;

    const init = async () => {
        tools.createHeader(oWrapper, '我要留言');
        oTextarea.addEventListener('input', onTextareaInput, false);
        oSubmit.addEventListener("click", onSubmit, false);
    }

    // 提交数据
    const onSubmit = async () => {
        const formData = getInputData();
        if (!formData.content) {
            tools.showAlert(oWrapper, '请输入留言内容', false);
            tools.hideAlert();
            return;
        }
        try {
            const response = await fetch("/api/comment/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const {code, data} = await response.json();
            if (code != 10000) {
                tools.showAlert(oWrapper, "提交失败，请重试", false);
                return;
            }
            tools.showAlert(oWrapper, "提交成功", true);
        } catch (e) {
            tools.showAlert(oWrapper, "提交失败，请重试", false);
        } finally {
            tools.hideAlert();
        }
    }

    // 获取留言数据
    const getInputData = (): IComment => {
        const content = oTextarea.value.trim();
        return {
            openid: "1111",
            content: content
        }
    }

    // Textarea输入事件
    const onTextareaInput = (e: Event) => {
        tools.computeWordCount(e);
    }

    await init();
})(document, tools);