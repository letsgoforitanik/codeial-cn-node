import { Request, Response, NextFunction } from 'express';
import { authConfig } from '@config';


export function authorizedOnly(req: Request, res: Response, next: NextFunction) {

    if (!req.isAuthenticated()) {
        return res.redirect(authConfig.authorizedOnly.failureRedirect);
    }

    next();

}

export function anonymousOnly(req: Request, res: Response, next: NextFunction) {

    if (req.isAuthenticated()) {
        return res.redirect(authConfig.anonymousOnly.failureRedirect);
    }

    next();

}

