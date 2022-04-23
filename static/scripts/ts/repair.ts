interface IRepairItem {
    dormitory: FormDataEntryValue | null;
    room: FormDataEntryValue | null;
    content: FormDataEntryValue | null;
    contact: FormDataEntryValue | null;
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
        const doSubmit = (formData: IRepairItem) => {
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
        const getDataFromForm = (oForm: HTMLFormElement): IRepairItem => {
            const oData = new FormData(oForm);
            const dormitory = oData.get('dormitory');
            const room = oData.get('room');
            const content = oData.get('content');
            const contact = oData.get('contact');
            return {dormitory, room, content, contact}
        }

        // 数据校验
        const validate = ({dormitory, room, content, contact}: IRepairItem) => {
            // 1. 校验数据
            if (isBlank(dormitory) || isBlank(room) || isBlank(content) || isBlank(contact)) {
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