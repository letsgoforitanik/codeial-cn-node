import { Request, Response, NextFunction } from 'express';
import { authConfig } from '@config';
import { error } from '@helpers';


export function authorizedOnly(req: Request, res: Response, next: NextFunction) {

    if (!req.isAuthenticated()) {
        if (req.xhr) return res.status(401).json(error('Unauthorized action attempted'));
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

