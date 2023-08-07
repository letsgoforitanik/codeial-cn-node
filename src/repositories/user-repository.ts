import { User } from "@models";
import { UserDto } from "types/dto";
import { SignUpInfo } from "types/validation";

export async function createUser(info: SignUpInfo) {
    const result = await User.create(info);
    return result as UserDto;
}
