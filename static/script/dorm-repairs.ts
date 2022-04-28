;(async (doc, tools) => {
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
            const response = await fetch("/api/dorm-repairs");
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

    // 获取表单数据
    const getInputData = () => {
        const itemName = (oInputs.namedItem("itemName") as HTMLInputElement).value,
            description = oTextarea.value,
            dorm = (oInputs.namedItem("dorm") as HTMLInputElement).value,
            room = (oInputs.namedItem("room") as HTMLInputElement).value,
            name = (oInputs.namedItem("name") as HTMLInputElement).value,
            contact = (oInputs.namedItem("contact") as HTMLInputElement).value;
        const {isBlank}  = tools;
        if (isBlank(itemName) || isBlank(description) || isBlank(dorm) || isBlank(room) || isBlank(contact)) {
            showAlert("请填写完整信息", "error");
            hideAlert();
            return;
        }
        const data: IDormRepair = {
            itemName,
            description,
            dorm,
            room,
            name,
            contact
        };
        return data;
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