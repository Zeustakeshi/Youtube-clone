import CommentModel from "../models/Comment.model.js";

class CommentService {
    async addNew(userID, videoID, comment) {
        const newComment = new CommentModel({
            userID,
            videoID,
            comment,
        });
        await newComment.save();
        return newComment;
    }

    async delete(commentID, userID, videoID) {
        await CommentModel.findOneAndDelete({
            _id: commentID,
            userID: userID,
            videoID: videoID,
        });
    }

    async getComment(videoID) {
        const comments = await CommentModel.find({ videoID: videoID }).sort({
            createdAt: -1,
        });
        return comments;
    }
}

export default new CommentService();
