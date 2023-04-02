(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast, Dialog} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = ref();
            const loading = ref(false);
            const disabled = ref(false);

            onBeforeMount(() => {
                commonTools.createHeader("", {text: "", fn: commonTools.router.back});
            })
            onMounted(() => {

            })
            watch(loading, () => {
                if (loading.value) {
                    Toast.loading({
                        message: "请稍后...",
                        forbidClick: true,
                        duration: 0
                    });
                } else {
                    Toast.clear();
                }
            })
            const onSubmit = () => {
                loading.value = true;
                setTimeout(async () => {
                    const {code, data} = await commonTools.reqForPost("/api/xxx", {
                        // xxx
                    });
                    if (code != 10000) {
                        Toast.fail("xx失败");
                        loading.value = false;
                        return;
                    }
                    loading.value = false;
                    Dialog.alert({
                        title: '成功',
                        message: '您的xx已提交成功，xxxx!',
                        messageAlign: "left"
                    }).then(() => {
                        disabled.value = true;
                    });
                }, 1000);
            }

            return {
                state,
                disabled,
                onSubmit,
            }
        }
    })
        .use(vant)
        .mount("#root");
})();