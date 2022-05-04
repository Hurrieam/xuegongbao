((win, doc, tools) => {
    const oWrapper = doc.getElementById("J_wrapper") as HTMLDivElement,
        oList = doc.getElementById("J_list") as HTMLDivElement,
        oTemplate = doc.getElementById("J_template") as HTMLTemplateElement,
        oSubmit = doc.getElementById("J_submit") as HTMLButtonElement;

    interface IEvalItem {
        title: string;
        score: string;
        explain: string;
    }

    const questions = [
        "食堂饭菜卫生干净度?",
        "食堂饭菜是否好吃?",
        "食堂饭菜价格是否合理?",
        "食堂饭菜分量是否足够?",
        "食堂饭菜是否油腻?",
        "食堂就餐环境是否舒适?",
        "食堂饭菜品种是否丰富?",
        "食堂餐具是否卫生?",
        "食堂菜品更新速度?",
        "食堂工作人员态度是否热情?",
    ]

    const init = () => {
        tools.createHeader(oWrapper, "食堂评价");
        bindEvent();
        render();
    }

    const bindEvent = () => {
        oSubmit.addEventListener("click", onSubmit, false);
    }

    const onSubmit = async () => {
        const data = getFormData();
        if (data.length == 0) return;
        const openid = tools.getOpenid();
        try {
            const response = await fetch("/api/eval/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    openid: openid,
                    evals: data
                })
            });
            const {code} = await response.json();
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
        questions.forEach((question, index) => {
            handleTemplate(question, index + 1);
        })
    }

    const getFormData = (): IEvalItem[] => {
        const data: IEvalItem[] = [];
        const items = oList.querySelectorAll(".J_item");
        items.forEach((item) => {
            const title = item.querySelector("h4")!.innerHTML.substring(3);
            const score = getRadioValue(item.querySelectorAll("input[type=radio]") as unknown as HTMLCollectionOf<HTMLInputElement>);
            const explain = (item.querySelector("input[type=text]") as HTMLInputElement).value;
            if (tools.isBlank(score)) {
                tools.showAlert(oWrapper, "请填写完整!", false);
                tools.hideAlert();
                return;
            }
            data.push({title, score, explain} as IEvalItem);
        });
        return data.length == questions.length ? data : [];
    }

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