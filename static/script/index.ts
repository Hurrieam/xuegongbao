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
            const openid = auth();
            if (!openid) {
                tools.showAlert(oDiv, "认证失败，请退出重试", false);
                return;
            }
            // 3. 获取用户信息
            if (!tools.getUserinfo()) {
                await getUserinfo(openid);
            }
            await addOneUsageRecord(openid);
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

        const auth = () => {
            // const redirect_uri = 'https%3A%2F%2F8ba2-240e-454-2b9-1b27-88c1-58c7-4fd-dace.jp.ngrok.io%2Fapi%2Fauthorize';
            const redirect_uri = 'https%3A%2F%2Fxgb.onezol.com%2Fapi%2Fauthorize';
            const appid = 'wxadfeee485d2a5b81';
            const params = tools.getPathParam();
            // @ts-ignore
            const openid = params["data"];
            // @ts-ignore
            const message = params["message"];
            if (message) {
                tools.showAlert(oDiv, message, false);
                return;
            }

            if (!openid) {
                const openid = tools.getOpenid();
                if (!openid) {
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
                }
            } else {
                localStorage.setItem('openid', openid);
                return openid;
            }
        }

        const getUserinfo = async (openid: string) => {
            if (!openid) return;
            try {
                const response = await fetch(`/api/user/get?openid=${openid}`);
                const {code, data} = await response.json();
                if (code != 10000) {
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
        const addOneUsageRecord = async (openid: string) => {
            const response = await fetch('/api/visit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    openid
                })
            });
            const {code} = await response.json();
            if (code == 10008) {
                localStorage.removeItem('openid');
                tools.showAlert(oDiv, "错误, 请退出重试！", false);
            }
        }

        await init();
    }
)
(window, document, tools);