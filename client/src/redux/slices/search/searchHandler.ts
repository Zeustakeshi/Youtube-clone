import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { ISearchKeywordResponse } from "../../../interfaces/Search.interface";
import { getSuggestionKeywords } from "./searchApi";
import { fetchSearchFailure, fetchSearchSuccess } from "./searchSlice";

export function* fetchSearchKeywordSaga(
    action: PayloadAction<string>
): Generator {
    try {
        const suggestionKeywords: any = yield call(
            getSuggestionKeywords,
            action.payload
        );
        const keywords = suggestionKeywords
            .sort((a: ISearchKeywordResponse, b: ISearchKeywordResponse) => {
                return b.similarity - a.similarity;
            })
            .map((item: ISearchKeywordResponse) => item.keyword);

        yield put(fetchSearchSuccess(keywords));
    } catch (error: any) {
        yield put(fetchSearchFailure(error.message));
    }
}
