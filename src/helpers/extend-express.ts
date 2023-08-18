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
}