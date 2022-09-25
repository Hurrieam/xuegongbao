(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = {
                message: ref(""),
                replies: ref([])
            };
            const loading = ref(false);

            onBeforeMount(() => {
                commonTools.createHeader("留言详情", {
                    text: "", fn: commonTools.router.back
                })
            })
            onMounted(async () => {
                await fetchData();
            })
            watch(loading, () => {
                Toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                });
            })
            const fetchData = async () => {
                const params = commonTools.getPathParams();
                const id = params.get("id");
                const {code, data} = await commonTools.reqForGet(`/api/message/detail?id=${id}`)
                if (code !== 10000) {
                    Toast.fail("数据获取失败");
                    return;
                }
                state.message.value = data.items[0];
                state.replies.value = data.items.filter((item: any, idx: number) => idx !== 0);
                console.log(state.replies.value)
            }
            return {
                state,
                commonTools
            }
        }
    })
        .use(vant)
        .mount("#root");
})();