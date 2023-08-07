import { User } from "@models";
import { UserDto } from "types/dto";
import { SignUpInfo } from "types/validation";
import { Result } from "types";

export async function createUser(info: SignUpInfo): Promise<Result<UserDto>> {

    const userCount = await User.count({ email: info.email });

    if (userCount > 0) {
        return {
            success: false,
            errorMessage: 'User already exists'
        };
    }

    const result = await User.create(info);
    return { success: true, data: result as UserDto };


}
