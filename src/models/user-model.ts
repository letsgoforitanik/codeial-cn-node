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
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

export default User;
