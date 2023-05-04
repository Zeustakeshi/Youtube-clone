import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import {
    IUpdateUserPayloadAction,
    IUserLoginDataField,
    IUserRegisterDataField,
} from "../../../interfaces/User.interface";
import { login, register, updateUserAPI } from "./userApi";
import {
    fetchUserFailure,
    fetchUserSuccess,
    updateUserSuccess,
} from "./userSlice";

export function* LoginSaga(
    action: PayloadAction<IUserLoginDataField>
): Generator {
    try {
        const data: any = yield call(login, action.payload);
        localStorage.setItem("current-user", JSON.stringify(data.user));
        document.cookie = `access_token=${data.access_token}`;
        yield put(fetchUserSuccess(data.user));
    } catch (error: any) {
        toast.error(error.message);
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
        toast.error(error.message);
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

export function* updateUserSaga(
    action: PayloadAction<IUpdateUserPayloadAction>
): Generator {
    try {
        yield call(updateUserAPI, action.payload);
        yield put(updateUserSuccess(action.payload));
        toast.success("Cập nhật thành công!");
    } catch (error: any) {
        toast.error(error.message);
    }
}

export function* updateUserNameSaga() {}
export function* updateAvatar() {}
