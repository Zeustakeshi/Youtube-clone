import VideoModel from "../models/Video.model.js";

class SearchService {
    async searchVideo(searchRegex, limit = 20) {
        const videos = await VideoModel.find({ tags: { $in: searchRegex } })
            .limit(limit)
            .sort({ createdAt: -1 });
        return videos;
    }
}

export default new SearchService();
