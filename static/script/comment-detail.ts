(async (win, doc, tools) => {
    const oWrapper = doc.getElementById('J_wrapper') as HTMLDivElement,
        oItem = doc.getElementById("J_item") as HTMLDivElement;

    const init = async () => {
        tools.checkLogin();
        tools.createHeader(oWrapper, "留言详情");
        const params = tools.getPathParams();
        // @ts-ignore
        const data = await fetchData(params["id"]);
        renderList(data);
    }

    // 根据id获取留言详情
    const fetchData = async (id: number | string) => {
        tools.showInitLoading(oWrapper);
        try {
            const {code, data} = await tools.get(`/api/comment/detail?id=${id}`);
            if (code != 10000) {
                return [];
            }
            return data.items;
        } catch (e) {
            return [];
        } finally {
            tools.hideInitLoading();
            oItem.style.display = "block";
        }
    }

    // 渲染列表
    const renderList = (data: API.Comment[]) => {
        const html = data.map((item, index) => `
                 <div class="weui-cell weui-cell_access">
                    <span class="weui-cell__bd">
                        <span>${index != 0 ? `<span style="color: #F53F3F; font-size: 14px; font-weight: 600">回复: </span>` : ""}${item.content}</span>
                        <span>${tools.formatDate(item.createdAt!)}</span>
                    </span>
                 </div>
            `
        );
        oItem.innerHTML = html.join('');
    }

    await init();
})(window, document, tools);