(async (doc, tools) => {
    const oWrapper = doc.getElementsByClassName('J_wrapper')[0] as HTMLDivElement,
        oList = doc.getElementsByClassName('list_wrapper')[0] as HTMLDivElement;

    let data: API.Comment[] = [];

    const init = async () => {
        tools.createHeader(oWrapper, "留言列表")
        // 1. 获取所有数据
        data = await fetchData();
        // 2. 根据数据条数渲染列表
        renderList(data);
    }

    // 从服务器获取数据
    const fetchData = async () => {
        tools.showInitLoading(oWrapper);
        try {
            const openid = tools.getOpenid();
            const result = await fetch(`/api/comment/by-user?openid=${openid}&start=0&limit=100`);
            const {code, data} = await result.json();
            if (code !== 10000) {
                tools.showAlert(oWrapper, "获取数据失败，请稍后再试", false);
                return;
            }
            return data.items;
        } catch (e) {
            tools.showAlert(oWrapper, "获取数据失败，请稍后再试", false);
        } finally {
            tools.hideInitLoading();
            oList.style.display = 'block';
        }
    }

    // 渲染表格列表
    const renderList = (data: API.Comment[]) => {
        if (data.length === 0) {
            tools.showNoData(oWrapper);
        } else {
            data.forEach(item => {
                const itemElement = doc.createElement("div");
                itemElement.innerHTML = `
                    <div class="weui-panel__bd J_item">
                        <div role="link" aria-labelledby="js_p4m1_title js_a11y_comma js_p4m1_desc"
                             aria-describedby="js_p4m1_source js_a11y_comma js_p4m1_time js_a11y_comma js_p4m1_extra"
                             class="weui-media-box weui-media-box_text">
                            <p class="weui-media-box__desc" aria-hidden="true" id="js_p4m1_desc">${item.content}</p>
                            <div class="weui-media-box__info" aria-hidden="true">
                                <span class="weui-media-box__info__meta" aria-hidden="true" id="js_p4m1_time">${new Date(<string>item.createdAt).toLocaleString()}</span>
                                ${item.hasReply ? `<span id="js_a11y_nb" class="weui-badge">已回复</span>` : ''}
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