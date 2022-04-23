interface IFeedbackItem {
    name: FormDataEntryValue | null;
    contact: FormDataEntryValue | null;
    content: FormDataEntryValue | null;
}

((doc) => {
        const oForm = doc.getElementsByTagName('form')[0] as HTMLFormElement,
            oSubmit = oForm.getElementsByTagName('button')[0] as HTMLButtonElement,
            oDialogWrapper = doc.getElementsByClassName("J_dialog_wrapper")[0] as HTMLDivElement,
            oDialog = doc.getElementById('J_dialog') as HTMLTemplateElement;

        const dialogHTML = oDialog.innerHTML;
        const init = () => {
            oSubmit!.addEventListener('click', onSubmit, false);
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
        // 提交表单给服务器
        const doSubmit = (formData: IFeedbackItem) => {
            oDialogWrapper.innerHTML = handleTemplate(dialogHTML, "提交成功!");
            bindCloseEvent(oDialogWrapper);
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
        const getDataFromForm = (oForm: HTMLFormElement): IFeedbackItem => {
            const oData = new FormData(oForm);
            const name = oData.get('name');
            const contact = oData.get('contact');
            const content = oData.get('content');
            return {name, contact, content}
        }

        // 数据校验
        const validate = ({name, contact, content}: IFeedbackItem) => {
            // 1. 校验数据
            if (isBlank(name) || isBlank(contact) || isBlank(content)) {
                oDialogWrapper.innerHTML = handleTemplate(dialogHTML, "请将表单信息填写完整!");
                bindCloseEvent(oDialogWrapper);
                return false;
            }
            return true;
        }

        // 表单项数据是否为空
        const isBlank = (formData: FormDataEntryValue | null) => {
            return formData === null || formData === undefined || formData.toString().replace(/\s+/g, '').length === 0;
        }

        const handleTemplate = (template: string, content: string) => {
            return template.replace("{{description}}", content);
        }

        init();
    }
)
(document);