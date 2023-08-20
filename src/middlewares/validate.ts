import { Request, Response, NextFunction } from 'express';
import { validate as validateRequest } from '@helpers';

export default function validate(req: Request, res: Response, next: NextFunction) {
    const result = validateRequest(req);

    if (!result.success) {
        if (req.xhr) return res.status(400).json(result);
        req.flash('last-request-body', JSON.stringify(req.body));
        req.setFlashErrors(result.errors);
        return res.redirect('back');
    }

    req.validationResult = result.data;
    next();
}