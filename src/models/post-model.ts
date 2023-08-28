import { Schema, model } from 'mongoose';

const postSchema = new Schema(
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
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Like'
            }
        ]
    },
    {
        timestamps: true
    }
);

const Post = model('Post', postSchema);

export default Post;