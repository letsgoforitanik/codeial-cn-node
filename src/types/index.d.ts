// express extension

type FlashError = { path?: string, message?: string }

declare namespace Express {
    export interface Request {
        validationResult: any;
        setFlashErrors(errors: FlashError[]): void;
        setFlashErrors(message: string): void;
        setFlashMessage(message: string): void;
    }
}