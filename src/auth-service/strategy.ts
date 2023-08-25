import { Request, Response } from "express";
import { Result } from "../../assets/ts/types";


type PayloadInfo = { payload: any, info: string };

export interface StrategyOptions {
    usernameField: string;
    passwordField: string;
    verify(username: string, password: string): PayloadInfo;
    populateUser(payload: any): any;
}

export interface Strategy {
    strategyName: string;
    verify(req: Request, res: Response): { data: any, info: any };
    authenticate(req: Request): Result<any>;
}