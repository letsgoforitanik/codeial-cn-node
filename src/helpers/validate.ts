import { Request } from "express";
import { ZodType } from "zod";
import { ValidationResult } from "types/validation";
import * as validators from "@validators";

const validatorsMap = new Map<string, ZodType>([["/sign-up", validators.signupValidator]]);

export default function validate<T>(request: Request) {
    const validator = validatorsMap.get(request.url)!;
    const result = validator.safeParse(request.body);

    if (result.success) return result as ValidationResult<T>;

    const firstError = result.error.errors[0];

    const errorResult: ValidationResult<T> = {
        success: false,
        errorMessage: firstError.message,
    };

    return errorResult;
}
