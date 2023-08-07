type SuccessResult<T> = {
    success: true;
    data: T;
};

type ErrorResult = {
    success: false;
    errorMessage: string;
};

export type Result<T> = SuccessResult<T> | ErrorResult;
