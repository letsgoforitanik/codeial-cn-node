import { HydratedDocument, Types } from "mongoose";
import { User } from "@models";
import { InferSchema, CreateDto } from "./base";
import { Timestamps, MongooseTimestamps, Id, ExcludeTimestamps } from "./base";

// user 

type UserSchema = InferSchema<typeof User>;

type UserDocument = HydratedDocument<UserSchema>;

interface UserDto extends Id, Partial<ExcludeTimestamps<UserSchema>> { }

type UserCreationDto = CreateDto<UserDto>;

type UserUpdateDto = Partial<UserCreationDto>


// post 

interface PostSchema extends MongooseTimestamps {
    content: string;
    user: Types.ObjectId | UserDocument;
    comments: Types.ObjectId[] | CommentDocument[];
}

type PostDocument = HydratedDocument<PostSchema>;

interface PostDto extends Id, Partial<Timestamps> {
    content?: string;
    user?: UserDto;
    comments?: CommentDto[];
}

type PostCreationDto = CreateDto<PostDto>;


// comment
interface CommentSchema extends MongooseTimestamps {
    content: string;
    user: Types.ObjectId | UserDocument;
    post: Types.ObjectId | PostDocument;
}

type CommentDocument = HydratedDocument<CommentSchema>;

interface CommentDto extends Id, Partial<Timestamps> {
    content?: string;
    user?: UserDto;
    post?: PostDto;
}


type CommentCreationDto = CreateDto<CommentDto>;










