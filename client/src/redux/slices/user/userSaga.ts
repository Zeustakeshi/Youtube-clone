import { all, takeLatest } from "redux-saga/effects";
import { LoginSaga, RegisterSaga } from "./userHandler";
import { login, register } from "./userSlice";

export default function* userSaga() {
    yield all([
        takeLatest(login.type, LoginSaga),
        takeLatest(register.type, RegisterSaga),
    ]);
}
