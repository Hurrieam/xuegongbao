;(async (doc, tools) => {
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
            showAlert('请输入留言内容', 'error');
            hideAlert();
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
                showAlert("提交失败，请重试", "error");
                return;
            }
            showAlert("提交成功", "ok");
        } catch (e) {
            showAlert("提交失败，请重试", "error");
        } finally {
            hideAlert()
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

    // 弹出提示
    const showAlert = (message: string, type: string) => {
        tools.showAlert(doc, oWrapper, message, type);
    }

    // 隐藏提示
    const hideAlert = () => {
        tools.hideAlert(doc);
    }

    // Textarea输入事件
    const onTextareaInput = (e: Event) => {
        tools.computeWordCount(doc, e);
    }

    await init();
})(document, tools);