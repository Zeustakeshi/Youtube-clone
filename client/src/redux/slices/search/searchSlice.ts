import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ISearchState } from "../../../interfaces/Search.interface";
const initialState: ISearchState = {
    results: [],
    isSuccess: false,
    error: null,
    searchHistory: [],
    keywordSuggestions: [],
};

const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        fetchSearchKeyword(state, acticon) {},
        clearSearchKeyword(state) {
            state.keywordSuggestions = [];
        },
        fetchSearchSuccess(state, action: PayloadAction<string[]>) {
            state.keywordSuggestions = action.payload;
        },
        fetchSearchFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        loadSearchHistory(state) {
            const historyStorage = localStorage.getItem("search-history");
            if (historyStorage) {
                state.searchHistory = JSON.parse(historyStorage);
            }
        },
        setSearchHistory(state, acticon: PayloadAction<string>) {
            state.searchHistory.unshift({
                id: uuidv4(),
                value: acticon.payload,
            });
            localStorage.setItem(
                "search-history",
                JSON.stringify(state.searchHistory)
            );
        },
        removeSearchHistory(state, acticon: PayloadAction<string>) {
            state.searchHistory = state.searchHistory.filter(
                (item) => item.id !== acticon.payload
            );
            localStorage.setItem(
                "search-history",
                JSON.stringify(state.searchHistory)
            );
        },
    },
});

export const {
    loadSearchHistory,
    setSearchHistory,
    removeSearchHistory,
    fetchSearchSuccess,
    fetchSearchFailure,
    fetchSearchKeyword,
    clearSearchKeyword,
} = searchSlice.actions;
export default searchSlice.reducer;
