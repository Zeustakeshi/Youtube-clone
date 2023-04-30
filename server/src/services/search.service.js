import VideoModel from "../models/Video.model.js";
import SearchKeywordModel from "../models/SearchKeyword.model.js";
import generateKeywordSuggestions from "../utils/generateKeywordSuggestions.js";
import { nonAccentVietnamese } from "../utils/nonAccentVietnamese.js";

class SearchService {
    async createNewSearchKeyWord(keyword) {
        const newSearchKeyWord = new SearchKeywordModel({ keyword: keyword });
        newSearchKeyWord.save();
    }

    async searchVideo(searchKeywords, limit = 20) {
        const videos = await VideoModel.find({ tags: { $in: searchKeywords } })
            .limit(limit)
            .sort({ createdAt: -1 });
        return videos;
    }

    async getSuggestionKeywords(searchKeyword) {
        const keywords = await SearchKeywordModel.find({});
        const resluts = generateKeywordSuggestions(searchKeyword, keywords);
        return resluts.sort((a, b) => b.similarity - a.similarity).slice(0, 10);
    }
}

export default new SearchService();
