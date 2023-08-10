type SuccessResult<T> = {
    success: true;
    data: T;
};

type ErrorResult = {
    success: false;
    errors: { path?: string, message: string }[];
};

export type Result<T> = SuccessResult<T> | ErrorResult;
