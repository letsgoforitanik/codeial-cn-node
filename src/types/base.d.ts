import { Model } from "mongoose";

type RemoveLibTypes<Type> = {
    [Property in keyof Type]: Type[Property] extends string | number | boolean | bigint ? Type[Property] : any
};

type InferTSSchema<TModel> = TModel extends Model<infer X> ? X : never;
type ExcludeTimestamps<T> = Omit<T, "createdAt" | "updatedAt">;
type WithId<T> = T & { id: string };

type SuccessResult<T> = {
    success: true;
    data: T;
};

type ErrorResult = {
    success: false;
    errors: { path?: string, message: string }[];
};


type AddType<T, TNew> = { [Property in keyof T]: T[Property] | TNew };

type AddUnion<TSource, TProperty extends keyof TSource, TNew> = AddType<Pick<TSource, TProperty>, TNew> & Omit<TSource, TProperty>

type Result<T> = SuccessResult<T> | ErrorResult;
