import { Types } from 'mongoose';
import { Post, Comment } from '@models';
import { PostCreationDto, PostDto, CommentCreationDto, CommentDto } from 'types/dto';
import { PostDocument, CommentDocument, UserDocument } from 'types/dto';
import { Result, SuccessResult } from 'types/base';

export async function createPost(data: PostCreationDto): Promise<Result<PostDto>> {

    const post: PostDocument = await Post.create({ ...data, user: new Types.ObjectId(data.user.id) });

    return {
        success: true,
        data: {
            id: post.id,
            comments: [],
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

export async function addCommentToPost(data: CommentCreationDto): Promise<Result<CommentDto>> {

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

export async function deletePost(postId: string, loggedInUserId: string): Promise<Result<null>> {

    const post = await Post.findById(postId);

    if (!post) {
        return {
            success: false,
            errors: [{ message: 'Post not found' }]
        };
    }

    if (post.user.id.toString() !== loggedInUserId) {
        return {
            success: false,
            errors: [{ message: 'Not authorized to delete the post' }]
        };
    }

    await Comment.deleteMany({ _id: { $in: post.comments } });

    await post.deleteOne();

    return {
        success: true,
        data: null
    };

}

export async function deleteCommentFromPost(commentId: string, loggedInUserId: string): Promise<Result<null>> {

    const comment: CommentDocument | null = await Comment.findById(commentId).populate('post user');

    if (!comment) {
        return {
            success: false,
            errors: [{ message: 'Comment not found' }]
        };
    }

    const commentUser = comment.user as UserDocument;

    if (commentUser.id !== loggedInUserId) {
        return {
            success: false,
            errors: [{ message: 'Not authorized to delete the post' }]
        };
    }

    const post = comment.post as PostDocument;
    const postComments = post.comments as Types.ObjectId[];

    post.comments = postComments.filter(id => id.toString() !== commentId);

    await post.save();

    await comment.deleteOne();

    return { success: true, data: null };


}