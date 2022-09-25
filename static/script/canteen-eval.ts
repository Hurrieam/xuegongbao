(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast, Dialog} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = ref({
                canteen: "CS"
            });
            const ratings = ref({});
            const selectedCanteen = ref("城市餐厅");
            const loading = ref(false);
            const showPicker = ref(false);
            const disabled = ref(false);
            const questions = [
                "食堂饭菜卫生情况",
                "食堂饭菜是否好吃",
                "食堂饭菜价格是否合理",
                "食堂饭菜分量是否足够",
                "食堂饭菜是否油腻",
                "食堂就餐环境是否舒适",
                "食堂饭菜品种是否丰富",
                "食堂餐具是否卫生",
                "食堂菜品更新速度",
                "食堂工作人员态度是否热情",
            ];
            const canteens = {
                CS: "城市餐厅",
                MZ: "民族餐厅",
                ZK: "中快餐厅",
                CY: "城苑餐厅",
            }
            onBeforeMount(() => {
                commonTools.createHeader("食堂评价", {text: "", fn: commonTools.router.back});
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
                const questionRates = questions.map((question, index) => ({
                    question,
                    rate: (ratings.value[index] || 0) * 2
                }))
                setTimeout(async () => {
                    const {canteen, idea} = state.value;
                    const {code, data} = await commonTools.reqForPost("/api/canteen-eval/create", {
                        ratings: JSON.stringify(questionRates),
                        canteen, idea
                    });
                    if (code != 10000) {
                        Toast.fail("提交失败");
                        loading.value = false;
                        return;
                    }
                    loading.value = false;
                    setTimeout(() => {
                        Dialog.alert({
                            title: '成功',
                            message: '您的评价已提交成功!',
                        }).then(() => {
                            disabled.value = true;
                        });
                    }, 0);
                }, 1000);
            }
            const onConfirm = (value: string) => {
                selectedCanteen.value = value;
                // @ts-ignore
                state.value.canteen = Object.keys(canteens).find(key => canteens[key] === value);
                showPicker.value = false;
            }

            return {
                state,
                ratings,
                showPicker,
                questions,
                canteens,
                selectedCanteen,
                disabled,
                onSubmit,
                onConfirm
            }
        }
    })
        .use(vant)
        .mount("#root");
})();