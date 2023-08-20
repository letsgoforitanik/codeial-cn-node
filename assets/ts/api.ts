import { post, get } from 'lib';
import { Post, Comment } from 'types';

export async function createPost(data: any) {
    return await post<Post>('/posts/create', data);
}

export async function deletePost(url: string) {
    return await get<null>(url);
}

export async function addCommentToPost(data: any) {
    return await post<Comment>('/comments/create', data);
}

export async function deleteCommentFromPost(url: string) {
    return await get<null>(url);
}