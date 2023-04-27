import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import {
    FetchVideoPayloadType,
    IVideoResponse,
} from "../../../interfaces/Video.interface";
import { fetchVideoApi } from "./videoApi";
import { fechVideoSuccess, fetchVideoFailure } from "./videoSlice";

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
