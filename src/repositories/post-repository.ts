import { Post } from '@models';
import { PostCreationDto, PostDto } from 'types/dto';
import { Result, SuccessResult } from 'types/base';

export async function createPost(data: PostCreationDto): Promise<Result<PostDto>> {

    const post = await Post.create(data);

    return {
        success: true,
        data: {
            id: post.id,
            content: post.content,
            comments: [],
            user: {
                id: post.user.id.toString()
            }
        }
    };

}

export async function getPosts(): Promise<SuccessResult<PostDto[]>> {

    const posts = await Post.find().populate('user comments');

    return {
        success: true,
        data: posts.map((post: any) => ({
            id: post.id,
            content: post.content,
            comments: [],
            user: {
                id: post.user.id.toString(),
                email: post.user.email,
                name: post.user.name
            }
        }))
    };

}

