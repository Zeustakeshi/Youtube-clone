import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select } from "redux-saga/effects";
import {
    FetchVideoPayloadType,
    IVideo,
    IVideoResponse,
} from "../../../interfaces/Video.interface";
import { RootState } from "../../store";
import { fetchVideoApi } from "./videoApi";
import {
    fechLoadMoreVideoSuccess,
    fechVideoSuccess,
    fetchVideoFailure,
    increasementCurrentPage,
} from "./videoSlice";

export function* fetchVideoSaga(
    action: PayloadAction<FetchVideoPayloadType | undefined>
): Generator {
    try {
        const data: any = yield call(fetchVideoApi, action.payload);
        yield put(fechVideoSuccess(data));
    } catch (error: any) {
        yield put(fetchVideoFailure(error.message));
    }
}

export function* fetchLoadMoreVideoSaga(
    action: PayloadAction<FetchVideoPayloadType>
): Generator {
    try {
        const data: any = yield call(fetchVideoApi, action.payload);
        yield put(increasementCurrentPage(1));
        yield put(fechLoadMoreVideoSuccess(data));
    } catch (error: any) {
        yield put(fetchVideoFailure(error.message));
    }
}
