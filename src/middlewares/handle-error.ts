import { Request, Response } from 'express';

export default function handleError(error: unknown, request: Request, response: Response) {
    console.log(error);
    return response.redirect('/internal-server-error');
}