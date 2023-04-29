import escapeStringRegexp from "escape-string-regexp";
import VideoModel from "../models/Video.model.js";
import searchService from "../services/search.service.js";
import { nonAccentVietnamese } from "../utils/nonAccentVietnamese.js";

export const searchVideo = async (req, res) => {
    const { q: searchQuery } = req.query;
    const { keyword: searchKeyword } = req.query;
    const escapedSearchValue = escapeStringRegexp(
        nonAccentVietnamese(searchQuery || "")
    );
    const searchRegex = new RegExp(escapedSearchValue, "i");
    try {
        if (searchRegex && searchQuery) {
            const videos = await searchService.searchVideo(searchRegex);
            return res.json(videos);
        }
        if (searchKeyword) {
            const keywordSuggestions =
                await searchService.getSuggestionKeywords(searchKeyword);

            return res.status(200).json(keywordSuggestions);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};
