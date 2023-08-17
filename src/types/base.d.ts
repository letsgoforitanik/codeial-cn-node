import { Model } from "mongoose";

type CreateDto<TSchema, K extends (keyof TSchema | "") = ""> = Concrete<Omit<TSchema, K | "id" | "createdAt" | "updatedAt">>;
type ExcludeTimestamps<TSchema> = Omit<TSchema, "createdAt" | "updatedAt">;

type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
};

type ChangePropertyType<Type, Attribute extends string, TNew> = {
    [Property in keyof Type]: Property extends Attribute ? TNew : Type[Property];
};

type WithId<TSchema> = TSchema & { id: string };

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type PartialByAllExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

type PartialByAllExceptId<T extends { id: string }> = PartialByAllExcept<T, "id">;

type InferTSSchema<TModel> = TModel extends Model<infer X> ? X : never;


type SuccessResult<T> = {
    success: true;
    data: T;
};

type ErrorResult = {
    success: false;
    errors: { path?: string, message: string }[];
};


type Result<T> = SuccessResult<T> | ErrorResult;

type InferMongooseSchema<TModel> = TModel extends Model<infer X> ? X : never;

type AddType<TSchema, TProp extends keyof TSchema, TNew> = {
    [Property in keyof TSchema]: Property extends TProp ? TSchema[Property] | TNew : TSchema[Property];
}

type Convert<TSchema> = {
    [Property in keyof TSchema]: TSchema[Property] extends NativeDate ? Date : TSchema[Property]
}

interface MongooseTimestamps {
    createdAt: NativeDate;
    updatedAt: NativeDate;
}

interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

interface Id {
    id: string;
}