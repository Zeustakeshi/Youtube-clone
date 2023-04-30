import { all, takeLatest } from "redux-saga/effects";
import { fetchSearchKeywordSaga } from "./searchHandler";
import { fetchSearchKeyword } from "./searchSlice";

export default function* searchSaga() {
    yield all([takeLatest(fetchSearchKeyword.type, fetchSearchKeywordSaga)]);
}
