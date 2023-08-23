import express from 'express';

export default function extendExpress() {

    express.request.setFlashErrors = function (arg: any) {

        if (typeof arg === 'string') {
            arg = [{ message: arg }];
        }

        const errors: FlashError[] = arg;

        const messages = [];

        for (const error of errors) {
            const message = error.path + "|" + error.message
            messages.push(message);
        }

        this.flash('errors', messages);


    };


    express.request.setFlashMessage = function (message: string) {
        this.flash('message', message);
    }

    express.response.ok = function (value: object = {}) {
        this.status(200).json(value);
    }

    express.response.unauthorized = function (message: string = 'Unauthorized') {
        this.error(401, message);
    }

    express.response.created = function (url: string, value: object = {}) {
        this.status(201).location(url).json(value);
    }

    express.response.badRequest = function (message: string = 'Bad Request') {
        this.error(400, message);
    }

    express.response.notFound = function (message: string = 'Not Found') {
        this.error(404, message);
    }

    express.response.success = function (arg: any) {
        if (typeof arg === 'string') return this.ok({ success: true, message: arg });
        return this.ok({ success: true, data: arg });
    }

    express.response.error = function (errorCode: number, message: string) {
        return this.status(errorCode).json({ success: false, message });
    }
}