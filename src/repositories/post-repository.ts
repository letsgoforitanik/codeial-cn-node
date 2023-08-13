import { Post } from '@models';
import { PostCreationDto, PostDto } from 'types/dto';
import { Result } from 'types/base';

export async function createPost(data: PostCreationDto): Promise<Result<PostDto>> {
    const post = await Post.create(data);
    return { success: true, data: post as PostDto };
}