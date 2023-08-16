import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        content: {
            type: Schema.Types.String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        post: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Post'
        }
    },
    {
        timestamps: true
    }
);

const Comment = model('Comment', commentSchema);

export default Comment;