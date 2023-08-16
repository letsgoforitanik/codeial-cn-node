import { Post } from '@models';
import { PostCreationDto, PostDto } from 'types/dto';
import { Result, SuccessResult } from 'types/base';

export async function createPost(data: PostCreationDto): Promise<Result<PostDto>> {

    const post = await Post.create(data);

    return {
        success: true,
        data: {
            id: post.id,
            comments: post.comments.map(c => ({ id: c._id.toString() })),
            user: { id: post.user._id.toString() },
            content: post.content
        }
    };

}

export async function getPosts(): Promise<SuccessResult<PostDto[]>> {

    const populateOptions = [
        { path: 'user' },
        { path: 'comments', populate: [{ path: 'user' }] }
    ];

    const posts: PostDto[] = await Post.find().populate(populateOptions);

    return {
        success: true,
        data: posts
    };

}

