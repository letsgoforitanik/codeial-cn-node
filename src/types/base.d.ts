import { Model } from "mongoose";

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

type Result<T> = SuccessResult<T> | ErrorResult;
