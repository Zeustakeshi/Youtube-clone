import VideoModel from "../models/Video.model.js";
import SearchKeywordModel from "../models/SearchKeyword.model.js";
import generateKeywordSuggestions from "../utils/generateKeywordSuggestions.js";
import { nonAccentVietnamese } from "../utils/nonAccentVietnamese.js";

class SearchService {
    async createNewSearchKeyWord(keyword) {
        const newSearchKeyWord = new SearchKeywordModel({ keyword: keyword });
        newSearchKeyWord.save();
    }

    async searchVideo(searchRegex, limit = 20) {
        const videos = await VideoModel.find({ tags: { $in: searchRegex } })
            .limit(limit)
            .sort({ createdAt: -1 });
        return videos;
    }

    async getSuggestionKeywords(searchKeyword) {
        const keywords = await SearchKeywordModel.find({});
        return generateKeywordSuggestions(
            searchKeyword,
            keywords.map((keyword) => keyword.keyword)
        );
    }
}

export default new SearchService();
