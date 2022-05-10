declare namespace API {
    type Comment = {
        id?: number;
        parentId?: string;
        content: string;
        createdAt?: string;
        hasReply?: boolean;
    }

    type LostAndFound = {
        id?: number;
        itemName: string;
        location?: string;
        time?: string;
        description: string;
        images?: string;
        stuName?: string;
        contact: string;
        status?: boolean;
        type: string;
        createdAt?: string;
    }

    type PhoneBook = {
        id?: number;
        deptName: string;
        phone: string;
    }

    type RepairItem = {
        id?: number;
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
        type: string;
        stuName: string;
        sdept: string;
        content: string;
        time: string;
        contact: string;
        status?: boolean;
    }
}