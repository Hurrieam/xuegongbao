(async (doc, tools) => {
    const oWrapper = doc.getElementById('J_wrapper') as HTMLDivElement;

    const init = async () => {
        await ping(); // 测试网络连通状况
        await auth();
    }

    const ping = async () => {
        try {
            const response = await fetch('/api/ping');
            if (!response.ok) {
                tools.showAlert(oWrapper, '服务器连接失败，请检查网络连接！', false);
            }
        } catch (e) {
            tools.showAlert(oWrapper, '服务器连接失败，请检查网络连接！', false);
        }
    }

    const auth = async () => {
        // const redirect_uri = 'https%3A%2F%2Fcdf9-240e-454-3d-8012-ecea-81f6-264a-5144.jp.ngrok.io%2Fapi%2Fauthorize';
        const redirect_uri = 'https%3A%2F%2Fxgb.onezol.com%2Fapi%2Fauthorize';
        const appid = 'wxadfeee485d2a5b81';
        // 1. 首先从url中获取key
        // 2. 若url中不存在key，则判断本地缓存中是否有openid
        // 3. 如果没有，隐式进行微信授权，获得openid存储到cache并跳转回原页面
        // 4. 如果有openid, 正常访问页面
        const params = tools.getPathParam();
        // @ts-ignore
        let openid = params["openid"];
        if (!isValidOpenid(openid)) {
            openid = localStorage.getItem('openid');
            if (!openid || !isValidOpenid(openid)) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base#wechat_redirect`;
            } else {
                await addOneUsageRecord(openid);
            }
        } else {
            localStorage.setItem('openid', openid);
        }
    }

    // 添加一条访问记录
    const addOneUsageRecord = async (openid: string) => {
        await fetch('/api/visit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                openid
            })
        });
    }

    const isValidOpenid = (openid: string) => {
        return !tools.isBlank(openid) && openid != 'undefined' && openid != 'null';
    }

    await init();
})(document, tools);