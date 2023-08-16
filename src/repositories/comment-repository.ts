import { Types } from 'mongoose';
import { Comment, Post } from '@models';
import { Result } from 'types/base';
import { CommentCreationDto, CommentDto } from 'types/dto';

export async function addComment(data: CommentCreationDto): Promise<Result<CommentDto>> {

    const post = await Post.findById(data.post.id);

    if (!post) {
        return {
            success: false,
            errors: [{ message: 'Post not found' }]
        };
    }

    const { user, content } = data;

    const comment = await Comment.create({ content, user: new Types.ObjectId(user.id), post });

    post.comments.push(comment._id);

    await post.save();

    return {
        success: true,
        data: {
            id: comment.id,
            ...data
        }
    }

}

