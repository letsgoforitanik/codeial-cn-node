// express extension

type FlashError = { path?: string, message?: string }

declare namespace Express {
    export interface Request {
        setFlashErrors(errors: FlashError[]): void;
        setFlashErrors(message: string): void;
        setFlashMessage(message: string): void;
    }
}