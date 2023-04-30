import { IVideo } from "./Video.interface";

interface ISearchHistory {
    id: string;
    value: string;
}

export interface ISearchState {
    error: string | null;
    results: IVideo[];
    isSuccess: boolean;
    searchHistory: ISearchHistory[];
    keywordSuggestions: string[];
}

export interface ISearchKeywordResponse {
    _id: string;
    keyword: string;
    similarity: number;
}
