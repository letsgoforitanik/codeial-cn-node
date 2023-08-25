import { Request, Response } from "express";
import { Result } from "../../assets/ts/types";


type PayloadInfo = { payload: any, info: string | null };

export interface StrategyOptions {
    usernameField: string;
    passwordField: string;
    verify(username: string, password: string): Promise<PayloadInfo>;
    populateUser(payload: any): Promise<any>;
}

export interface Strategy {
    strategyName: string;
    verify(req: Request, res: Response): Promise<{ data: any, info: any }>;
    authenticate(req: Request): Promise<Result<any>>;
}