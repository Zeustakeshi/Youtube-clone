import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchState } from "../../../interfaces/Search.interface";
import { User } from "../../../interfaces/User.interface";
import { v4 as uuidv4 } from "uuid";
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

export const { loadSearchHistory, setSearchHistory, removeSearchHistory } =
    searchSlice.actions;
export default searchSlice.reducer;
