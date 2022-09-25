(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = ref({
                count: 0,
                items: [],
                total: 0
            });
            const showPicker = ref(false);
            const loading = ref(false);
            const actions = [
                {name: '我丢东西了', value: 'lost'},
                {name: '我捡到东西了', value: 'found'}
            ];

            onBeforeMount(() => {
                commonTools.createHeader("失物招领", {
                    text: "", fn: commonTools.router.back
                }, {
                    text: "我的", fn: () => {
                        commonTools.router.to("lostandfound-history.html");
                    }
                })
            })
            onMounted(async () => {
                const page = 0, pageSize = 100;
                const {code, data} = await commonTools.reqForGet(`/api/laf/list?page=${page}&pageSize=${pageSize}`);
                if (code !== 10000) {
                    Toast.fail("获取数据失败");
                    return;
                }
                console.log(data)
                state.value = data;
            })
            watch(loading, (newValue: boolean, oldValue: boolean) => {
                Toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                });
            })
            const onSelect = (item: any) => {
                // 默认情况下点击选项时不会自动收起
                // 可以通过 close-on-click-action 属性开启自动收起
                showPicker.value = false;
                commonTools.router.to(`lostandfound-create.html?type=${item.value}`);
            };

            const getThumb = (imagesStr: string) => {
                if (imagesStr) {
                    const images = JSON.parse(imagesStr);
                    return images.length ? `https://${images[0]}` : "";
                }
            }
            return {
                state,
                showPicker,
                actions,
                onSelect,
                getThumb,
                commonTools
            }
        }
    })
        .use(vant)
        .mount("#root");

})();