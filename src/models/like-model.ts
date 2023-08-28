import { Schema, model } from "mongoose";

const likeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        parent: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'parentType'
        },
        parentType: {
            type: Schema.Types.String,
            required: true,
            enum: ['Comment', 'Post']
        }
    },
    {
        timestamps: true
    }
);

const Like = model('Like', likeSchema);

export default Like;