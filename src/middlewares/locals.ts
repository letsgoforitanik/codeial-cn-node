import { Request, Response, NextFunction } from 'express';
import { parseFlashErrors } from '@helpers';

export default function locals(req: Request, res: Response, next: NextFunction) {

    res.locals.user = req.isAuthenticated() ? req.user : null;

    const flashMessages = req.flash('message');
    res.locals.message = flashMessages.length > 0 ? flashMessages[0] : null;

    const flashStringErrors = req.flash('errors');
    res.locals.errors = parseFlashErrors(flashStringErrors);

    next();

}