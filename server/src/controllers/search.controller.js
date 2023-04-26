import escapeStringRegexp from "escape-string-regexp";
import VideoModel from "../models/Video.model.js";
import searchService from "../services/search.service.js";
import { nonAccentVietnamese } from "../utils/nonAccentVietnamese.js";

export const searchVideo = async (req, res) => {
    const { q: searchQuery } = req.query;
    const escapedSearchValue = escapeStringRegexp(
        nonAccentVietnamese(searchQuery)
    );
    const searchRegex = new RegExp(escapedSearchValue, "i");

    try {
        const videos = await searchService.searchVideo(searchRegex);
        return res.json(videos);
    } catch (error) {
        return res.status(500).json(error);
    }
};
