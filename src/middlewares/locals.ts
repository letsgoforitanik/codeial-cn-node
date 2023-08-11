import { Request, Response, NextFunction } from 'express';

export default function locals(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) res.locals.user = req.user;
    next();
}