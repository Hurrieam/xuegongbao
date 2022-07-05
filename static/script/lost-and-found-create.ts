(async (win, doc, tools) => {
    const oWrapper = doc.getElementById("J_wrapper") as HTMLDivElement,
        oTemplateInput = doc.getElementById("J_template_input") as HTMLTemplateElement,
        oTemplateUpload = doc.getElementById("J_template_upload") as HTMLTemplateElement,
        oTemplateTextarea = doc.getElementById("J_template_textarea") as HTMLTemplateElement,
        oItemWrapper = doc.getElementById("J_item_wrapper") as HTMLDivElement,
        oSubmit = doc.getElementById("J_submit") as HTMLButtonElement;

    const imageList: string[] = [];
    let oUploaderWrapper: HTMLDivElement;
    let type: string;

    const init = async () => {
        initHeader();
        bindEvent();
        render(type);
    }

    const initHeader = () => {
        // @ts-ignore
        type = tools.getPathParams()["type"];
        tools.createHeader(oWrapper, type === "lost" ? "发布失物信息" : "发布招领信息");
    }

    const bindEvent = () => {
        oSubmit.addEventListener("click", onSubmit, false);
    }

    const onSubmit = async () => {
        if(!tools.getOpenid()){
            tools.showUserinfoCollector(oWrapper);
            return;
        }
        // 1. 获取表单数据
        const formData: API.LostAndFound = getFormData() as API.LostAndFound;
        if (!formData) return;

        // 2. 上传表单信息
        try {
            const {code} = await tools.post("/api/laf/add", {...formData, images: JSON.stringify(imageList)});
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

    const onUploaderChange = async (e: Event) => {
        const oImageList = oWrapper.querySelector("#J_image_list") as HTMLDivElement;
        const files = (e.target as HTMLInputElement).files;
        if (!files || files.length == 0) {
            return;
        }
        const file = files[0];
        if (file.size > 1024 * 1024 * 5) {
            tools.showAlert(oWrapper, "图片大小不能超过5MB", false);
            tools.hideAlert();
            return;
        }
        let imgSrc = await imageUploader(file);
        if (!imgSrc) {
            return;
        }
        // 添加图片到图片列表
        imgSrc = "https://" + imgSrc;
        imageList.push(imgSrc);

        // 创建图片元素
        const li = doc.createElement("li");
        li.style.backgroundImage = `url(${trimQuotes(imgSrc)})`;
        li.className = "weui-uploader__file";
        oImageList.appendChild(li);

        if (oImageList.children.length >= 3) {
            oUploaderWrapper.remove();
        }
    }

    const getFormData = () => {
        const oInputs = oItemWrapper.getElementsByTagName("input") as HTMLCollectionOf<HTMLInputElement>;
        const oTextarea = oWrapper.querySelector("textarea") as HTMLTextAreaElement;
        const itemName = (oInputs.namedItem("itemName") as HTMLInputElement).value,
            location = (oInputs.namedItem("location") as HTMLInputElement).value,
            time = (oInputs.namedItem("time") as HTMLInputElement).value,
            description = oTextarea.value,
            stuName = (oInputs.namedItem("stuName") as HTMLInputElement).value,
            contact = (oInputs.namedItem("contact") as HTMLInputElement).value;

        const {isBlank} = tools;
        if (isBlank(itemName) || isBlank(description) || isBlank(contact)) {
            tools.showAlert(oWrapper, "请填写完整信息", false);
            tools.hideAlert();
            return;
        }

        const data: API.LostAndFound = {
            itemName,
            location,
            description,
            time,
            stuName,
            contact,
            type
        };

        return data;
    }

    // 上传图片
    const imageUploader = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Openid": localStorage.getItem("openid") as string
                },
                body: formData
            })
            const {code, data} = await response.json();
            if (code != 10000) {
                tools.showAlert(oWrapper, "上传失败，请重试", false);
                return;
            }
            return data;
        } catch (e) {
            tools.showAlert(oWrapper, "上传失败，请重试", false);
        } finally {
            tools.hideAlert();
        }
    }

    const render = (type: string) => {
        const userinfo = tools.getUserinfo();
        if (type == "lost") {
            createInputElement("物品名称", "itemName", "请填写丢失的物品名称");
            createInputElement("丢失地点", "location", "请填写物品的丢失地点");
            createInputElement("丢失时间", "time", "请填写物品的丢失时间");
            createTextareaElement();
            createUploaderElement();
            createInputElement("联系人", "stuName", "请填写你的姓名(选填)", userinfo["stuName"]);
            createInputElement("联系方式", "contact", "请填写你的联系方式(微信/QQ/手机号)");
        } else if (type == "found") {
            createInputElement("物品名称", "itemName", "请填写拾到的物品名称");
            createInputElement("拾到地点", "location", "请填写物品的拾到地点(选填)");
            createInputElement("拾到时间", "time", "请填写物品的拾到时间(选填)");
            createTextareaElement();
            createUploaderElement();
            createInputElement("联系人", "stuName", "请填写你的姓名(选填)", userinfo["stuName"]);
            createInputElement("联系方式", "contact", "请填写你的联系方式(微信/QQ/手机号)");
        } else {
            win.history.back();
        }

        // 为文件上传按钮绑定事件
        oUploaderWrapper = oWrapper.querySelector("#J_uploader_wrapper") as HTMLDivElement;
        const oUploader = oUploaderWrapper.querySelector("input[type=file]") as HTMLInputElement;
        oUploader.addEventListener("change", onUploaderChange, false);

        // 为Textarea绑定事件
        const oTextarea = oWrapper.querySelector("textarea") as HTMLTextAreaElement;
        oTextarea.addEventListener("input", (e: Event) => {
            tools.computeWordCount(e);
        }, false);
    }

    // 创建input输入框
    const createInputElement = (label: string, name: string, placeholder: string, defaultValue?: string) => {
        const node = oTemplateInput.content.cloneNode(true) as HTMLElement;
        node.querySelector(".J_label")!.innerHTML = label;
        node.querySelector("input")!.name = name;
        node.querySelector("input")!.placeholder = placeholder;
        node.querySelector("input")!.defaultValue = defaultValue || "";
        node.querySelector("input")!.type = "text";
        oItemWrapper.appendChild(node);
    }

    // 创建textarea输入框
    const createTextareaElement = () => {
        oItemWrapper.appendChild(oTemplateTextarea.content.cloneNode(true));
    }

    // 创建uploader
    const createUploaderElement = () => {
        oItemWrapper.appendChild(oTemplateUpload.content.cloneNode(true));
    }

    // 删除字符串两边的引号
    const trimQuotes = (str: string) => {
        return str.replace(/^"(.*)"$/, "$1");
    }

    await init();
})(window, document, tools);