import { User } from "@models";
import { success, error } from "@helpers";
import { UserCreationDto, UserDocument, UserDto, UserUpdateDto } from "types/dto";
import { Result, SuccessResult } from "types/base";

export async function createUser(info: UserCreationDto): Promise<Result<UserDto>> {

    const userCount = await User.count({ email: info.email });

    if (userCount > 0) return error('User already exists');

    const user: UserDocument = await User.create(info);

    const { id, email, name, avatar } = user;

    return success({ id, email, name, avatar });

}

export async function updateUser(user: UserDto, info: UserUpdateDto): Promise<Result<UserDto>> {

    const userDoc = await User.findById(user.id);

    if (!userDoc) return error('User not found');

    const updatedUser = await User.findByIdAndUpdate(userDoc.id, { ...info });

    const { id, name, email, avatar } = updatedUser!;

    return success({ id, name, email, avatar });

}

export async function findUserByEmail(emailId: string): Promise<Result<UserDto>> {

    const user = await User.findOne({ email: emailId });

    if (!user) return error('User not found');

    const { id, email, name, password, avatar } = user;

    return success({ id, email, name, password, avatar });

}

export async function findUserById(userId: string): Promise<Result<UserDto>> {

    const user = await User.findById(userId, 'name email avatar');

    if (!user) return error('User not found');

    const { id, email, name, password, avatar } = user;

    return success({ id, email, name, password, avatar });

}


export async function getAllUsers(): Promise<SuccessResult<UserDto[]>> {
    const users: UserDocument[] = await User.find();
    return success(users.map(({ id, name, email }) => ({ id, name, email })));
}

export async function getUser(userId: string): Promise<Result<UserDto>> {

    const user = await User.findById(userId);

    if (!user) return error('User not found');

    const { id, name, email, avatar } = user;

    return success({ id, name, email, avatar });

} 