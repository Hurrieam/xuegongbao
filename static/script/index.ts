(async (win, doc, tools) => {
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

        const auth = () => {
            const userinfo = tools.getUserinfo();
            const openid = tools.getUserinfo();
            if (!userinfo || !openid) {
                win.location.href = 'profile.html';
                return;
            }
            // 添加用户访问记录
            addOneUsageRecord();
        }

        // const getUserinfo = async () => {
        //     const userinfo = tools.getUserinfo();
        //     if (userinfo) {
        //         return;
        //     }
        //     try {
        //         const {code, data} = await tools.get(`/api/user/get`);
        //         if (code != 10000) {
        //             tools.showAlert(oDiv, '获取用户信息失败！', false);
        //             return;
        //         }
        //         const userinfo = data as IUserInfo;
        //         delete userinfo.openid;
        //         localStorage.setItem('userinfo', JSON.stringify(userinfo));
        //     } catch (e) {
        //         tools.showAlert(oDiv, '获取用户信息失败！', false);
        //     } finally {
        //         tools.hideAlert();
        //     }
        // }

        // 添加一条访问记录
        const addOneUsageRecord = async () => {
            const {code} = await tools.post(`/api/visit`)
            if (code == 10008) {
                localStorage.removeItem('_userinfo');
                localStorage.removeItem('_openid');
                alert("错误, 请退出重试！");
            }
        }

        await init();
    }
)
(window, document, tools);