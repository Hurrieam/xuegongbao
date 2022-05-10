((win, doc, tools) => {
    interface IEvaluation {
        canteenName: string;
        content: IEvalItem[];
        mainProblem: string;
        totalScore: number;
    }

    interface IEvalItem {
        question: string;
        score: string;
        explain: string;
    }

    const oWrapper = doc.getElementById("J_wrapper") as HTMLDivElement,
        oCanteen = doc.getElementById("J_selection") as HTMLDivElement,
        oList = doc.getElementById("J_list") as HTMLDivElement,
        oTemplate = doc.getElementById("J_template") as HTMLTemplateElement,
        oSubmit = doc.getElementById("J_submit") as HTMLButtonElement;


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
    ]

    const init = () => {
        tools.checkLogin();
        tools.createHeader(oWrapper, "食堂评价");
        bindEvent();
        render();
    }

    const bindEvent = () => {
        oSubmit.addEventListener("click", onSubmit, false);
    }

    const onSubmit = async () => {
        // 1. 获取所有的评价数据
        const data: IEvaluation = getFormData();
        if (!data) return;

        // 2. 发送请求
        try {
            const {code} = await tools.post("/api/eval/add", {...data, content: JSON.stringify(data.content)});
            if (code != 10000) {
                tools.showAlert(oWrapper, "提交失败，请稍后重试", false);
                return;
            }
            tools.showAlert(oWrapper, "提交成功", true);
            tools.disableButton(oSubmit);
        } catch (e) {
            tools.showAlert(oWrapper, "提交失败，请稍后重试", false);
        } finally {
            tools.hideAlert();
        }
    }

    const render = () => {
        (oWrapper.querySelector(".button_wrapper") as HTMLDivElement).style.visibility = "visible";
        oCanteen.style.visibility = "visible";
        questions.forEach((question, index) => {
            handleTemplate(question + "?", index + 1);
        })
    }

    const getFormData = (): IEvaluation => {
        const evalItems: IEvalItem[] = [];
        const canteenName = getRadioValue(oCanteen.querySelectorAll("input[type=radio]") as unknown as HTMLCollectionOf<HTMLInputElement>);

        // 遍历所有的评价项并取其值
        const divs = oList.querySelectorAll(".J_item");
        let totalScore = 0, minScore = Number.MAX_VALUE, mainProblem = "";
        divs.forEach((div) => {
            const question = div.querySelector("h4")!.innerHTML.substring(3);
            const score = getRadioValue(div.querySelectorAll("input[type=radio]") as unknown as HTMLCollectionOf<HTMLInputElement>);
            const explain = (div.querySelector("input[type=text]") as HTMLInputElement).value;
            const currScore = parseInt(score);
            totalScore += currScore;
            if (currScore < minScore) {
                minScore = currScore;
                mainProblem = question;
            }
            evalItems.push({
                question,
                score,
                explain
            } as IEvalItem);
        });

        evalItems.forEach((item) => {
            if (item.score == "") {
                tools.showAlert(oWrapper, "请填写完整", false);
                tools.hideAlert();
                return;
            }
        })
        return {
            canteenName,
            content: evalItems,
            mainProblem,
            totalScore
        };
    }

    // 处理模板
    const handleTemplate = (title: string, index: number) => {
        const docFragment = oTemplate.content.cloneNode(true) as DocumentFragment;
        const item = docFragment.querySelector(".J_item") as HTMLDivElement;
        item.querySelector("h4")!.innerHTML = index + ". " + title;
        const radios = item.querySelectorAll("input[type=radio]");
        radios.forEach(radio => {
            radio.setAttribute("name", index.toString());
        });
        oList.appendChild(docFragment);
    }

    // 获取单选框值
    const getRadioValue = (radios: HTMLCollectionOf<HTMLInputElement>) => {
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return "";
    }

    init();
})(window, document, tools);