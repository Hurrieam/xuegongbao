(async (win, doc, tools) => {
        interface IUserInfo {
            openid?: string;
            nickname: string;
            stuName: string;
            stuClass: string;
            stuId: string;
            avatar: string;
        }

        const oDiv = doc.getElementById("J_div") as HTMLDivElement;

        const init = async () => {
            // 1. 测试网络连通状况
            await ping();
            // 2. 认证用户
            await auth();
        }

        const ping = async () => {
            try {
                const response = await fetch('/api/ping');
                if (!response.ok) {
                    tools.showAlert(oDiv, '服务器连接失败，请检查网络连接！', false);
                }
            } catch (e) {
                tools.showAlert(oDiv, '服务器连接失败，请检查网络连接！', false);
            }
        }

        const auth = async () => {
            // const redirect_uri = 'https%3A%2F%2F0d25-240e-454-1b9-8bdd-f96d-4570-e2a2-1b23.jp.ngrok.io%2Fapi%2Fauthorize';
            const redirect_uri = 'https%3A%2F%2Fxgb.onezol.com%2Fapi%2Fauthorize';
            const appid = 'wxadfeee485d2a5b81';
            const params = tools.getPathParams();
            // @ts-ignore
            const openid = params["openid"];
            // @ts-ignore
            const message = params["message"];
            if (message) {
                tools.showAlert(oDiv, message, false);
                return;
            }
            const openidInCache = localStorage.getItem("openid") || "";
            if (!openid && !openidInCache) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
                return;
            } else if (openid) {
                localStorage.setItem('openid', openid);
            }
            await afterAuth();
        }

        const afterAuth = async () => {
            //  获取用户信息
            await getUserinfo();

            // 添加用户访问记录
            await addOneUsageRecord();
        }

        const getUserinfo = async () => {
            try {
                const {code, data} = await tools.get(`/api/user/get`);
                if (code != 10000) {
                    localStorage.removeItem('openid');
                    tools.showAlert(oDiv, '获取用户信息失败！', false);
                    return;
                }
                const userinfo = data as IUserInfo;
                delete userinfo.openid;
                localStorage.setItem('userinfo', JSON.stringify(userinfo));
            } catch (e) {
                tools.showAlert(oDiv, '获取用户信息失败！', false);
            } finally {
                tools.hideAlert();
            }
        }

        // 添加一条访问记录
        const addOneUsageRecord = async () => {
            const {code} = await tools.post(`/api/visit`)
            if (code == 10008) {
                localStorage.removeItem('openid');
                tools.showAlert(oDiv, "错误, 请退出重试！", false);
            }
        }

        await init();
    }
)
(window, document, tools);