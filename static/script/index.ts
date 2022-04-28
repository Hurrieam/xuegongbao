;(async (doc, tools) => {
    const oWrapper = doc.getElementsByClassName('J_wrapper')[0] as HTMLDivElement;

    const init = async () => {
        // 测试网络连通状况
        await ping();
    }

    const ping = async () => {
        try {
            const response = await fetch('/api/ping');
            if (response.statusText != 'OK') {
                tools.showAlert(doc, oWrapper, '服务器连接失败，请检查网络连接！', "error");
            }
        } catch (e) {
            tools.showAlert(doc, oWrapper, '服务器连接失败，请检查网络连接！', "error");
        }
    }

    await init();

    // const redirect_uri = 'http://bag5rp.natappfree.cc/authorize';
    // const appid = 'wxadfeee485d2a5b81';
    // // 1. 首先从url中获取key
    // // 2. 若url中不存在key，则判断本地缓存中是否有openid
    // // 3. 如果没有，隐式进行微信授权，获得openid存储到cache并跳转回原页面
    // // 4. 如果有openid, 正常访问页面
    // const url = window.location.search
    // const openid = url.split('=')[1];
    // if (!openid) {
    //     const hasOpenid = localStorage.getItem('openid');
    //     if (!hasOpenid) {
    //         window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base#wechat_redirect`;
    //     }
    // }
    // localStorage.setItem('openid', openid);
})(document, tools);