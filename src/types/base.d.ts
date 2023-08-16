import { Model } from "mongoose";


type ChangePropertyType<Type, Attribute extends string, TNew> = {
    [Property in keyof Type]: Property extends Attribute ? TNew : Type[Property];
};

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type PartialByAllExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

type PartialByAllExceptId<T extends { id: string }> = PartialByAllExcept<T, "id">;

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
