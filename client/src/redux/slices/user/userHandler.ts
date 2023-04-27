import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import {
    IUserLoginDataField,
    IUserRegisterDataField,
} from "../../../interfaces/User.interface";
import { login, register } from "./useApi";
import { fetchUserFailure, fetchUserSuccess } from "./userSlice";

export function* LoginSaga(
    action: PayloadAction<IUserLoginDataField>
): Generator {
    try {
        const data: any = yield call(login, action.payload);
        localStorage.setItem("current-user", JSON.stringify(data.user));
        document.cookie = `access_token=${data.access_token}`;
        yield put(fetchUserSuccess(data.user));
    } catch (error: any) {
        yield put(fetchUserFailure(error.message));
    }
}

export function* RegisterSaga(
    action: PayloadAction<IUserRegisterDataField>
): Generator {
    try {
        const data: any = yield call(register, action.payload);
        localStorage.setItem("current-user", JSON.stringify(data.user));
        document.cookie = `access_token=${data.access_token}`;
        yield put(fetchUserSuccess(data.user));
    } catch (error: any) {
        yield put(fetchUserFailure(error.message));
    }
}

export function* getUserFromLocalStorageSaga() {
    try {
        const userData = localStorage.getItem("current-user");
        if (userData) {
            yield put(fetchUserSuccess(JSON.parse(userData)));
        }
    } catch (error) {
        yield put(fetchUserFailure("User not found!"));
    }
}
