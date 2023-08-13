import { Post } from '@models';
import { PostCreationDto, PostDto } from 'types/dto';
import { Result, SuccessResult } from 'types/base';

export async function createPost(data: PostCreationDto): Promise<Result<PostDto>> {
    const post = await Post.create(data);
    return { success: true, data: post as PostDto };
}

export async function getPosts(): Promise<SuccessResult<PostDto[]>> {
    const posts = await Post.find().populate('user');
    console.log("posts", posts);
    return { success: true, data: posts as PostDto[] };
}