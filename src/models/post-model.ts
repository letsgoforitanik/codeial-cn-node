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

    },
    {
        timestamps: true
    }
);

const Post = model('Post', postSchema);

export default Post;