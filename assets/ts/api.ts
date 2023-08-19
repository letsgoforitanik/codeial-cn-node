import { postData, getData } from 'lib';
import { Post } from 'types';

export async function createPost(data: any) {
    return await postData<Post>('/posts/create', data);
}

export async function deletePost(url: string) {
    return await getData<null>(url);
}