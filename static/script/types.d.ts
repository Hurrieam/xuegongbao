declare interface Window {
    Vue: any;
    vant: any;
}

declare namespace Model {
    type IUser = {
        stuId: string;
        stuName: string;
        stuClass: string;
    }
}