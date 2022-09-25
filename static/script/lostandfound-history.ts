(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = {
                myLost: ref([]),
                myFound: ref([])
            }
            const activatedTab = ref("lost");
            const loading = ref(false);

            onBeforeMount(() => {
                commonTools.createHeader("我的发布", {text: "", fn: commonTools.router.back});
            })
            onMounted(async () => {
                await fetchData(activatedTab.value);
            })
            watch(loading, () => {
                Toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                });
            })
            watch(activatedTab, async () => {
                await fetchData(activatedTab.value);
            })
            const fetchData = async (type: string) => {
                const page = 0, pageSize = 100;
                const {
                    code,
                    data
                } = await commonTools.reqForGet(`/api/laf/by-type?type=${type}&page=${page}&pageSize=${pageSize}`);
                if (code !== 10000) {
                    Toast.fail("获取数据失败");
                    return;
                }
                type = type.charAt(0).toUpperCase() + type.substring(1);
                // @ts-ignore
                state["my" + type].value = data.items;
            }
            const getThumb = (imagesStr: string) => {
                if (imagesStr) {
                    const images = JSON.parse(imagesStr);
                    return images.length ? `https://${images[0]}` : "";
                }
            }
            return {
                state,
                activatedTab,
                getThumb,
                commonTools,
            }
        }
    })
        .use(vant)
        .mount("#root");
})();