(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Form, Field, CellGroup, Toast, Dialog} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = {
                stuName: ref(""),
                stuClass: ref(""),
                stuId: ref(""),
            }
            const loading = ref(false);
            onBeforeMount(() => {
                commonTools.createHeader("我的信息", {
                    text: "返回", fn: commonTools.router.back
                })
            })
            onMounted(async () => {
                const userinfo: Model.IUser = commonTools.getUserinfo();
                if (userinfo) {
                    state.stuName.value = userinfo.stuName;
                    state.stuClass.value = userinfo.stuClass;
                    state.stuId.value = userinfo.stuId;
                } else {
                    const {code, data} = await commonTools.reqForGet("/api/user/get");
                    if (code === 10000) {
                        const {stuName, stuClass, stuId} = data;
                        state.stuName.value = stuName;
                        state.stuClass.value = stuClass;
                        state.stuId.value = stuId;
                        localStorage.setItem("USERINFO", JSON.stringify(data));
                        localStorage.setItem("STU_ID", data.stuId);
                    }
                }
            })
            watch(loading, (newValue: boolean, oldValue: boolean) => {
                Toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                });
            })
            const onSubmit = () => {
                if (!isChanged()) {
                    Toast({
                        message: "数据未更改",
                        position: "top",
                    });
                    return;
                }
                loading.value = true;
                setTimeout(async () => {
                    const {code, data} = await commonTools.reqForPost("/api/user/update", {
                        stuName: state.stuName.value,
                        stuClass: state.stuClass.value,
                        stuId: state.stuId.value,
                    });
                    if (code != 10000) {
                        Toast.fail("保存失败");
                        return;
                    }
                    loading.value = false;
                    setTimeout(() => {
                        Toast.success("保存成功");
                        localStorage.setItem("USERINFO", JSON.stringify(data));
                        localStorage.setItem("STU_ID", data.stuId);
                    }, 0);
                }, 1000);
            }
            const isChanged = () => {
                const userinfo: Model.IUser = commonTools.getUserinfo();
                return state.stuName.value !== userinfo.stuName ||
                    state.stuClass.value !== userinfo.stuClass ||
                    state.stuId.value !== userinfo.stuId;
            }
            const clearCache = () => {
                localStorage.clear();
                Dialog.alert({
                    title: '成功',
                    message: '本地缓存已全部清空!',
                }).then(() => {
                    window.history.go(0);
                });

            }
            return {
                state,
                onSubmit,
                clearCache
            }
        }
    })
        .use(vant)
        .use(Form)
        .use(Field)
        .use(CellGroup)
        .mount("#root");

})();