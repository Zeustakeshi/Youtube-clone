import userService from "../services/user.service.js";
import videoService from "../services/video.service.js";
import searchService from "../services/search.service.js";
import { nonAccentVietnamese } from "../utils/nonAccentVietnamese.js";
export const addNew = async (req, res) => {
    const userID = req.userID;
    const { title, thumbnailURL, youtubeID, tags } = req.body;
    if (!thumbnailURL || !youtubeID) {
        return res.status(400).json("Missing data for this action!");
    }
    const searchKeyword = nonAccentVietnamese(title);
    const searchTags = tags?.map((tag) => nonAccentVietnamese(tag)) || [];
    try {
        const newVideo = await videoService.addNew({
            userID,
            title,
            thumbnailURL,
            youtubeID,
            tags: [searchKeyword, ...searchTags],
        });
        await searchService.createNewSearchKeyWord(
            nonAccentVietnamese(newVideo.title)
        );
        return res.status(200).json(newVideo);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const update = async (req, res) => {
    const userID = req.userID;
    const videoID = req.params.id;
    const { title, thumbnailURL, youtubeID } = req.body;
    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (thumbnailURL) updatedFields.thumbnailURL = thumbnailURL;
    if (youtubeID) updatedFields.youtubeID = youtubeID;

    if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json("Missing data for this action!");
    }

    try {
        const video = await videoService.update(userID, videoID, updatedFields);
        return res.status(200).json({
            message: "Video has been updated!",
            video,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const like = async (req, res) => {
    const userID = req.userID;
    const videoID = req.params.id;

    try {
        await videoService.like(userID, videoID);
        return res.status(200).json("Like video success!");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const unlike = async (req, res) => {
    const userID = req.userID;
    const videoID = req.params.id;

    try {
        await videoService.unlike(userID, videoID);
        return res.status(200).json("unlike video success!");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const deleteVideo = async (req, res) => {
    const videoID = req.params.id;
    try {
        await videoService.delete(videoID);
        return res.status(200).json("Video has been deleted!");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getVideo = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const tags = req.query.tags?.split(",");
    const skip = (page - 1) * limit;

    try {
        if (tags) {
            const videos = await videoService.getVideoByTags(tags, skip);
            return res.status(200).json(videos);
        } else {
            const videos = await videoService.getVideoLimit(skip, limit);
            return res.status(200).json(videos);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getTrendVideo = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        const videos = await videoService.getTrendVideo(skip, limit);
        return res.status(200).json(videos);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getVideoByID = async (req, res) => {
    const videoID = req.params.id;
    try {
        const video = await videoService.getVideoByID(videoID);
        return res.status(200).json(video);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getSubscribedVideo = async (req, res) => {
    const userID = req.userID;
    try {
        const subscribedUsers = await userService.getSubscribedUsers(userID);
        const limit = subscribedUsers.length >= 10 ? 10 : 20;
        const videos = await videoService.getSubscribedVideo(
            subscribedUsers,
            limit
        );
        return res.status(200).json(videos);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getVideoByChannelID = async (req, res) => {
    const channelID = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const videos = await videoService.getVideoByChannelID(
            channelID,
            skip,
            limit
        );
        return res.status(200).json(videos);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
