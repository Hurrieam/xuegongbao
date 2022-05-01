declare interface IComment {
    id?: number;
    openid?: string;
    content: string;
    parentId?: string;
    createdAt?: string;
    hasReply?: boolean;
}

declare interface ICommentDetail {
    id: number;
    content: string;
    createdAt: string;
    hasReply: boolean;
}

declare interface IDormRepair {
    openid: string;
    itemName: string;
    description: string;
    dorm: string;
    room: string;
    stuName: string;
    contact: string;
}

declare interface IPhoneItem {
    id: number;
    deptName: string;
    phone: string;
}

declare interface ILostAndFound {
    id?: number;
    openid?: string;
    itemName: string;
    location?: string;
    lostTime?: string;
    description: string;
    images?: string;
    stuName?: string;
    contact: string;
    createdAt?: string;
}

declare interface IConsultation{
    openid: string;
    type: string;
    stuName: string;
    sdept: string;
    content: string;
    time: string;
    contact: string;
}