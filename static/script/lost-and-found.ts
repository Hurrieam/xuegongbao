((doc, tools) => {
    const oWrapper = doc.getElementsByClassName('J_wrapper')[0] as HTMLDivElement,
        oList = doc.getElementsByClassName('list_wrapper')[0] as HTMLDivElement,
        oLoading = doc.getElementsByClassName('loading_wrapper')[0] as HTMLDivElement;

    const init = async () => {
        tools.createHeader(oWrapper, "寻物信息");

        const data = await fetchData();
        if (!data) {
            return;
        }
        renderList(data);
    }

    const fetchData = async () => {
        try {
            const response = await fetch("/api/laf/list?start=0&limit=10");
            const {code, data} = await response.json();
            if (code != 10000) {
                tools.showAlert(doc, oWrapper, "获取数据失败，请稍后再试!", "error");
                return;
            }
            return data.items;
        } catch (e) {
            tools.showAlert(doc, oWrapper, "获取数据失败，请稍后再试!", "error");
        } finally {
            oLoading.style.display = "none";
            tools.hideAlert(doc);
        }
    }

    // 渲染表格列表
    const renderList = (data: ILostAndFound[]) => {
        // 2. 渲染表格
        if (data.length === 0) {
            const nullStrElement = doc.createElement("div");
            nullStrElement.innerHTML = `
                <div class="weui-loadmore weui-loadmore_line">
                    <span class="weui-loadmore__tips">暂无数据</span>
                </div>
            `;
        } else {
            data.forEach(item => {
                const itemElement = doc.createElement("div");
                itemElement.innerHTML = `
                    <div class="weui-panel__bd J_item">
                        <div role="link" aria-labelledby="js_p4m1_title js_a11y_comma js_p4m1_desc"
                             aria-describedby="js_p4m1_source js_a11y_comma js_p4m1_time js_a11y_comma js_p4m1_extra"
                             class="weui-media-box weui-media-box_text">
                             <strong aria-hidden="true" class="weui-media-box__title" id="js_p4m1_title">${item.itemName}</strong>
                            <p class="weui-media-box__desc" aria-hidden="true" id="js_p4m1_desc">${item.description}</p>
                            <div class="weui-media-box__info" aria-hidden="true">
                                <span class="weui-media-box__info__meta" aria-hidden="true" id="js_p4m1_time">${new Date(<string>item.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                `;
                itemElement.addEventListener("click", () => {
                    // 跳转到详情页
                    location.href = `lost-and-found-detail.html?id=${item.id}`;
                });
                oList.appendChild(itemElement);
            });
        }
    }

    init();
})(document, tools);
