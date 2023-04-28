import { all, takeLatest } from "redux-saga/effects";
import { fetchLoadMoreVideoSaga, fetchVideoSaga } from "./videoHandller";
import { fetchLoadMoreVideo, fetchVideo } from "./videoSlice";

export default function* videoSaga() {
    yield all([
        takeLatest(fetchVideo.type, fetchVideoSaga),
        takeLatest(fetchLoadMoreVideo.type, fetchLoadMoreVideoSaga),
    ]);
}
