import { User, Post, Comment } from "@models";
import { ExcludeTimestamps, InferTSSchema, PartialByAllExceptId } from "./base";
import { WithId, ChangePropertyType } from './base';

// user ====
type UserOriginalSchema = InferTSSchema<typeof User>;
type UserCreationDto = ExcludeTimestamps<UserOriginalSchema>;
type UserDto = PartialByAllExceptId<WithId<UserCreationDto>>;



// post ====
type PostOriginalSchema = InferTSSchema<typeof Post>;
type PostSchemaC1 = ChangePropertyType<PostOriginalSchema, "user", UserDto>;
type PostSchema = ChangePropertyType<PostSchemaC1, "comments", CommentDto[]>;
type PostCreationDto = ExcludeTimestamps<PostSchema>;
type PostDto = PartialByAllExceptId<WithId<PostCreationDto>>;



// comment ====
type CommentOriginalSchema = InferTSSchema<typeof Comment>;
type CommentSchemaC1 = ChangePropertyType<CommentOriginalSchema, "user", UserDto>;
type CommentSchema = ChangePropertyType<CommentSchemaC1, "post", PostDto>;
type CommentCreationDto = ExcludeTimestamps<CommentSchema>;
type CommentDto = PartialByAllExceptId<WithId<CommentCreationDto>>;
