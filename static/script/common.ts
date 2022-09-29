const loadJS = async () => {
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.src = "https://openfpcdn.io/fingerprintjs/v3/iife.min.js";
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        script.onload = () => {
            resolve(null);
        }
    })
}
(async () => {
    // 1. 进入页面，如果用户不存在则创建
    const userinfo = localStorage.getItem("USERINFO");
    let fingerprint = localStorage.getItem("FINGERPRINT")
    if (!fingerprint) {
        await loadJS();
        //@ts-ignore
        const fp = await window.FingerprintJS.load();
        const {visitorId} = await fp.get();
        fingerprint = visitorId;
        localStorage.setItem("FINGERPRINT", visitorId);
    }
    if (!userinfo && fingerprint) {
        fetch("/api/user/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Fingerprint": fingerprint
            }
        });
    }
    fetch("/api/user/visit", {
        method: 'POST',
        headers: {
            "Fingerprint": fingerprint || ""
        }
    });
})();
(() => {
    const browser = {
        versions: function () {
            const u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）

                // @ts-ignore
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),

        // @ts-ignore
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    if (browser.versions.weixin) {
        // 禁用非微信客户端
    }
})()
const commonTools = {
    /**
     * 通用GET请求
     * @param url
     */
    reqForGet: async (url: string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'StuId': commonTools.getStuId(),
                "Fingerprint": commonTools.getFingerprint()
            }
        });
        return await res.json();
    },

    /**
     * 通用POST请求
     * @param url
     * @param data
     */
    reqForPost: async (url: string, data?: {}) => {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'StuId': commonTools.getStuId(),
                    "Fingerprint": commonTools.getFingerprint()
                },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (e) {
            window.vant.Toast.fail("网络错误");
        }
    },

    /**
     * 获取用户ID
     */
    getStuId: () => {
        return localStorage.getItem("STU_ID") as string;
    },

    /**
     * 获取客户端指纹
     */
    getFingerprint: () => {
        return localStorage.getItem("FINGERPRINT") as string;
    },

    /**
     * 获取用户信息
     */
    getUserinfo: () => {
        const userinfo = localStorage.getItem("USERINFO");
        return userinfo ? JSON.parse(userinfo) : null;
    },

    /**
     * 创建通用Header
     */
    createHeader: (title: string, leftProps?: { text: string, fn: Function }, rightProps?: { text: string, fn: Function }) => {
        const {Vue, vant} = window;
        const {ref, onBeforeMount} = Vue;
        const body = document.querySelector("body");
        const header = document.createElement("header");
        body?.insertBefore(header, body.firstChild);

        const template = `
            <van-nav-bar
                :title="titleRef"
                :left-text="canBack && left.text.value"
                :right-text="right.text.value"
                :left-arrow="canBack && left.text.value"
                @click-left="left.fn.value"
                @click-right="right.fn.value"
            ></van-nav-bar>
        `
        Vue.createApp({
            template,
            setup() {
                const canBack = ref(true);
                const titleRef = ref(title);
                const left = {
                    text: ref(leftProps?.text),
                    fn: ref(leftProps?.fn)
                };
                const right = {
                    text: ref(rightProps?.text),
                    fn: ref(rightProps?.fn)
                };
                onBeforeMount(() => {
                    canBack.value = document.referrer.includes(window.location.origin);
                })
                return {
                    canBack,
                    titleRef,
                    left,
                    right
                }
            }
        }).use(vant).mount("header");
    },

    /**
     * 显示用户信息收集器
     */
    showUserinfoSelector: () => {
        const {Vue, vant} = window;
        const {ref, onMounted, watch} = Vue;
        const {Toast} = vant;
        const body = document.querySelector("#root");
        const div = document.createElement("div");
        div.id = "userinfo-selector"
        body?.appendChild(div);
        const template = `
            <van-action-sheet v-model:show="show" title="填写信息" @cancel="onCancel"  @click-overlay="onCancel">
                <van-form @submit="onSubmit">
                    <van-cell-group inset>
                        <van-field
                            v-model="state.stuName.value"
                            name="姓名"
                            label="姓名"
                            placeholder="姓名"
                            :rules="[{ required: true, message: '请填写姓名' }]"
                        ></van-field>
                        <van-field
                            v-model="state.stuClass.value"
                            name="班级"
                            label="班级"
                            placeholder="班级"
                            :rules="[{ required: true, message: '请填写班级' }]"
                        ></van-field>
                        <van-field
                            v-model="state.stuId.value"
                            type="number"
                            name="学号"
                            label="学号"
                            placeholder="学号"
                            :rules="[{ required: true, message: '请填写学号' }]"
                        ></van-field>
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            保存
                        </van-button>
                    </div>
                </van-form>
            </van-action-sheet>
        `
        Vue.createApp({
            template,
            setup() {
                const state = {
                    stuName: ref(""),
                    stuClass: ref(""),
                    stuId: ref(null),
                }
                const show = ref(true);
                const loading = ref(false);
                onMounted(async () => {
                        const {code, data} = await commonTools.reqForGet("/api/user/detail");
                        if (code === 10000) {
                            const {stuName, stuClass, stuId} = data;
                            state.stuName.value = stuName;
                            state.stuClass.value = stuClass;
                            state.stuId.value = stuId;
                            localStorage.setItem("USERINFO", JSON.stringify(data));
                            localStorage.setItem("STU_ID", data.stuId);
                        }
                    }
                )
                watch(loading, () => {
                    Toast.loading({
                        message: "加载中...",
                        forbidClick: true,
                    });
                })
                const onSubmit = () => {
                    loading.value = true;
                    setTimeout(async () => {
                        const {code, data} = await commonTools.reqForPost("/api/user/update", {
                            stuName: state.stuName.value,
                            stuClass: state.stuClass.value,
                            stuId: state.stuId.value,
                        });
                        if (code != 10000) {
                            Toast.fail("保存失败");
                            return;
                        }
                        loading.value = false;
                        setTimeout(() => {
                            // Toast.success("保存成功");
                            localStorage.setItem("USERINFO", JSON.stringify(data));
                            localStorage.setItem("STU_ID", data.stuId);
                            onCancel();
                        }, 0);
                    }, 1000);
                }
                const onCancel = () => {
                    document.querySelector("#userinfo-selector")!.remove()
                }
                return {
                    state,
                    show,
                    onSubmit,
                    onCancel
                }
            }
        }).use(vant).mount("#userinfo-selector");
    },

    router: {
        /**
         * 路由回退
         */
        back: () => {
            window.history.back();
        },
        /**
         * 页面跳转
         */
        to: (path: string) => {
            window.location.href = "/static/".concat(path);
        }
    },

    /**
     * 获取路径参数
     */
    getPathParams: () => {
        const search = window.location.search;
        const params = new Map();
        if (search) {
            const searchArr = search.slice(1).split('&');
            searchArr.forEach((item: string) => {
                const vars = item.split('=');
                params.set(vars[0], vars[1]);
            });
        }
        return params;
    },

    /**
     * 格式化时间
     */
    formatDate: (dateStr: string) => {
        let newDate: string;
        try {
            const date = new Date(dateStr);
            newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
        } catch (e) {
            newDate = dateStr;
        }
        return newDate;
    },

    /**
     * 是否实名
     */
    hasRealName: () => {
        const userinfo: Model.IUser = commonTools.getUserinfo();
        return userinfo && userinfo.stuName.length > 0 && userinfo.stuClass.length > 0 && userinfo.stuId.length > 0;
    },

    isActiveUser: () => {
        const userinfo: Model.IUser = commonTools.getUserinfo();
        return userinfo && userinfo.stuName.length > 0 && userinfo.stuClass.length > 0 && userinfo.stuId.length > 0;
    }
}