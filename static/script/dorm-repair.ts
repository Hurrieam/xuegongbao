(async (win, doc, tools) => {
    const oWrapper = doc.getElementsByClassName('J_wrapper')[0] as HTMLDivElement,
        oTextarea = doc.getElementsByClassName('J_textarea')[0] as HTMLTextAreaElement,
        oSubmit = doc.getElementsByClassName('J_submit')[0] as HTMLButtonElement,
        oInputs = doc.getElementsByTagName("input") as HTMLCollectionOf<HTMLInputElement>;

    const init = async () => {
        tools.createHeader(oWrapper, '宿舍报修');
        oTextarea.addEventListener("input", onTextareaInput, false);
        oSubmit.addEventListener("click", onSubmit, false);
    }

    // 提交数据
    const onSubmit = async () => {
        const formData = getInputData();
        if (!formData) return;
        try {
            const response = await fetch("/api/dorm-repair/add", {
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
            win.location.href = "index.html";
        } catch (e) {
            tools.showAlert(oWrapper, "提交失败，请重试", false);
        } finally {
            tools.hideAlert();
        }
    }

    // 获取表单数据
    const getInputData = () => {
        const itemName = (oInputs.namedItem("itemName") as HTMLInputElement).value,
            description = oTextarea.value,
            dorm = (oInputs.namedItem("dorm") as HTMLInputElement).value,
            room = (oInputs.namedItem("room") as HTMLInputElement).value,
            stuName = (oInputs.namedItem("name") as HTMLInputElement).value,
            contact = (oInputs.namedItem("contact") as HTMLInputElement).value;
        const {isBlank} = tools;
        if (isBlank(itemName) || isBlank(description) || isBlank(dorm) || isBlank(room) || isBlank(contact)) {
            tools.showAlert(oWrapper, "请填写完整信息", false);
            tools.hideAlert();
            return;
        }
        const data: IDormRepair = {
            openid: tools.getOpenid(),
            itemName,
            description,
            dorm,
            room,
            stuName,
            contact
        };
        return data;
    }

    // Textarea输入事件
    const onTextareaInput = (e: Event) => {
        tools.computeWordCount(e);
    }

    await init();
})(window, document, tools);