const tools = ((win, doc) => {
    // 判断字符串是否为空
    const isBlank = (str: any) => {
        return str === null || str === undefined || str.replace(/\s+/g, '').length === 0;
    };

    // 通用Nav Header
    const createHeader = (parentElement: HTMLElement, title: string, extra?: { element: HTMLElement, href: string }) => {
        const header = doc.createElement('header');
        header.innerHTML = `
            <a href="javascript:history.go(-1);" class="header-back">
                <svg t="1651131243636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7939" width="16" height="16"><path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z" p-id="7940" fill="#515151"></path></svg>
                <span>返回</span>
            </a>
            <h3 class="header-title">${title}</h3>
            ${
            extra ? `<a href="${extra.href}" class="header-extra">${extra.element.innerHTML}</a>` : '<span style="visibility: hidden">占位位</span>'
        }
        `;
        header.classList.add('nav-header');
        parentElement.insertBefore(header, parentElement.firstChild);
    };

    // 弹窗
    const showAlert = (parentElement: HTMLElement, message: string, success: boolean) => {
        doc.getElementById("J_alert")?.remove();
        let className: string = success ? 'weui-icon-success-no-circle' : 'weui-icon-warn';
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
    const hideAlert = () => {
        setTimeout(() => {
            const alert = doc.getElementById("J_alert") as HTMLElement;
            if (alert) {
                alert.style.display = "none";
            }
        }, 2000);
    }

    // 实时计算Textarea的字数 (显示结果的div需要标注J_word_limit类)
    const computeWordCount = (e: Event) => {
        const oTarget = e.target as HTMLTextAreaElement,
            oWordLimit = doc.getElementsByClassName('J_word_limit')[0] as HTMLElement;
        oWordLimit.innerText = `${oTarget.value.length}`;
    }

    // 获取url参数
    const getPathParams = () => {
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
        let res: string;
        try {
            const d = new Date(date);
            res = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours() < 10 ? "0" + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}`;
        } catch (e) {
            res = date;
        }
        return res;
    };

    const getOpenid = (): string => {
        return localStorage.getItem("_openid") || "";
    }

    const showInitLoading = (parentElement: HTMLElement) => {
        const div = doc.createElement("div");
        div.innerHTML = `
            <span>加载中...</span>
            <i class="weui-loading"></i>
       `;
        div.id = "J_loading";
        div.className = "loading_wrapper";
        parentElement.appendChild(div);
    }

    const hideInitLoading = () => {
        const loading = doc.getElementById("J_loading") as HTMLElement;
        if (loading) {
            loading.style.display = "none";
        }
    }

    const showNoData = (parentElement: HTMLElement) => {
        const div = doc.createElement("div");
        div.innerHTML = `
            <img src="asset/nodata.svg" alt="暂无数据">
            <span>暂无数据</span>
       `;
        div.className = "nodata_wrapper";
        parentElement.appendChild(div);
    }

    const disableButton = (button: HTMLButtonElement, text?: string) => {
        button.disabled = true;
        button.innerText = text ? text : button.innerText;
        button.style.opacity = "0.5";
    }

    const getUserinfo = () => {
        const userinfo = localStorage.getItem("_userinfo");
        try {
            return userinfo ? JSON.parse(userinfo) : null;
        } catch (e) {
            return null;
        }
    }


    const get = async (url: string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Openid': getOpenid()
            }
        });
        return await res.json();
    }

    const post = async (url: string, data?: {}) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Openid': getOpenid()
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    const checkLogin = () => {
        const openid = getOpenid();
        const userinfo = getUserinfo();
        if (!userinfo || !openid) {
            localStorage.removeItem("_openid");
            localStorage.removeItem("_userinfo");
            alert("请先填写个人信息");
            win.location.href = "index.html";
        }
    }

    const showUserinfoCollector = (parentElement: HTMLElement) => {
        const div = doc.createElement("div");
        div.innerHTML = `
            <div class="weui-cells form_list collector" id="J_list">
                <label class="weui-cell">
                    <div class="weui-cell__hd"><span class="weui-label">姓名</span></div>
                    <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="填写你的真实姓名" name="stuName"/>
                    </div>
                </label>
                <label class="weui-cell">
                    <div class="weui-cell__hd"><span class="weui-label">班级</span></div>
                    <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="填写你的班级" name="stuClass"/>
                    </div>
                </label>
                <label class="weui-cell">
                    <div class="weui-cell__hd"><span class="weui-label">学号</span></div>
                    <div class="weui-cell__bd">
                    <input class="weui-input" placeholder="填写你的学号" name="stuId"/>
                    </div>
                </label>
                </div>
                <div class="collector_button_wrapper">
                <button class="weui-btn btn-color" id="J_save">保存</button>
            </div>
            </div>
        `;
        div.className = "userinfo_collector_wrapper";
        parentElement.appendChild(div);
        const oSaveBtn = doc.getElementById("J_save") as HTMLButtonElement;
        const oInputs = doc.getElementsByTagName("input") as HTMLCollectionOf<HTMLInputElement>;
        oSaveBtn!.addEventListener("click", () => {
            const stuName = oInputs.namedItem("stuName")!.value;
            const stuClass = oInputs.namedItem("stuClass")!.value;
            const stuId = oInputs.namedItem("stuId")!.value;
            if (tools.isBlank(stuName) || tools.isBlank(stuClass) || tools.isBlank(stuId)) {
                tools.showAlert(parentElement, "无效数据", false);
                tools.hideAlert();
                return;
            }
            localStorage.setItem("_userinfo", JSON.stringify({stuName, stuClass, stuId}));
            localStorage.setItem("_openid", stuId);
            tools.showAlert(parentElement, "保存成功", true);
            tools.hideAlert();
            setTimeout(() => {
                div.style.display = "none";
            }, 1500);
        })
    }

    return {
        isBlank,
        createHeader,
        showAlert,
        hideAlert,
        computeWordCount,
        getPathParams,
        formatDate,
        getOpenid,
        showInitLoading,
        hideInitLoading,
        showNoData,
        disableButton,
        getUserinfo,
        get,
        post,
        checkLogin,
        showUserinfoCollector
    }
})(window, document);
