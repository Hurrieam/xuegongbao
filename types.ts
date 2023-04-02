import {NextFunction, Request, Response} from 'express';
import {Optional} from 'sequelize';

export enum Method {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch"
}

export type Handler = (req: Request, res: Response, next?: NextFunction) => any;
export type Middleware = (req: Request, res: Response, next: NextFunction) => any;

export interface QueryKey {
    [key: string]: string
}

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

export interface IUser extends IModel {
    fingerprint: string;
    stuId?: string;
    stuClass?: string;
    stuName?: string;
    active?: boolean;
}

export interface IManager extends IModel {
    username: string;
    password: string;
    superAdmin?: boolean
    status?: boolean;
}

export interface IPhoneBook extends IModel {
    type: string;
    name: string;
    phone: string;
    deleted?: boolean;
}

export interface ILostAndFound extends IModel {
    fingerprint: string;
    stuId?: string;
    title: string;
    tags?: string;
    location?: string;
    date?: string;
    description: string;
    images?: string;
    contactMethod: string;
    contactNumber: string;
    type: string;
    status?: boolean;
    deleted?: string;
}

export interface IReservation extends IModel {
    fingerprint: string;
    stuId?: string;
    type: string;
    content: string;
    date: string;
    contactMethod: string;
    contactNumber: string;
    status?: boolean;
    deleted?: boolean;
}

export interface IMessage extends IModel {
    fingerprint: string;
    stuId?: string;
    content: string;
    parentId?: string;
    anonymous: boolean;
    replied?: boolean;
    isReply?: boolean;
    deleted?: boolean;
}

export interface IDormRepair extends IModel {
    fingerprint: string;
    stuId?: string;
    itemName: string;
    description: string;
    dorm: string;
    room: string;
    contactNumber: string;
    status?: string;
    deleted?: string;
}

export interface ICanteenEval extends IModel {
    fingerprint: string;
    stuId?: string;
    canteen: string;
    ratings: string;
    idea?: string;
    lowScoreItems: string;
    highScoreItems: string;
    totalScore: number;
    deleted?: boolean;
}
