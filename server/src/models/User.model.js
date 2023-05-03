import { model, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            min: 6,
            required: true,
        },
        avatar: {
            type: String,
            default: null,
        },
        background: {
            type: String,
            default: null,
        },
        subscribers: {
            type: Number,
            default: 0,
        },
        subscribedUsers: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default model("users", UserSchema);
