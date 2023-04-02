(() => {
    const {Vue, vant} = window;
    const {onBeforeMount, onMounted} = Vue;
    const {Dialog} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const developers = [
                {name: "李秀明", githubId: "63219216"},
                {name: "胡瑞平", githubId: "77335318"},
            ];
            onBeforeMount(() => {
                commonTools.createHeader("关于我们", {text: "", fn: commonTools.router.back});
            })
            onMounted(() => {

            })
            const joinUs = () => {
                Dialog.alert({
                    title: '联系我',
                    message: `
                        <img src="asset/wechat-author.jpg" width="100%"/>
                    `,
                    allowHtml: true
                });
            }

            return {
                developers,
                joinUs,
            }
        }
    })
        .use(vant)
        .mount("#root");
})();