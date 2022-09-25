(() => {
    const {Vue, vant} = window;
    const {ref, onMounted, watch} = Vue;
    const {Toast} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = {
                obj: ref(""),
            }
            const loading = ref(false);

            onMounted(() => {

            })
            watch(loading, (newValue: boolean, oldValue: boolean) => {
                Toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                });
            })
            const onSubmit = () => {
                loading.value = true;
                setTimeout(async () => {
                    const {code, data} = await commonTools.reqForPost("/api/xxx", {
                       // xxx
                    });
                    if (code != 10000) {
                        Toast.fail("xx失败");
                        return;
                    }
                    loading.value = false;
                    setTimeout(() => {
                        Toast.success("xx成功");
                    }, 0);
                }, 1000);
            }

            return {
                state,
                onSubmit,
            }
        }
    })
        .use(vant)
        .mount("#root");
})();