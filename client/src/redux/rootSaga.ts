import { all, fork } from "redux-saga/effects";
import appSaga from "./slices/app/appSaga";
import searchSaga from "./slices/search/searchSaga";
import userSaga from "./slices/user/userSaga";

export default function* rootSaga() {
    yield all([fork(searchSaga), fork(appSaga), fork(userSaga)]);
}
