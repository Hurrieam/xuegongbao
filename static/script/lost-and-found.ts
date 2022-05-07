(async (win, doc, tools) => {
    const oWrapper = doc.getElementById('J_wrapper') as HTMLDivElement,
        oList = doc.getElementById('J_list') as HTMLDivElement;

    const init = async () => {
        const element = doc.createElement('div');
        element.innerHTML = `<span>我的</span>`;
        tools.createHeader(oWrapper, "失物招领", {element, href: "lost-and-found-history.html"});

        const data = await fetchData();
        if (!data) return;

        renderList(data);
    }

    const fetchData = async () => {
        tools.showInitLoading(oWrapper);
        try {
            const response = await fetch("/api/laf/list?start=0&limit=100");
            const {code, data} = await response.json();
            if (code != 10000) {
                tools.showAlert(oWrapper, "获取数据失败，请稍后再试!", false);
                return;
            }
            if (data.length > 0) oList.style.display = "block";
            return data.items;
        } catch (e) {
            tools.showAlert(oWrapper, "获取数据失败，请稍后再试!", false);
        } finally {
            tools.hideInitLoading();
            tools.hideAlert();
        }
    }

    // 渲染表格列表
    const renderList = (data: API.LostAndFound[]) => {
        if (data.length === 0) {
            tools.showNoData(oWrapper);
        } else {
            data.forEach(item => {
                const itemElement = doc.createElement("div");
                itemElement.innerHTML = `
                    <div class="weui-panel__bd">
                        <div role="link" aria-labelledby="js_p4m1_title js_a11y_comma js_p4m1_desc"
                             aria-describedby="js_p4m1_source js_a11y_comma js_p4m1_time js_a11y_comma js_p4m1_extra"
                             class="weui-media-box weui-media-box_text">
                            <div aria-hidden="true" class="weui-media-box__title">
                                <div class="weui-media-box__title_left">
                                    <svg t="1651587672484" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24068" width="20" height="20"><path d="M513.792 513.1264m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#3CD38E" p-id="24069"></path><path d="M784.4864 721.7152l-25.7024-347.136c-2.3552-32-30.0544-56.832-63.3856-56.832h-29.3888c-3.6864-80.7424-70.5536-145.3056-152.2176-145.3056-81.664 0-148.48 64.5632-152.2176 145.3056h-29.3888c-33.3312 0-60.9792 24.832-63.3856 56.832l-25.7024 347.136c-2.6112 35.4304 26.5216 65.536 63.3856 65.536h414.6688c36.8128 0 65.9456-30.1056 63.3344-65.536z m-270.6944-482.7136c44.9536 0 81.8688 34.7136 85.4528 78.7456H428.288c3.6352-43.9808 40.5504-78.7456 85.504-78.7456z m164.0448 462.9504a30.54592 30.54592 0 0 1-22.1696 9.4208c-7.68 0-15.3088-2.816-21.2992-8.5504l-48.7424-46.7968c-21.5552 13.824-47.1552 21.8624-74.5984 21.8624-76.4416 0-138.5984-62.1568-138.5984-138.5984s62.1568-138.5984 138.5984-138.5984c76.3904 0 138.5984 62.1568 138.5984 138.5984 0 26.7776-7.6288 51.7632-20.8384 72.96l48.128 46.2336c12.288 11.776 12.6464 31.232 0.9216 43.4688z" fill="#FFFFFF" p-id="24070"></path><path d="M511.0272 462.1824c-42.5472 0-77.1584 34.6112-77.1584 77.1584s34.6112 77.1584 77.1584 77.1584 77.1584-34.6112 77.1584-77.1584-34.6112-77.1584-77.1584-77.1584z" fill="#FFFFFF" p-id="24071"></path></svg>
                                    <span>${item.itemName}</span>
                                </div>
                                ${item.type == "lost" ? "<div class='weui-media-box__tag weui-media-box__tag_lose'>#丢东西了</div>" : "<span class='weui-media-box__tag weui-media-box__tag_found'>#捡到东西了</span>"}
                            </div>
                            <p class="weui-media-box__desc" aria-hidden="true">${item.description}</p>
                            <div class="weui-media-box__info" aria-hidden="true">
                                <span class="weui-media-box__info__meta" aria-hidden="true">发布时间: ${tools.formatDate(item.createdAt!)}</span>
                                <span class="to_detail_btn" aria-hidden="true">查看详情</span>
                            </div>
                        </div>
                    </div>
                `;
                itemElement.addEventListener("click", () => {
                    // 跳转到详情页
                    win.location.href = `lost-and-found-detail.html?id=${item.id}`;
                });
                oList.appendChild(itemElement);
            });
        }
    }

    await init();
})(window, document, tools);
