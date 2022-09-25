(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast, Dialog} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = ref({
                type: "心理咨询",
                contactMethod: "微信"
            });
            const contactMethods = ["QQ", "微信", "电话"];
            const showPicker = ref(false);
            const showCalendar = ref(false);
            const loading = ref(false);
            const disabled = ref(false);
            onBeforeMount(() => {
                commonTools.createHeader("咨询预约", {text: "", fn: commonTools.router.back});
            })
            onMounted(() => {
                setTimeout(() => {
                    Dialog.alert({
                        message:
                            "1. 心理咨询又称心理辅导，由专业人员即心理咨询师运用心理学以及相关知识，遵循心理学原则，借助语言、文字等媒介，给咨询对象以帮助、启发、暗示和教育的过程，解决其在学习、工作、生活、疾病和康复等方面出现的心理问题，促使咨询对象的自我调整，从而能够更好地适应环境，保持身心健康。" + "\n" +
                            "2. 职业规划是对职业生涯乃至人生进行持续的系统的计划的过程，又叫职业生涯设计，是指个人与组织相结合，在对一个人职业生涯的主客观条件进行测定、分析、总结的基础上，对自己的兴趣、爱好、能力、特点进行综合分析与权衡，结合时代特点，根据自己的职业倾向，确定其最佳的职业奋斗目标，并为实现这一目标做出行之有效的安排。",
                        messageAlign: "left"
                    }).then(() => {
                        // on close
                    });
                }, 1000);
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
                if (!commonTools.hasRealName()) {
                    commonTools.showUserinfoSelector();
                    return;
                }
                loading.value = true;
                setTimeout(async () => {
                    const {type, content, date, contactMethod, contactNumber} = state.value;
                    const {code, data} = await commonTools.reqForPost("/api/reservation/create", {
                        type, content, date, contactMethod, contactNumber
                    });
                    loading.value = false;
                    if (code != 10000) {
                        Toast.fail("提交失败");
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
            const onPickerConfirm = (value: string) => {
                state.value.contactMethod = value;
                showPicker.value = false;
            }
            const onCalendarConfirm = (date: Date) => {
                state.value.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                showCalendar.value = false;
            };
            return {
                state,
                contactMethods,
                disabled,
                onSubmit,
                onPickerConfirm,
                onCalendarConfirm,
                showPicker,
                showCalendar
            }
        }
    })
        .use(vant)
        .mount("#root");
})();