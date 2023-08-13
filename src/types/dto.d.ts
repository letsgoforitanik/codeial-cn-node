import { User, Post } from "@models";
import { ExcludeTimestamps, InferTSSchema, WithId, RemoveLibTypes, AddUnion } from "./base";

type UserSchema = InferTSSchema<typeof User>;
type UserCreationDto = ExcludeTimestamps<UserSchema>;
type UserDto = WithId<UserCreationDto>;

type PostSchema = AddUnion<InferTSSchema<typeof Post>, "user", UserDto>;
type PostCreationDto = RemoveLibTypes<ExcludeTimestamps<PostSchema>>;
type PostDto = WithId<PostSchema>;
