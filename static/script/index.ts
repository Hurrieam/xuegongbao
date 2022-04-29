(async (doc, tools) => {
    const oWrapper = doc.getElementsByClassName('J_wrapper')[0] as HTMLDivElement;

    const init = async () => {
        await ping(); // 测试网络连通状况
        // auth();
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

    const auth = () => {
        const redirect_uri = 'https%3A%2F%2F7c48-240e-454-1b9-4fc9-e5d4-f472-bd95-38c3.ap.ngrok.io%2Fapi%2Fauthorize';
        const appid = 'wxadfeee485d2a5b81';
        // 1. 首先从url中获取key
        // 2. 若url中不存在key，则判断本地缓存中是否有openid
        // 3. 如果没有，隐式进行微信授权，获得openid存储到cache并跳转回原页面
        // 4. 如果有openid, 正常访问页面
        const params = tools.getPathParam();
        // @ts-ignore
        if (!isValidOpenid(params["openid"])) {
            const hasOpenid = localStorage.getItem('openid');
            if (!hasOpenid || !isValidOpenid(hasOpenid)) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base#wechat_redirect`;
            }
        }else{
            // @ts-ignore
            localStorage.setItem('openid', params["openid"]);
        }
    }

    const isValidOpenid = (openid:string) => {
        return !tools.isBlank(openid) && openid != 'undefined' && openid != 'null';
    }

    await init();
})(document, tools);