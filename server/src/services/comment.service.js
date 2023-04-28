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

    async likeComment(commentID, userID) {
        const comment = await CommentModel.findById(commentID, { likes: 1 });
        if (!comment) throw new Error("Can't find this comment!");
        if (comment.likes.includes(userID)) {
            throw new Error("You has been liked this comment!");
        }
        await comment.updateOne({ $push: { likes: userID } });
    }

    async unLikeComment(commentID, userID) {
        const comment = await CommentModel.findById(commentID, { likes: 1 });
        if (!comment) throw new Error("Can't find this comment!");
        if (!comment.likes.includes(userID)) {
            throw new Error("You are not like this s comment!");
        }
        await comment.updateOne({ $pull: { likes: userID } });
    }

    async getComment(videoID) {
        const comments = await CommentModel.find({ videoID: videoID }).sort({
            createdAt: -1,
        });
        return comments;
    }
}

export default new CommentService();
