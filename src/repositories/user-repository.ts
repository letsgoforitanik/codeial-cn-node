import { User } from "@models";
import { UserDto } from "types/dto";
import { SignUpInfo } from "types/validation";
import { Result } from "types";

export async function createUser(info: SignUpInfo): Promise<Result<UserDto>> {

    const userCount = await User.count({ email: info.email });

    /* if (userCount > 0) {
         return {
             success: false,
             errorMessage: 'User already exists'
         };
     }*/

    const result = await User.create(info);
    return { success: true, data: result as UserDto };


}


export async function findUserByEmail(email: string): Promise<Result<UserDto>> {

    const user = await User.findOne({ email });

    if (user === null) {
        return {
            success: false,
            errorMessage: 'User not found'
        }
    }

    return { success: true, data: user as UserDto };

}

export async function findUserById(id: string): Promise<Result<UserDto>> {

    const user = await User.findById(id);

    if (user === null) {
        return {
            success: false,
            errorMessage: 'User not found'
        }
    }

    return { success: true, data: user as UserDto };

}
