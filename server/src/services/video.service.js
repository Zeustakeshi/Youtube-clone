import VideoModel from "../models/Video.model.js";
class VideoService {
    async addNew(values) {
        const newVideo = new VideoModel(values);
        await newVideo.save();
        return newVideo;
    }

    async update(userID, videoID, updatedFields) {
        const video = await VideoModel.findOneAndUpdate(
            {
                _id: videoID,
                userID: userID,
            },
            updatedFields,
            { new: true }
        );
        if (!video) throw new Error("Video not found!");
        return video;
    }

    async findAndUpdateAllSimilars(similars, videoKeyword) {
        const video = await VideoModel.updateMany(
            { tags: { $in: similars } },
            {
                $push: {
                    similars: videoKeyword,
                },
            }
        );
        if (!video) throw new Error("Video not found!");
    }

    async like(userID, videoID) {
        const video = await VideoModel.findById(videoID, { likes: 1 });
        if (!video) throw new Error("Video not found!");
        if (video.likes.includes(userID)) {
            throw new Error("You has been liked this video!");
        }
        await video.updateOne({ $push: { likes: userID } });
    }

    async unlike(userID, videoID) {
        const video = await VideoModel.findById(videoID, { likes: 1 });
        if (!video) throw new Error("Video not found!");
        if (!video.likes.includes(userID)) {
            throw new Error("You are not like this video!");
        }
        await video.updateOne({ $pull: { likes: userID } });
    }

    async delete(videoID) {
        await VideoModel.findByIdAndDelete(videoID);
    }

    async getVideoByID(videoID) {
        const video = await VideoModel.findById(videoID);
        if (!video) throw new Error("Video not found");
        return video;
    }

    async getVideoByTitle(title) {
        const video = await VideoModel.findOne({ title: title });
        if (!video) throw new Error("Video not found");
        return video;
    }

    async getAllVideo() {
        const videos = await VideoModel.find().sort({ createdAt: -1 });
        return videos;
    }

    async getVideoLimit(skip, limit) {
        const videos = await VideoModel.find()
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });

        const itemCount = await VideoModel.countDocuments();
        const pageCount = Math.ceil(itemCount / limit);

        return { videos, itemCount, pageCount };
    }

    async getVideoByTags(tags, skip = 0, limit) {
        const videos = await VideoModel.find({ tags: { $in: tags } })
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });
        const itemCount = await VideoModel.countDocuments({
            tags: { $in: tags },
        });
        const pageCount = Math.ceil(itemCount / limit);
        return { videos, itemCount, pageCount };
    }

    async getSubscribedVideo(subscribedUsers, skip = 0, limit = 5) {
        let itemCount = 0;

        const videos = await Promise.all(
            subscribedUsers.map(async (channelID) => {
                itemCount += await VideoModel.countDocuments({
                    userID: channelID,
                });
                return VideoModel.find({ userID: channelID })
                    .sort({ createdAt: -1 })
                    .limit(limit)
                    .skip(skip);
            })
        );
        const pageCount = Math.ceil(itemCount / limit);
        return { videos: videos.flat(2), itemCount, pageCount };
    }

    async getTrendVideo(skip = 0, limit = 20) {
        const videos = await VideoModel.find()
            .limit(limit)
            .skip(skip)
            .sort({ views: -1 });

        const itemCount = await VideoModel.countDocuments();
        const pageCount = Math.ceil(itemCount / limit);

        return { videos, itemCount, pageCount };
    }

    async getVideoByChannelID(userID, skip = 0, limit = 10) {
        const videos = await VideoModel.find({ userID: userID })
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });
        return videos;
    }
}

export default new VideoService();
