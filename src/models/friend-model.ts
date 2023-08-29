import { Schema, model } from "mongoose";

const friendSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        friendUser: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Friend = model('Friend', friendSchema);

export default Friend;