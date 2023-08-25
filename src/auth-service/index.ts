import { Request, Response, NextFunction } from "express";
import { Strategy } from "./strategy";

type AuthCallback = (info: string, data: any) => void;

class AuthenticationService {

    strategies: Strategy[] = [];

    public use(strategy: Strategy) {
        this.strategies.push(strategy);
    }

    public verify(strategyName: string, req: Request, res: Response, callback?: AuthCallback) {
        const strategy = this.strategies.find(s => s.strategyName === strategyName);
        if (!strategy) throw Error(`No strategy found with name ${strategyName}`);
        const result = strategy.verify(req, res);
        callback && callback(result.info, result.data);
    }

    public authenticate(strategyName: string) {
        const strategy = this.strategies.find(s => s.strategyName === strategyName);
        if (!strategy) throw Error(`No strategy found with name ${strategyName}`);

        return function (req: Request, res: Response, next: NextFunction) {
            const result = strategy.authenticate(req);
            if (result.success) req.user = result.data;
            next();
        }

    }

}