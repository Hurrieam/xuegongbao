(async (win, doc, tools) => {
    const oWrapper = doc.getElementById('J_wrapper') as HTMLDivElement,
        oBtnWrapper = doc.getElementById('J_btn_wrapper') as HTMLDivElement,
        oStatusBtn = doc.getElementById('J_button_status') as HTMLButtonElement,
        oDeleteBtn = doc.getElementById('J_button_delete') as HTMLButtonElement,
        oTemplate = doc.getElementById('J_template') as HTMLTemplateElement;

    let state = {id: null, type: ""};

    const init = async () => {
        tools.createHeader(oWrapper, "寻物详情");

        const params = tools.getPathParam();
        // @ts-ignore
        state = {id: params.id, type: params.type};
        const data: API.LostAndFound = await fetchData(state.id!);
        if (!data) return;

        if (state.type == "history") {
            oBtnWrapper.style.visibility = "visible";
            if (data.status) {
                tools.disableButton(oStatusBtn, "我已找到(禁用)");
            }
            bindEvent();
        }

        render(data);
    }

    const bindEvent = () => {
        oStatusBtn.addEventListener("click", updateStatus, false);
        oDeleteBtn.addEventListener("click", deleteItem, false);
    }

    const fetchData = async (id: number) => {
        tools.showInitLoading(oWrapper);
        try {
            // @ts-ignore
            const response = await fetch(`/api/laf/get?id=${id}`);
            const {code, data} = await response.json();
            if (code !== 10000) {
                tools.showAlert(oWrapper, "获取信息失败", false);
                return;
            }
            return data;
        } catch (e) {
            tools.showAlert(oWrapper, "获取信息失败", false);
        } finally {
            tools.hideInitLoading();
            tools.hideAlert();
        }
    }

    const updateStatus = async (e: Event) => {
        handleTemplate(oTemplate, "更新状态", "如果您找到了你的物品,请确认。", "update", async () => {
            try {
                const response = await fetch("/api/laf/status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: state.id
                    })
                });
                const {code} = await response.json();
                if (code !== 10000) {
                    tools.showAlert(oWrapper, "删除失败", false);
                    return;
                }
                tools.showAlert(oWrapper, "状态更新成功", true);
                tools.disableButton(oStatusBtn, "我已找到(禁用)");
            } catch (e) {
                tools.showAlert(oWrapper, "状态更新失败", false);
            } finally {
                tools.hideAlert();
            }
        });
    }

    const deleteItem = (e: Event) => {
        handleTemplate(oTemplate, "删除信息", "确定删除该条信息吗？", "delete", async () => {
            try {
                const response = await fetch("/api/laf/delete", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: state.id
                    })
                });
                const {code} = await response.json();
                if (code !== 10000) {
                    tools.showAlert(oWrapper, "删除失败", false);
                    return;
                }
                tools.showAlert(oWrapper, "删除成功", true);
                setTimeout(() => {
                    win.location.replace(doc.referrer);
                }, 1500);
            } catch (e) {
                tools.showAlert(oWrapper, "删除失败", false);
            } finally {
                tools.hideAlert();
            }
        });
    }

    const render = (data: API.LostAndFound) => {
        const div = doc.createElement("div");
        div.innerHTML = `
            <div role="option" aria-labelledby="p1 js_a11y_comma p2 js_a11y_comma p3" class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">物品名称</label>
                    <span class="weui-form-preview__value">${data.itemName}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">详情描述</label>
                    <span class="weui-form-preview__value">${data.description ? data.description : "未知"}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">丢失地点</label>
                    <span class="weui-form-preview__value">${data.location ? data.location : "未知"}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">丢失时间</label>
                    <span class="weui-form-preview__value">${data.lostTime ? data.lostTime : "未知"}</span>
                </div>
                <div class="weui-form-preview__item J_imageList">
                    <label class="weui-form-preview__label">图片</label></br>
                    <ul class="weui-uploader__files"></ul>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">姓名</label>
                    <span class="weui-form-preview__value">${data.stuName ? data.stuName : "保密"}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">联系方式</label>
                    <span class="weui-form-preview__value">${data.contact ? data.contact : "未知"}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">发布时间</label>
                    <span class="weui-form-preview__value">${tools.formatDate(data.createdAt ?? "")}</span>
                </div>
            </div>
        `;
        div.className = "weui-form-preview";
        const ul = div.querySelector(".J_imageList ul") as HTMLElement;
        if (data.images && data.images.length > 0) {
            const images: string[] = JSON.parse(data.images);
            images.forEach(image => {
                const li = doc.createElement("li");
                li.className = "weui-uploader__file";
                li.style.backgroundImage = `url(${image})`;
                li.style.backgroundSize = "100%";
                li.style.backgroundRepeat = "no-repeat";
                li.style.backgroundPosition = "center";
                ul.appendChild(li);
            });
        } else {
            div.querySelector(".J_imageList")?.remove();
        }
        oWrapper.appendChild(div);
    }

    // 处理模板
    const handleTemplate = (template: HTMLTemplateElement, title: string, content: string, operation: string, handler: () => void) => {
        const docFragment = template.content.cloneNode(true) as DocumentFragment;
        const dialog = docFragment.querySelector(".J_dialog") as HTMLElement;
        docFragment.querySelector("#J_dialog_title")!.innerHTML = title;
        docFragment.querySelector("#J_dialog_content")!.innerHTML = content;
        docFragment.querySelector("#J_btn_cancel")!.addEventListener("click", () => {
            dialog.remove();
        });
        docFragment.querySelector("#J_btn_confirm")!.addEventListener("click", () => {
            dialog.remove();
            handler();
        });
        oWrapper.appendChild(docFragment);
    }

    await init();
})(window, document, tools);

