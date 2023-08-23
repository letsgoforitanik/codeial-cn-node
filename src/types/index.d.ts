// express extension

type FlashError = { path?: string, message?: string }

declare namespace Express {
    export interface Request {
        validationResult: any;
        setFlashErrors(errors: FlashError[]): void;
        setFlashErrors(message: string): void;
        setFlashMessage(message: string): void;
    }

    export interface Response {
        ok(value?: object): void;
        unauthorized(message?: string): void;
        created(url: string, value?: object): void;
        badRequest(message?: string): void;
        notFound(message?: string): void;
        success(data: object): void;
        success(message: string): void;
        error(errorCode: number, message: string): void;
    }
}
