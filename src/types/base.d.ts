import { HydratedDocument, Model, Types } from "mongoose";

// types =================================================================


// opposite of partial, make all property required

type Concrete<Type> = { [Property in keyof Type]-?: Type[Property]; };

type WithId<TSchema> = TSchema & { id: string };

type PartialBy<TSchema, Key extends keyof TSchema> = Partial<Pick<TSchema, Key>> & Omit<TSchema, Key>;

// infer typescript schema from mongoose model

type InferSchema<TMongooseModel> = TMongooseModel extends Model<infer X> ? X : never;

type SchemaFromDoc<TDocument> = TDocument extends HydratedDocument<infer X> ? X : never;

// create dto for creating model object by removing id, createdAt, updatedAt from main dto

type CreateDto<TSchema, K extends (keyof TSchema | "") = ""> = Concrete<Omit<TSchema, K | "id" | "createdAt" | "updatedAt">>;

type ExcludeTimestamps<TSchema> = Omit<TSchema, "createdAt" | "updatedAt">;

type Error = { path?: string, message: string };

type SuccessResult<T> = { success: true; data: T; }

type ErrorResult = { success: false; errors: Error[]; }

type Result<T> = SuccessResult<T> | ErrorResult;

// helpful to remove bugging objectid

type ConvertSchema<TSchema, Keys extends keyof TSchema> = {
    [Property in Keys]: TSchema[Property] extends (Types.ObjectId | Types.ObjectId[]) | infer X ? X : TSchema[Property]
} & Omit<TSchema, Keys>

type RemoveId<TDocument extends HydratedDocument<any, any, any>, Keys extends keyof SchemaFromDoc<TDocument>>
    = HydratedDocument<ConvertSchema<SchemaFromDoc<TDocument>, Keys>>


// nullable type like c#

type Nullable<T> = T | null;


// interfaces ==============================================================


interface Id {
    id: string;
}

interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

interface MongooseTimestamps {
    createdAt: NativeDate;
    updatedAt: NativeDate;
}
