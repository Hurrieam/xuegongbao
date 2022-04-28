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
    itemName: string;
    description: string;
    dorm: string;
    room: string;
    name: string;
    contact: string;
}

declare interface IPhoneItem {
    id: number;
    deptName: string;
    phone: string;
}