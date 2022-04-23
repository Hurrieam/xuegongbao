interface IPhoneItem {
    id: number;
    department: string;
    phone: string;
}

((doc) => {
    const oWrapper = doc.getElementsByClassName('J_wrapper')[0],
        oTable = oWrapper.getElementsByTagName("table")[0],
        oSearch = oWrapper.getElementsByTagName("input")[0],
        oNotFound = oWrapper.getElementsByClassName("J_notfound")[0];

    let data: IPhoneItem[] = [];

    const init = () => {
        // 绑定事件函数
        oSearch.onchange = onSearch;
        // 1. 获取所有数据
        data = fetchData();
        // 2. 根据数据条数渲染表格
        renderTable(data);
    }

    // 从服务器获取数据
    const fetchData = () => {
        return [
            {
                id: 1,
                department: "张三",
                phone: "123456789"
            },
            {
                id: 2,
                department: "李四",
                phone: "987654321"
            },
            {
                id: 3,
                department: "王五",
                phone: "123456789"
            },
            {
                id: 4,
                department: "赵六",
                phone: "987654321"
            },
            {
                id: 5,
                department: "田七",
                phone: "123456789"
            },
            {
                id: 6,
                department: "钱八",
                phone: "987654321"
            },
            {
                id: 7,
                department: "孙九",
                phone: "123456789"
            },
            {
                id: 8,
                department: "周十",
                phone: "987654321"
            }
        ]
    }

    // 搜索
    const onSearch = () => {
        const value = oSearch.value;
        const result = data.filter(item => item.department.indexOf(value) > -1);
        renderTable(result);
    }

    // 渲染表格列表
    const renderTable = (data: IPhoneItem[]) => {
        // 1. 清空表格
        oTable.innerHTML = "";
        oNotFound.innerHTML = "";
        // 2. 渲染表格
        if (data.length === 0) {
            const nullStrElement = doc.createElement("div");
            nullStrElement.innerHTML = "暂无数据";
            oNotFound.appendChild(nullStrElement);
        } else {
            data.forEach(item => {
                const tr = doc.createElement("tr");
                tr.innerHTML = `
                <td>${item.department}</td>
                <td>${item.phone}</td>
            `;
                oTable.appendChild(tr);
            })
        }
    }

    init();
})(document);
