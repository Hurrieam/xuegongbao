(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted} = Vue;
    const {Toast} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = ref({
                count: 0,
                items: [],
                total: 0
            });

            onBeforeMount(() => {
                commonTools.createHeader("我的留言", {
                    text: "", fn: commonTools.router.back
                });
            })
            onMounted(async () => {
                const {code, data} = await commonTools.reqForGet("/api/message/by-user?page=0&pageSize=100");
                if (code !== 10000) {
                    Toast.fail("加载数据失败");
                    return;
                }
                state.value = data;
                console.log(state.value)
            })
            const onClick = (id: string | number) => {
                const path = `message-detail.html?id=${id}`
                commonTools.router.to(path);
            }

            return {
                state,
                onClick,
                commonTools,
            }
        }
    })
        .use(vant)
        .mount("#root");
})();