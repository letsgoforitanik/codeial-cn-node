import { Types } from 'mongoose';
import { Post, Comment } from '@models';
import { error, success } from '@helpers';
import { PostCreationDto, PostDto, CommentCreationDto, CommentDto, UserDto } from 'types/dto';
import { PostDocument, CommentDocument } from 'types/dto';
import { Nullable, RemoveId, Result, SuccessResult } from 'types/base';

export async function createPost(data: PostCreationDto): Promise<Result<PostDto>> {

    const post: PostDocument = await Post.create({ ...data, user: new Types.ObjectId(data.user.id) });

    const postDto = {
        id: post.id,
        comments: [],
        user: { id: post.user._id.toString(), name: data.user.name },
        content: post.content
    };

    return success(postDto);

}

export async function getPosts(): Promise<SuccessResult<PostDto[]>> {

    const populateOptions = [
        { path: 'user' },
        { path: 'comments', populate: [{ path: 'user' }], options: { sort: '-createdAt' } }
    ];

    type PopulatedPost = RemoveId<PostDocument, "user" | "comments">;

    const posts: PopulatedPost[] = await Post.find().sort('-createdAt').populate(populateOptions);

    const postsDto = posts.map(post => ({
        id: post.id,
        content: post.content,
        user: { id: post.user._id.toString(), name: post.user.name },
        comments: post.comments.map((comment: any) => ({
            id: comment._id.toString(),
            content: comment.content,
            user: {
                id: comment.user.id,
                name: comment.user.name
            }
        }))
    }));


    return success(postsDto);

}

export async function addCommentToPost(data: CommentCreationDto): Promise<Result<CommentDto>> {

    const post = await Post.findById(data.post.id);

    if (!post) return error('Post not found');

    const { user, content } = data;

    const comment = await Comment.create({ content, user: new Types.ObjectId(user.id), post });

    post.comments.push(comment._id);

    await post.save();

    const commentDto = {
        id: comment.id,
        user: { id: user.id, name: user.name },
        content: comment.content
    };

    return success(commentDto);

}

export async function deletePost(postId: string): Promise<Result<null>> {

    const post = await Post.findById(postId);

    if (!post) return error('Post not found');

    await Comment.deleteMany({ _id: { $in: post.comments } });

    await post.deleteOne();

    return success(null);

}

export async function deleteCommentFromPost(commentId: string): Promise<Result<null>> {

    const comment: Nullable<CommentDocument> = await Comment.findById(commentId).populate('post');

    if (!comment) return error('Comment not found');

    const post = comment.post as PostDocument;
    const postComments = post.comments as Types.ObjectId[];

    post.comments = postComments.filter(id => id.toString() !== commentId);

    await post.save();

    await comment.deleteOne();

    return success(null);


}

export async function getPostUser(postId: string): Promise<Result<UserDto>> {

    type PopulatedPost = Nullable<RemoveId<PostDocument, "user">>;

    const post: PopulatedPost = await Post.findById(postId).populate('user');

    if (!post) return error('Post not found');

    const { id, name, email } = post.user;

    return success({ id, name, email });

}

export async function getCommentUser(commentId: string): Promise<Result<UserDto>> {

    type PopulatedComment = Nullable<RemoveId<CommentDocument, "user">>;

    const comment: PopulatedComment = await Comment.findById(commentId).populate('user');

    if (!comment) return error('Comment not found');

    const { id, name, email } = comment.user;

    return success({ id, name, email });
}