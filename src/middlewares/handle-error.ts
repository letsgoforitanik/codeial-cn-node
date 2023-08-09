import { Request, Response, NextFunction } from 'express';

export default function handleError(error: Error, request: Request, response: Response, next: NextFunction) {
    console.log('Error : ', error);
    return response.redirect('/internal-server-error');
}