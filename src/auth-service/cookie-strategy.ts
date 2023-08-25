import { Request, Response } from "express";
import CryptoJS from "crypto-js";
import { Strategy, StrategyOptions } from "./strategy";
import { Result } from "types/base";


interface CookieStrategyOptions extends StrategyOptions {
    secret: string,
    cookieName: string;
    maxAge: number;
    httpOnly: boolean;
}

class SessionStrategy implements Strategy {

    public strategyName: string = 'cookie';
    public options: CookieStrategyOptions;

    constructor(options: CookieStrategyOptions) {
        this.options = options;
    }

    public verify(req: Request, res: Response) {
        const { usernameField, passwordField } = this.options;

        const username = req.body[usernameField];
        const password = req.body[passwordField];

        const result = this.options.verify(username, password);

        if (result.payload) {
            const { maxAge, httpOnly } = this.options;
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(result.payload), this.options.secret);
            res.cookie(this.options.cookieName, encrypted, { maxAge, httpOnly });
            return { data: null, info: null };
        }

        return { data: null, info: result.info };

    }

    public authenticate(req: Request): Result<any> {
        const parsed = JSON.parse(Reflect.get(req.cookies, this.options.cookieName));
        const userData = CryptoJS.AES.decrypt(parsed, this.options.secret);

        if (userData) {
            const { populateUser } = this.options;
            const user = populateUser(userData);
            return { success: true, data: user };
        }

        return { success: false, errors: [{ message: 'User not found' }] };
    }
}