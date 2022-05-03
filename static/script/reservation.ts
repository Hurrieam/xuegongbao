((win, doc, tools) => {
    const oWrapper = doc.getElementById("J_wrapper") as HTMLDivElement,
        oRadios = oWrapper.getElementsByClassName("J_radio") as HTMLCollectionOf<HTMLInputElement>,
        oInputs = oWrapper.getElementsByTagName("input") as HTMLCollectionOf<HTMLInputElement>,
        oSubmit = doc.getElementById("J_submit") as HTMLButtonElement;

    const init = () => {
        tools.createHeader(oWrapper, "预约咨询");
        bindEvent();
    }

    const bindEvent = () => {
        oSubmit.addEventListener("click", onSubmit, false);
    }

    const onSubmit = async () => {
        const formData = getInputData();
        if (!formData) return;
        try {
            const response = await fetch("/api/reservation/add", {
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
                win.history.back();
            }, 3000);
        } catch (e) {
            tools.showAlert(oWrapper, "提交失败，请重试", false);
        } finally {
            tools.hideAlert();
        }
    }

    // 获取表单数据
    const getInputData = () => {
        const type = getRadioValue(oRadios),
            stuName = (oInputs.namedItem("name") as HTMLInputElement).value,
            sdept = (oInputs.namedItem("sdept") as HTMLInputElement).value,
            content = (oInputs.namedItem("content") as HTMLInputElement).value,
            time = (oInputs.namedItem("time") as HTMLInputElement).value,
            contact = (oInputs.namedItem("contact") as HTMLInputElement).value;
        const {isBlank} = tools;
        if (isBlank(type) || isBlank(stuName) || isBlank(sdept) || isBlank(content) || isBlank(time) || isBlank(contact)) {
            tools.showAlert(oWrapper, "请填写完整信息", false);
            tools.hideAlert();
            return;
        }
        const data: API.Reservation = {
            openid: tools.getOpenid(),
            type,
            stuName,
            sdept,
            content,
            time,
            contact
        };
        return data;
    }

    // 获取单选框值
    const getRadioValue = (radios: HTMLCollectionOf<HTMLInputElement>) => {
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return "";
    }

    init();
})(window, document, tools)