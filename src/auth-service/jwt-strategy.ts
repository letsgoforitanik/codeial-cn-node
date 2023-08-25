import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Strategy, StrategyOptions } from "./strategy";
import { Result } from "types/base";


interface JwtStrategyOptions extends StrategyOptions {
    secret: string;
    expiresIn: number | string;
}

class JwtStrategy implements Strategy {

    public strategyName: string = 'jwt';
    public options: JwtStrategyOptions;

    constructor(options: JwtStrategyOptions) {
        this.options = options;
    }

    public verify(req: Request) {
        const { usernameField, passwordField } = this.options;

        const username = req.body[usernameField];
        const password = req.body[passwordField];

        const result = this.options.verify(username, password);

        if (result.payload) {
            const { secret, expiresIn } = this.options;
            const token = jwt.sign(result.payload, secret, { expiresIn });
            return { data: token, info: null };
        }

        return { data: null, info: result.info };

    }

    public authenticate(req: Request): Result<any> {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            try {
                const { secret, populateUser } = this.options;
                const decoded = jwt.verify(token, secret);
                return { success: true, data: populateUser(decoded) };
            }
            catch (error) {
                return { success: false, errors: [error as Error] }
            }

        }

        return { success: false, errors: [{ message: 'Token not found' }] };
    }

}