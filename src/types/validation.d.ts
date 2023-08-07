import { z } from "zod";
import * as validators from "@validators";

type SuccessResult<T> = {
    success: true;
    data: T;
};

type ErrorResult = {
    success: false;
    errorMessage: string;
};

type ValidationResult<T> = SuccessResult<T> | ErrorResult;

type SignUpInfo = z.infer<typeof validators.signupValidator>;
