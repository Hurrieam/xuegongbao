(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast, Dialog} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = {
                content: ref(""),
                checked: ref(false)
            }
            const loading = ref(false);
            const disabled = ref(false);

            onBeforeMount(() => {
                commonTools.createHeader("我要留言", {
                    text: "", fn: commonTools.router.back
                });
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
                if (!state.checked.value && !commonTools.isActiveUser()) {
                    commonTools.showUserinfoSelector();
                    return;
                }
                loading.value = true;
                setTimeout(async () => {
                    const {code, data} = await commonTools.reqForPost("/api/message/create", {
                        content: state.content.value,
                        anonymous: state.checked.value
                    });
                    if (code != 10000) {
                        Toast.fail("提交失败");
                        loading.value = false;
                        return;
                    }
                    loading.value = false;
                    Dialog.alert({
                        title: '成功',
                        message: '您的留言已提交成功!',
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