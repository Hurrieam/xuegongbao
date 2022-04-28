const tools = (() => {
    // 判断字符串是否为空
    const isBlank = (str: string) => {
        return (!str || /^\s*$/.test(str));
    };

    // 通用Nav Header
    const createHeader = (parentElement: HTMLElement, title: string) => {
        const header = document.createElement('header');
        header.innerHTML = `
            <a href="javascript:history.go(-1);" class="header-back">
                <svg t="1651131243636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7939" width="16" height="16"><path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z" p-id="7940" fill="#515151"></path></svg>
                <span>返回</span>
            </a>
            <h3 class="header-title">${title}</h3>
            <a href="javascript:history.go(-1);" style="visibility: hidden">
                <svg t="1651131243636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7939" width="16" height="16"><path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z" p-id="7940" fill="#515151"></path></svg>
                <span>占位</span>
            </a>
        `;
        header.classList.add('nav-header');
        parentElement.insertBefore(header, parentElement.firstChild);
    };

    // 弹窗
    const showAlert = (doc: HTMLDocument, parentElement: HTMLElement, message: string, type: string) => {
        doc.getElementById("J_alert")?.remove();
        let className = "";
        switch (type) {
            case "ok":
                className = "weui-icon-success-no-circle";
                break;
            case "error":
                className = "weui-icon-warn";
                break;
        }
        const div = doc.createElement("div");
        div.innerHTML = `
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="${className} weui-icon_toast"></i>
                <p class="weui-toast__content">${message}</p>
            </div>
       `;
        div.id = "J_alert";
        parentElement.appendChild(div);
    }

    // 隐藏弹窗
    const hideAlert = (doc: HTMLDocument) => {
        setTimeout(() => {
            const alert = doc.getElementById("J_alert") as HTMLElement;
            if (alert) {
                alert.style.display = "none";
            }
        }, 2000);
    }

    // 实时计算Textarea的字数 (显示结果的div需要标注J_word_limit类)
    const computeWordCount = (doc: HTMLDocument, e: Event) => {
        const oTarget = e.target as HTMLTextAreaElement,
            oWordLimit = doc.getElementsByClassName('J_word_limit')[0] as HTMLElement;
        oWordLimit.innerText = `${oTarget.value.length}`;
    }

    // 获取url参数
    const getPathParam = (win: any) => {
        const search = win.location.search;
        const params = {};
        if (search) {
            const searchArr = search.slice(1).split('&');
            searchArr.forEach((item: string) => {
                const arr = item.split('=');
                // @ts-ignore
                params[arr[0]] = arr[1];
            });
        }
        return params;
    }
    // 格式化时间
    const formatDate = (date: string) => {
        let res: string = "";
        try {
            res = new Date(date).toLocaleString().substring(0, 15);
        } catch (e) {
            res = date;
        }
        return res;
    };

    const getOpenid = ()=>{
       return localStorage.getItem("openid");
    }

    return {
        isBlank,
        createHeader,
        showAlert,
        hideAlert,
        computeWordCount,
        getPathParam,
        formatDate,
        getOpenid
    }
})();
