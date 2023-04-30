import axios from "axios";
import { ISearchKeywordResponse } from "../../../interfaces/Search.interface";
import { API_URL } from "../../../utils/const";

export const getSuggestionKeywords = async (
    keyword: string
): Promise<ISearchKeywordResponse> => {
    const res = await axios({
        method: "GET",
        url: API_URL + `/search/video`,
        params: {
            keyword: keyword,
        },
        withCredentials: true,
    });
    return res.data;
};
