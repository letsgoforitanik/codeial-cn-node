import fs from 'fs/promises';
import { getPath } from './getabspath';

export default async function deleteUserAvatar(name: string) {
    const filePath = getPath(`uploads/user-avatars/${name}`);
    return await fs.unlink(filePath);
}