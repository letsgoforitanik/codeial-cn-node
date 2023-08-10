import { Request, Response, NextFunction } from 'express';

export default function authorize(redirectUrl: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.isAuthenticated()) return res.redirect(redirectUrl);
        return next();
    }
}