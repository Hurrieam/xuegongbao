(async (win, doc, tools) => {
    const oWrapper = doc.getElementsByClassName('wrapper')[0] as HTMLDivElement,
        oDelButton = oWrapper.getElementsByClassName('button_wrapper')[0] as HTMLButtonElement;

    const init = async () => {
        tools.createHeader(oWrapper, "寻物详情");
        const params = tools.getPathParam();
        console.log(params);

        // @ts-ignore
        const data: ILostAndFound = await fetchData(params['id']);
        if (!data) {
            return;
        }
        // @ts-ignore
        if (params["type"] == "history") {
            oDelButton.style.visibility = "visible";
        }
        render(data);
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
            return [];
        } finally {
            tools.hideInitLoading();
            tools.hideAlert();
        }
    }

    const render = (data: ILostAndFound) => {
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

    await init();
})(window, document, tools);

