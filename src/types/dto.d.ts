import { User } from "@models";
import { ExcludeTimestamps, InferTSSchema, WithId } from "./base";

type UserSchema = InferTSSchema<typeof User>;
type UserCreationDto = ExcludeTimestamps<UserSchema>;
type UserDto = WithId<UserCreationDto>;
