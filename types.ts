import {NextFunction, Request, Response} from 'express';
import {Optional} from 'sequelize';

type Method = "get" | "post" | "put" | "delete" | "patch";

export type Handler = (req: Request, res: Response, next?: NextFunction) => any;
export type Middleware = (req: Request, res: Response, next: NextFunction) => any;

export type Route = {
    method: Method;
    path: string;
    middleware: Middleware[];
    handler: Handler;
};

export interface IR {
    code: number;
    data?: any;
    message?: string;
    description?: string;
}

// 以下都是sequelize的模型接口
export interface IModel extends Optional<any, string> {
    [key: string]: any;
}

export interface IAdmin extends IModel {
    username: string;
    password: string;
    status: boolean;
}

export interface IPhoneBook extends IModel {
    deptName: string;
    phone: string;
}

export interface ILostAndFound extends IModel {
    itemName: string;
    location?: string;
    time?: string;
    description: string;
    images?: string;
    stuName?: string;
    contact: string;
    type: string;
}

export interface IComment extends IModel {
    content: string;
    parentId?: number;
}

export interface IRepairItem extends IModel {
    itemName: string;
    description: string;
    dorm: string;
    room: string;
    stuName: string;
    contact: string;
}

export interface IReservation extends IModel {
    type: string;
    stuName: string;
    sdept: string;
    content: string;
    time: string;
    contact: string;
}

export interface IEvaluation extends IModel {
    canteenName: string;
    content: string;
    mainProblem: string;
    totalScore: number;
}

export interface IUser extends IModel {
    nickname: string;
    stuName: string;
    stuClass: string;
    stuId: string;
    avatar: string;
}