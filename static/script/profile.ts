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
            const {code} = await tools.post("/api/user/update", data);
            if (code != 10000) {
                tools.showAlert(oWrapper, "保存失败", false);
                return;
            }
            tools.showAlert(oWrapper, "保存成功", true);
            saveToLocalStorage(data);
            setTimeout(() => {
                location.href = "index.html";
            }, 1500);
        } catch (e) {
            tools.showAlert(oWrapper, "保存失败", false);
        } finally {
            tools.hideAlert();
        }
    }

    const getFormData = () => {
        const stuName = oInputs.namedItem("stuName")!.value;
        const stuClass = oInputs.namedItem("stuClass")!.value;
        const stuId = oInputs.namedItem("stuId")!.value;
        if (tools.isBlank(stuName) || tools.isBlank(stuClass) || !checkStuId(stuId)) {
            tools.showAlert(oWrapper, "无效数据", false);
            tools.hideAlert();
            return null;
        }
        return {stuName, stuClass, stuId} as IProfile;
    }

    const saveToLocalStorage = ({stuName, stuClass, stuId}: IProfile) => {
        const userinfo: IProfile = tools.getUserinfo();
        localStorage.setItem("_userinfo", JSON.stringify({...userinfo, stuName, stuClass, stuId}));
        localStorage.setItem("_openid", stuId);
    }

    const checkStuId = (stuId: string) => {
        return !isNaN(Number(stuId)) && stuId.length >= 8;
    }

    init();
})(window, document, tools);