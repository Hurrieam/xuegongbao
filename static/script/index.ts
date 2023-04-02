(() => {
    const {Vue, vant} = window;
    const {ref, onBeforeMount, onMounted, watch} = Vue;
    const {Toast, Dialog} = vant;
    Vue.createApp({
        template: "#template",
        setup() {
            const services = ref({
                internal: [
                    {name: "电话簿", url: "phonebook.html", icon: "phone-o"},
                    {name: "宿舍报修", url: "dorm-repair.html", icon: "send-gift-o"},
                    {name: "我要留言", url: "message.html", icon: "smile-comment-o"},
                    {name: "咨询预约", url: "reservation.html", icon: "medal-o"},
                    {name: "失物招领", url: "lostandfound.html", icon: "tosend"},
                    {name: "食堂评价", url: "canteen-eval.html", icon: "smile-o"},
                ],
                external: [
                    {name: "四六级查询", url: "http://cet.neea.edu.cn/html1/folder/22023/595-1.htm", icon: "ecard-pay"},
                    {name: "教务系统", url: "http://jxgl.xjtucc.cn/(ukdr2p55nw0fso455uwjukvt)/default2.aspx", icon: "cluster-o"},
                    {name: "校历查询", url: "http://www.xjtucc.cn/xnfw/xyxl.htm", icon: "notes-o"},
                ],
                others: [
                    {name: "关于我们", url: "about.html", icon: "certificate"},
                ],
            })
            const notice = ref("国庆佳节, 祝祖国繁荣昌盛、国泰民安！祝愿各位同学度过一个平安、愉快的国庆假期！");  //:D 获取中...
            onMounted(() => {

            })
            const viewNotice = () => {
                Toast("开发中...")
            }

            return {
                services,
                notice,
                viewNotice,
                commonTools
            }
        }
    })
        .use(vant)
        .mount("#root");
})();