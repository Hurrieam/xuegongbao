declare namespace API {
    type Comment = {
        id?: number;
        openid?: string;
        parentId?: string;
        content: string;
        createdAt?: string;
        hasReply?: boolean;
    }

    type LostAndFound = {
        id?: number;
        openid: string;
        itemName: string;
        location?: string;
        lostTime?: string;
        description?: string;
        images?: string;
        stuName?: string;
        contact: string;
        status?: boolean;
        createdAt?: string;
    }

    type PhoneBook = {
        id?: number;
        deptName: string;
        phone: string;
    }

    type RepairItem = {
        id?: number;
        openid: string;
        itemName: string;
        description?: string;
        dorm: string;
        room: string;
        stuName?: string;
        contact: string;
        time?: string;
        createdAt?: string;
        status?: boolean;
    }

    type Reservation = {
        id?: number;
        openid?: string;
        type: string;
        stuName: string;
        sdept: string;
        content: string;
        time: string;
        contact: string;
        status?: boolean;
    }
}