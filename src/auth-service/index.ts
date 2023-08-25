import { Request, Response, NextFunction } from "express";
import { Strategy } from "./strategy";

type AuthCallback = (info: string, data: any) => void;

export class AuthenticationService {

    strategies: Strategy[] = [];

    public use(strategy: Strategy) {
        this.strategies.push(strategy);
    }

    public verify(strategyName: string, req: Request, res: Response, callback?: AuthCallback) {
        const strategy = this.strategies.find(s => s.strategyName === strategyName);
        if (!strategy) throw Error(`No strategy found with name ${strategyName}`);
        const promise = strategy.verify(req, res);
        promise.then(result => callback && callback(result.info, result.data));
    }

    public authenticate(strategyName: string) {
        const strategy = this.strategies.find(s => s.strategyName === strategyName);
        if (!strategy) throw Error(`No strategy found with name ${strategyName}`);

        return function (req: Request, res: Response, next: NextFunction) {

            const promise = strategy.authenticate(req);

            promise.then(function (result) {
                if (result.success) req.user = result.data;
                next();
            });
        }

    }

}