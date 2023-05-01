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
        youtubeID: {
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
        similars: {
            type: [
                {
                    _id: String,
                    keyword: String,
                    similarity: Number,
                },
            ],
            default: [],
            unique: true,
        },
    },
    { timestamps: true }
);

export default model("videos", VideoSchema);
