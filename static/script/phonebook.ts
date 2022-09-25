(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted} = Vue;
    const {Toast} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const state = {
                dept: ref([]),
                people: ref([])
            }
            const input = ref("");
            onBeforeMount(() => {
                commonTools.createHeader("校园电话簿", {text: "", fn: commonTools.router.back});
            })
            onMounted(async () => {
                fetchData("dept", 0, 50);
                fetchData("people", 0, 50);
            })
            const fetchData = async (type: string, page: number, pageSize: number) => {
                const {
                    code,
                    data
                } = await commonTools.reqForGet(`/api/phonebook/by-type?type=${type}&page=${page}&pageSize=${pageSize}`)
                if (code !== 10000) {
                    Toast.fail("数据获取失败");
                    return;
                }
                // @ts-ignore
                state[type].value = data.items;
            }
            const onCopy = (item: any) => {
                navigator.clipboard.writeText(item.phone);
                Toast("复制成功");
            }
            const onSearch = async (value: string) => {
                const {code, data} = await commonTools.reqForGet(`/api/phonebook/search?name=${value}`)
                if (code !== 10000) {
                    Toast.fail("数据获取失败");
                    return;
                }
                state.dept.value = data.dept.items;
                state.people.value = data.people.items;
            }
            return {
                state,
                onCopy,
                onSearch
            }
        }
    })
        .use(vant)
        .mount("#root");

})();