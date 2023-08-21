import fs from 'fs/promises';
import { getPath } from './getabspath';

export default async function deleteUserAvatar(name: string) {
    const avatarPath = process.env.AVATAR_PATH!;
    const filePath = getPath(`${avatarPath}/${name}`);
    return await fs.unlink(filePath);
}