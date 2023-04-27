import { all, takeLatest } from "redux-saga/effects";
import {
    getUserFromLocalStorageSaga,
    LoginSaga,
    RegisterSaga,
} from "./userHandler";
import { getUserFromLocalStorage, login, register } from "./userSlice";

export default function* userSaga() {
    yield all([
        takeLatest(login.type, LoginSaga),
        takeLatest(register.type, RegisterSaga),
        takeLatest(getUserFromLocalStorage.type, getUserFromLocalStorageSaga),
    ]);
}
