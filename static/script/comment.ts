(async (doc, tools) => {
    const oWrapper = doc.getElementById('J_wrapper') as HTMLDivElement,
        oList = doc.getElementById('J_list') as HTMLDivElement;

    let data: API.Comment[] = [];

    const init = async () => {
        tools.createHeader(oWrapper, "我的留言")
        // 1. 获取所有数据
        data = await fetchData();
        // 2. 渲染列表
        render(data);
    }

    // 从服务器获取数据
    const fetchData = async () => {
        if(!tools.getOpenid()) {
            return;
        }
        tools.showInitLoading(oWrapper);
        try {
            const {code, data} = await tools.get(`/api/comment/by-user?start=0&limit=100`);
            if (code !== 10000) {
                tools.showAlert(oWrapper, "获取数据失败，请稍后再试", false);
                return;
            }
            if (data.count > 0) oList.style.display = 'block';
            return data.items;
        } catch (e) {
            tools.showAlert(oWrapper, "获取数据失败，请稍后再试", false);
        } finally {
            tools.hideInitLoading();
        }
    }

    // 渲染表格列表
    const render = (data: API.Comment[]) => {
        if (!data || data.length === 0) {
            tools.showNoData(oWrapper);
        } else {
            data.forEach(item => {
                const itemElement = doc.createElement("div");
                itemElement.innerHTML = `
                    <div class="weui-panel__bd J_item">
                        <div role="link" aria-labelledby="js_p4m1_title js_a11y_comma js_p4m1_desc"
                             aria-describedby="js_p4m1_source js_a11y_comma js_p4m1_time js_a11y_comma js_p4m1_extra"
                             class="weui-media-box weui-media-box_text">
                            <p class="weui-media-box__desc" aria-hidden="true">${item.content}</p>
                            <div class="weui-media-box__info" aria-hidden="true">
                                <span class="weui-media-box__info__meta" aria-hidden="true">${tools.formatDate(item.createdAt!)}</span>
                                ${item.hasReply ? `<span class="badge">已回复</span>` : ''}
                            </div>
                        </div>
                    </div>
                `;
                itemElement.addEventListener("click", () => {
                    // 跳转到详情页
                    location.href = `comment-detail.html?id=${item.id}`;
                });
                oList.appendChild(itemElement);
            });
        }
    }

    await init();
})(document, tools);