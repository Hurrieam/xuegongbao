(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast, Dialog} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = ref({
                contactMethod: "微信",
                images: []
            });
            const tag = ref("");
            const tags = ref([]);
            const type = ref();
            const images = ref([]);
            const contactMethods = ["QQ", "微信", "电话"];
            const colors = ["#f94e3f", "#A593E0", "#3ac569", "#77AF9C", "#ED9282", "#9BAEC8", "#F94E3F"];
            const showPicker = ref(false);
            const disabled = ref(false);
            const loading = ref(false);

            onBeforeMount(() => {
                // 获取页面类型
                const params = commonTools.getPathParams();
                type.value = params.get("type");
                commonTools.createHeader(type.value === "found" ? "发布招领信息" : "发布失物信息", {
                    text: "",
                    fn: commonTools.router.back
                });
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
            const onOversize = (file: File) => {
                Toast('图片大小不能超过 10MB');
            }
            const onSubmit = async () => {
                if (!commonTools.isActiveUser()) {
                    commonTools.showUserinfoSelector();
                    return;
                }
                loading.value = true;
                // 上传照片
                try {
                    await uploadImage(images.value);
                } catch (e) {
                    loading.value = false;
                    return;
                }
                // 提交信息
                setTimeout(async () => {
                    const {title, location, date, description, images, contactMethod, contactNumber} = state.value;
                    const {code, data} = await commonTools.reqForPost("/api/laf/create", {
                        tags: JSON.stringify(tags.value),
                        images: JSON.stringify(images),
                        type: type.value,
                        title, location, date, description, contactMethod, contactNumber
                    });
                    if (code != 10000) {
                        Toast.fail("提交失败");
                        loading.value = false;
                        return;
                    }
                    loading.value = false;
                    Dialog.alert({
                        title: '成功',
                        message: '您的信息已提交成功!',
                    }).then(() => {
                        disabled.value = true;
                    });
                }, 1000);
            }
            const onConfirm = (value: string) => {
                state.value.contactMethod = value;
                showPicker.value = false;
            }
            // 图片上传
            const uploadImage = async (fileObjects: Object[]) => {
                for (const fileObject of fileObjects) {
                    // @ts-ignore
                    const file = fileObject.file as File;
                    const formData = new FormData();
                    formData.append("file", file);
                    const response = await fetch("/api/upload", {
                        method: "POST",
                        headers: {
                            'StuId': commonTools.getStuId(),
                            "Fingerprint": commonTools.getFingerprint()
                        },
                        body: formData
                    })
                    const {code, data: imgSrc} = await response.json();
                    if (code != 10000) {
                        Toast.fail("上传图片失败, Error code " + code);
                        throw new Error("上传图片失败");
                    }
                    state.value.images.push(imgSrc);
                }
            }
            const addTag = () => {
                if (tag.value && !tags.value.includes(tag.value)) {
                    tags.value.push(tag.value);
                }
                tag.value = "";
            }
            const onClose = (tag: string) => {
                tags.value = tags.value.filter((e: string) => e !== tag);
            }

            return {
                state,
                tag,
                tags,
                type,
                images,
                onSubmit,
                onOversize,
                contactMethods,
                onConfirm,
                addTag,
                onClose,
                showPicker,
                disabled,
                colors
            }
        }
    })
        .use(vant)
        .mount("#root");
})();