(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast, Dialog} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = ref({
                feedbackType: "功能建议",
                content: "",
                images: []
            });
            const loading = ref(false);
            const disabled = ref(false);
            const type = ref();
            const images = ref([]);

            onBeforeMount(() => {
                commonTools.createHeader("我要反馈", {text: "", fn: commonTools.router.back});
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
            const onSubmit = async () => {
                loading.value = true;
                // 上传照片
                try {
                    state.value.images = await commonTools.uploadFile(images.value, "image", "feedback");
                } catch (e) {
                    loading.value = false;
                    Toast.fill("文件上传失败");
                    return;
                }
                // 提交信息
                setTimeout(async () => {
                    const {feedbackType, content, images} = state.value;
                    console.log(images)
                    const {code, data} = await commonTools.reqForPost("/api/feedback", {
                        images: JSON.stringify(images),
                        type: feedbackType,
                        content
                    });
                    if (code != 10000) {
                        Toast.fail("提交失败");
                        loading.value = false;
                        return;
                    }
                    loading.value = false;
                    Dialog.alert({
                        title: '成功',
                        message: '您的反馈信息已提交成功!',
                    }).then(() => {
                        disabled.value = true;
                    });
                }, 1000);
            }

            const onOversize = (file: File) => {
                Toast('图片大小不能超过 10MB');
            }
            return {
                state,
                type,
                images,
                disabled,
                onOversize,
                onSubmit,
            }
        }
    })
        .use(vant)
        .mount("#root");
})();