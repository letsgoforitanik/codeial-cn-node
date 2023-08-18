import { SuccessResult, ErrorResult, Error } from "types/base"

export function success<T>(data: T): SuccessResult<T> {
    return {
        success: true,
        data
    }
}

export function error(error: Error): ErrorResult;
export function error(errors: Error[]): ErrorResult;
export function error(message: string): ErrorResult;

export function error(arg: any): ErrorResult {

    if (typeof arg === 'string') {
        return {
            success: false,
            errors: [{ message: arg }]
        }
    }

    if (Array.isArray(arg)) {
        return {
            success: false,
            errors: arg
        }
    }

    return {
        success: false,
        errors: [arg]
    }

}