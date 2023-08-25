import { Request, Response } from "express";
import { Strategy, StrategyOptions } from "./strategy";
import { Result } from "types/base";

interface SessionStrategyOptions extends StrategyOptions { }

class SessionStrategy implements Strategy {

    public strategyName: string = 'local';
    public options: SessionStrategyOptions;

    constructor(options: SessionStrategyOptions) {
        this.options = options;
    }

    public verify(req: Request, res: Response) {
        const { usernameField, passwordField } = this.options;

        const username = req.body[usernameField];
        const password = req.body[passwordField];

        const result = this.options.verify(username, password);

        if (result.payload) {
            Reflect.set(req.session, 'user-data', JSON.parse(result.payload));
            return { data: null, info: null };
        }

        return { data: null, info: result.info };

    }

    public authenticate(req: Request): Result<any> {
        const userData = JSON.parse(Reflect.get(req.session, 'user-data'));

        if (userData) {
            const { populateUser } = this.options;
            const user = populateUser(userData);
            return { success: true, data: user };
        }

        return { success: false, errors: [{ message: 'User not found' }] };
    }
}