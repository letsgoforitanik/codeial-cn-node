import { Request } from "express";
import { ZodType } from "zod";
import { Result } from "types/base";
import * as validators from "@validators";
import { SignInInfo } from "types/validation";

const validatorsMap = new Map<string, ZodType>([
    ["/users/sign-up", validators.signupValidator],
    ['/users/sign-in', validators.signinValidator],
    ['/posts/create', validators.postCreateValidator],
    ['/comments/create', validators.commentCreateValidator],
    ['/users/update', validators.profileUpdateValidator]
]);


function validateData<T>(validator: ZodType, data: object) {
    const result = validator.safeParse(data);
    if (result.success) return result as Result<T>;
    const errors = result.error.errors.map(({ path, message }) => ({ path: path[0]?.toString(), message }));
    return { success: false, errors } as Result<T>;
}



export function validate<T>(request: Request) {
    const validator = validatorsMap.get(request.originalUrl)!;
    return validateData<T>(validator, request.body);
}


export function validateSignIn(email: string, password: string) {
    const validator = validators.signinValidator;
    return validateData<SignInInfo>(validator, { email, password });
}