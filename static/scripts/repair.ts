interface IRepairItem {
    dormitory: FormDataEntryValue | null;
    room: FormDataEntryValue | null;
    content: FormDataEntryValue | null;
    contact: FormDataEntryValue | null;
}

;((doc) => {
    const oForm = doc.getElementsByTagName('form')[0] as HTMLFormElement,
        oSubmitBtn = oForm.getElementsByTagName('button')[0] as HTMLButtonElement,
        oDialogWrapper = doc.getElementsByClassName("J_dialog_wrapper")[0] as HTMLDivElement,
        oDialogTemplate = doc.getElementById('J_dialog') as HTMLTemplateElement;

    const dialogTplFragment = oDialogTemplate.content;
    const init = () => {
        oSubmitBtn!.addEventListener('click', onSubmit, false);
    }

    const onSubmit = (e: Event) => {
        e.preventDefault();
        // 1. 获取表单数据
        const formData = getDataFromForm(oForm);
        // 2. 数据校验
        const ok = validate(formData);
        if (!ok) {
            return;
        }
        // 3. 提交数据
        doSubmit(formData);
    }

    // TODO: 提交表单给服务器
    const doSubmit = (formData: IRepairItem) => {
        handleTemplate(dialogTplFragment, "提交成功!");
    }

    const onDialogClose = () => {
        oDialogWrapper.innerHTML = "";
    }
    // 绑定关闭Dialog事件
    const bindCloseEvent = (div: HTMLDivElement) => {
        const closeElements = div.getElementsByClassName("J_close_dialog");
        for (let i = 0; i < closeElements.length; i++) {
            closeElements[i].addEventListener('click', onDialogClose, false);
        }
    }
    // 获取表单数据
    const getDataFromForm = (oForm: HTMLFormElement): IRepairItem => {
        const oData = new FormData(oForm);
        const dormitory = oData.get('dormitory');
        const room = oData.get('room');
        const content = oData.get('content');
        const contact = oData.get('contact');
        return {dormitory, room, content, contact}
    }

    // 表单数据非空校验
    const validate = ({dormitory, room, content, contact}: IRepairItem) => {
        if (isBlank(dormitory) || isBlank(room) || isBlank(content) || isBlank(contact)) {
            handleTemplate(dialogTplFragment, "请填写完整信息!");
            bindCloseEvent(oDialogWrapper);  // 绑定关闭事件
            return false;
        }
        return true;
    }

    // 表单项数据是否为空
    const isBlank = (formData: FormDataEntryValue | null) => {
        return formData === null || formData === undefined || formData.toString().replace(/\s+/g, '').length === 0;
    }

    // 替换模板中的占位字符串并渲染
    const handleTemplate = (documentFragment: DocumentFragment, content: string) => {
        const newDocFragment = documentFragment.cloneNode(true) as DocumentFragment;
        newDocFragment.getElementById("J_dialog_content")!.innerHTML = content;
        oDialogWrapper.appendChild(newDocFragment);
    }

    init();
})(document);