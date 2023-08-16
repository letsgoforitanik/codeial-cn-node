import { User } from "@models";
import { UserDto } from "types/dto";
import { SignUpInfo } from "types/validation";
import { Result } from "types/base";

export async function createUser(info: SignUpInfo): Promise<Result<UserDto>> {

    const userCount = await User.count({ email: info.email });

    if (userCount > 0) {
        return {
            success: false,
            errors: [{ message: 'User already exists' }]
        };
    }

    const user = await User.create(info);

    const { id, email, name, password } = user;

    return {
        success: true,
        data: { id, email, name, password }
    };

}

export async function findUserByEmail(emailId: string): Promise<Result<UserDto>> {

    const user = await User.findOne({ email: emailId });

    if (!user) {
        return {
            success: false,
            errors: [{ message: 'User not found' }]
        }
    }

    const { id, email, name, password } = user;

    return {
        success: true,
        data: { id, email, name, password }
    };

}

export async function findUserById(userId: string): Promise<Result<UserDto>> {

    const user = await User.findById(userId, 'name email');

    if (!user) {
        return {
            success: false,
            errors: [{ message: 'User not found' }]
        }
    }

    const { id, email, name, password } = user;

    return {
        success: true,
        data: { id, email, name, password }
    };

}
