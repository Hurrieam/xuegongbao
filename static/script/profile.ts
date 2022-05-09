((win, doc, tools) => {
    interface IProfile {
        openid: string;
        nickname: string;
        stuName: string;
        stuClass: string;
        stuId: string;
        avatar: string;
    }

    const oWrapper = doc.getElementById("J_wrapper") as HTMLDivElement,
        oInputs = doc.getElementsByTagName("input") as HTMLCollectionOf<HTMLInputElement>,
        oSubmit = doc.getElementById("J_submit") as HTMLButtonElement;

    const init = () => {
        tools.createHeader(oWrapper, "我的信息");
        initProfile();
        bindEvent();
    }

    const bindEvent = () => {
        oSubmit.addEventListener("click", onSubmit, false);
    }
    const initProfile = () => {
        const userinfo = tools.getUserinfo();
        if (userinfo) {
            oInputs.namedItem("stuName")!.value = userinfo.stuName == "***" ? "" : userinfo.stuName;
            oInputs.namedItem("stuClass")!.value = userinfo.stuClass == "***" ? "" : userinfo.stuClass;
            oInputs.namedItem("stuId")!.value = userinfo.stuId == "***" ? "" : userinfo.stuId;
        }
    }
    const onSubmit = async () => {
        const data: IProfile | null = getFormData();
        if (!data) return;

        try {
            const response = await fetch("/api/user/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...data, openid: tools.getOpenid()})
            });
            const {code} = await response.json();
            if (code != 10000) {
                tools.showAlert(oWrapper, "更新失败", false);
                return;
            }
            tools.showAlert(oWrapper, "更新成功", true);
            tools.disableButton(oSubmit);
            saveToLocalStorage(data);
        } catch (e) {
            tools.showAlert(oWrapper, "更新失败", false);
        } finally {
            tools.hideAlert();
        }
    }

    const getFormData = () => {
        const stuName = oInputs.namedItem("stuName")!.value;
        const stuClass = oInputs.namedItem("stuClass")!.value;
        const stuId = oInputs.namedItem("stuId")!.value;
        if (tools.isBlank(stuName) || tools.isBlank(stuClass) || tools.isBlank(stuId)) {
            tools.showAlert(oWrapper, "请填写完整信息", false);
            tools.hideAlert();
            return null;
        }
        return {stuName, stuClass, stuId} as IProfile;
    }

    const saveToLocalStorage = ({stuName, stuClass, stuId}: IProfile) => {
        const userinfo: IProfile = tools.getUserinfo();
        localStorage.setItem("userinfo", JSON.stringify({...userinfo, stuName, stuClass, stuId}));
    }

    init();
})(window, document, tools);