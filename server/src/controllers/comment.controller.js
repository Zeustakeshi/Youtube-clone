import commentService from "../services/comment.service.js";

export const getComment = async (req, res) => {
    const videoID = req.params.videoID;

    try {
        const comments = await commentService.getComment(videoID);
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const addNew = async (req, res) => {
    const userID = req.userID;
    const { videoID, comment } = req.body;
    if (!videoID || !comment) {
        return res.status(400).json("Missing data for this action!");
    }

    try {
        const newComment = await commentService.addNew(
            userID,
            videoID,
            comment
        );
        return res.status(200).json(newComment);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const deleteComment = async (req, res) => {
    const userID = req.userID;
    const { videoID, commentID } = req.body;
    if (!videoID || !commentID) {
        return res.status(400).json("Missing data for this action!");
    }
    try {
        await commentService.delete(commentID, userID, videoID);
        return res.status(200).json("Comment has been deleted!");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const likeComment = async (req, res) => {
    const userID = req.userID;
    const commentID = req.params.id;

    try {
        await commentService.likeComment(commentID, userID);
        return res.status(200).json("Like comment success!");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const unLikeComment = async (req, res) => {
    const userID = req.userID;
    const commentID = req.params.id;

    try {
        await commentService.unLikeComment(commentID, userID);
        return res.status(200).json("unLike comment success!");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
