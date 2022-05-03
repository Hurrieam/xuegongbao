(async (win, doc, tools) => {
    const oWrapper = doc.getElementById('J_wrapper') as HTMLDivElement,
        oTextarea = doc.getElementsByTagName('textarea')[0] as HTMLTextAreaElement,
        oSubmit = doc.getElementById('J_submit') as HTMLButtonElement;

    const init = async () => {
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
            const response = await fetch("/api/comment/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const {code} = await response.json();
            if (code != 10000) {
                tools.showAlert(oWrapper, "提交失败，请重试", false);
                return;
            }
            tools.showAlert(oWrapper, "提交成功", true);
            setTimeout(() => {
                win.location.replace(doc.referrer);
            }, 3000);
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
        return {
            openid: tools.getOpenid(),
            content: content
        }
    }

    // Textarea输入事件
    const onTextareaInput = (e: Event) => {
        tools.computeWordCount(e);
    }

    await init();
})(window, document, tools);