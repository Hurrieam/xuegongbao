;(async (win, doc,tools) => {
    const oWrapper = doc.getElementsByClassName('J_wrapper')[0] as HTMLDivElement,
        oLoading = doc.getElementsByClassName('J_loading')[0] as HTMLDivElement,
        oItem = oWrapper.getElementsByClassName("J_item")[0] as HTMLDivElement;

    const init = async () => {
        tools.createHeader(oWrapper,"留言详情");
        const params = getPathParam();
        // @ts-ignore
        const id = params["id"];
        const data = await fetchData(id);
        renderList(data);
    }

    // 获取url参数
    const getPathParam = () => {
        const search = win.location.search;
        const params = {};
        if (search) {
            const searchArr = search.slice(1).split('&');
            searchArr.forEach(item => {
                const arr = item.split('=');
                // @ts-ignore
                params[arr[0]] = arr[1];
            });
        }
        return params;
    }

    // 根据id获取留言详情
    const fetchData = async (id: number | string) => {
        try{
            oWrapper.style.display = "none";
            const url = `/api/comment/detail?id=${id}`;
            const response = await fetch(url);
            const {code, data} = await response.json();
            if (code != 10000) {
                console.log("error")
                return [];
            }
            return data.items;
        }catch (e) {
            return [];
        }finally {
            oLoading.style.display = "none";
            oWrapper.style.display = "block";
        }
    }

    // 渲染列表
    const renderList = (data: ICommentDetail[]) => {
        const html = data.map((item, index) => `
                 <div class="weui-cell weui-cell_access">
                    <span class="weui-cell__bd">
                        <span>${index != 0 ? `<span style="color: #333333; font-size: 14px">回复: </span>` : ""}${item.content}</span>
                        <span>${new Date(item.createdAt).toLocaleString()}</span>
                    </span>
                 </div>
            `
        );
        oItem.innerHTML = html.join('');
    }

    await init();
})(window, document, tools);