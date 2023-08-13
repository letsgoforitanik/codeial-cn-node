import { Request, Response, NextFunction } from 'express';

export default function locals(req: Request, res: Response, next: NextFunction) {
    res.locals.user = req.isAuthenticated() ? req.user : null;
    next();
}