import { all, takeLatest } from "redux-saga/effects";
import { fetchVideoSaga } from "./videoHandller";
import { fetchVideo } from "./videoSlice";

export default function* videoSaga() {
    yield all([takeLatest(fetchVideo.type, fetchVideoSaga)]);
}
