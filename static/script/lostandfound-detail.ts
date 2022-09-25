(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = ref({});
            const loading = ref(false);
            const showBigImage = ref(false);
            const currentImage = ref("");
            const colors = ["#f94e3f", "#A593E0", "#3ac569", "#77AF9C", "#ED9282", "#9BAEC8", "#F94E3F"];

            onBeforeMount(() => {
                commonTools.createHeader("动态详情", {text: "", fn: commonTools.router.back});
            })
            onMounted(async () => {
                const id = commonTools.getPathParams().get("id");
                const {code, data} = await commonTools.reqForGet(`/api/laf/detail?id=${id}`);
                if (code !== 10000) {
                    Toast.fail("获取数据失败");
                    return;
                }
                console.log(data)
                state.value = {
                    ...data,
                    tags: JSON.parse(data.tags ? data.tags : []),
                    images: JSON.parse(data.images ? data.images : []),
                    createdAt: commonTools.formatDate(data.created_at)
                };
            })
            watch(loading, () => {
                Toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                });
            })
            const imgOnClick = (imgIndex: number) => {
                currentImage.value = imgIndex;
                showBigImage.value = true;
            }

            return {
                state,
                showBigImage,
                imgOnClick,
                currentImage,
                colors,
                commonTools
            }
        }
    })
        .use(vant)
        .mount("#root");
})();