import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        password: {
            type: Schema.Types.String,
            required: true,
        },
        name: {
            type: Schema.Types.String,
            required: true,
        },
        avatar: {
            type: Schema.Types.String
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

export default User;
