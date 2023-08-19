import { postData } from 'lib';
import { Post } from 'types';

export async function createPost(data: any) {
    return await postData<Post>('/posts/create', data);
}