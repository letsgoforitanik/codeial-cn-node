import { Types } from "mongoose";
import { Friend, User } from "@models";
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


export async function getAllUsers(loggedInUserId: string | null): Promise<SuccessResult<UserDto[]>> {

    const userId = loggedInUserId ? new Types.ObjectId(loggedInUserId) : null;

    const users = await User.aggregate([
        {
            $match: { "_id": { "$ne": userId } }
        },
        {
            $addFields: {
                "isFriend": { "$in": [userId, "$friends"] }
            }
        }
    ]);

    return success(users.map(({ _id, name, email, isFriend }) => ({ id: _id.toString(), name, email, isFriend })));
}

export async function getUser(userId: string): Promise<Result<UserDto>> {
    const user = await User.findById(userId);
    if (!user) return error('User not found');
    const { id, name, email, avatar } = user;
    return success({ id, name, email, avatar });
}


export async function getUserFriends(userId: string): Promise<Result<UserDto[]>> {
    const user = await User.findById(userId).populate('friends');
    if (!user) return error('User not found');
    const userFriends: UserDto[] = user.friends as any;
    return success(userFriends);
}


export async function toggleFriendship(loggedInUserId: string, otherUserId: string): Promise<Result<null>> {

    const users = await User.find({
        $or: [
            { _id: new Types.ObjectId(loggedInUserId) },
            { _id: new Types.ObjectId(otherUserId) }
        ]
    });

    const loggedInUser = users[0];
    const otherUser = users[1];

    console.log({ loggedInUser, otherUser });

    if (!loggedInUser || !otherUser) return error('User not found');

    const friendShipExists = loggedInUser.friends.some(f => f.toString() === otherUserId);

    if (friendShipExists) {

        // remove friendship

        loggedInUser.friends = loggedInUser.friends.filter(f => f.toString() !== otherUserId);
        otherUser.friends = otherUser.friends.filter(f => f.toString() !== loggedInUserId);

        await Friend.deleteOne({
            $or: [
                { $and: [{ user: loggedInUser }, { friendUser: otherUser }] },
                { $and: [{ user: otherUser }, { friendUser: loggedInUser }] }
            ]
        });

        await loggedInUser.save();
        await otherUser.save();

        return success(null);
    }

    // add friendship

    loggedInUser.friends.push(otherUser._id);
    otherUser.friends.push(loggedInUser._id);

    await Friend.create({ user: loggedInUser, friendUser: otherUser });

    await loggedInUser.save();
    await otherUser.save();

    return success(null);

}