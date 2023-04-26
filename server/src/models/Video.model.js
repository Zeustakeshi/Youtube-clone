import { model, Schema } from "mongoose";

const VideoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            max: 500,
        },
        userID: {
            type: String,
            required: true,
        },
        thumbnailURL: {
            type: String,
            required: true,
        },
        videoURL: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: {
            type: [String],
            default: [],
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default model("videos", VideoSchema);
