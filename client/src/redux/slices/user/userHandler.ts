import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { IUserLoginDataField } from "../../../interfaces/User.interface";
import { login } from "./useApi";
import { fetchUserFailure, fetchUserSuccess } from "./userSlice";

export function* LoginSaga(
    action: PayloadAction<IUserLoginDataField>
): Generator {
    try {
        const data: any = yield call(login, action.payload);
        yield put(fetchUserSuccess(data.user));
    } catch (error: any) {
        yield put(fetchUserFailure(error.message));
    }
}
