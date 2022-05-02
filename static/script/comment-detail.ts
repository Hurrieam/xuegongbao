(async (win, doc,tools) => {
    const oWrapper = doc.getElementsByClassName('J_wrapper')[0] as HTMLDivElement,
        oItem = oWrapper.getElementsByClassName("J_item")[0] as HTMLDivElement;

    const init = async () => {
        tools.createHeader(oWrapper,"留言详情");
        const params = tools.getPathParam();
        // @ts-ignore
        const data = await fetchData(params["id"]);
        renderList(data);
    }

    // 根据id获取留言详情
    const fetchData = async (id: number | string) => {
        tools.showInitLoading(oWrapper);
        try{
            oWrapper.style.display = "none";
            const url = `/api/comment/detail?id=${id}`;
            const response = await fetch(url);
            const {code, data} = await response.json();
            if (code != 10000) {
                return [];
            }
            return data.items;
        }catch (e) {
            return [];
        }finally {
            tools.hideInitLoading();
            oWrapper.style.display = "block";
        }
    }

    // 渲染列表
    const renderList = (data: API.Comment[]) => {
        const html = data.map((item, index) => `
                 <div class="weui-cell weui-cell_access">
                    <span class="weui-cell__bd">
                        <span>${index != 0 ? `<span style="color: #333333; font-size: 14px">回复: </span>` : ""}${item.content}</span>
                        <span>${tools.formatDate(item.createdAt as string)}</span>
                    </span>
                 </div>
            `
        );
        oItem.innerHTML = html.join('');
    }

    await init();
})(window, document, tools);