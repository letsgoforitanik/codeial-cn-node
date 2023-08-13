import { User, Post } from "@models";
import { ExcludeTimestamps, InferTSSchema, WithId, RemoveLibTypes } from "./base";

type UserSchema = InferTSSchema<typeof User>;
type UserCreationDto = ExcludeTimestamps<UserSchema>;
type UserDto = WithId<UserCreationDto>;


type PostSchema = InferTSSchema<typeof Post>;
type PostCreationDto = RemoveLibTypes<ExcludeTimestamps<PostSchema>>;
type PostDto = WithId<PostCreationDto>;