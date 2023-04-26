import { model, Schema } from "mongoose";

const CommentSchema = new Schema(
    {
        videoID: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        likes: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default model("comments", CommentSchema);
