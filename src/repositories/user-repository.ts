import { User } from "@models";
import { UserCreationDto, UserDocument, UserDto } from "types/dto";
import { Result } from "types/base";

export async function createUser(info: UserCreationDto): Promise<Result<UserDto>> {

    const userCount = await User.count({ email: info.email });

    if (userCount > 0) {
        return {
            success: false,
            errors: [{ message: 'User already exists' }]
        };
    }

    const user: UserDocument = await User.create(info);

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
