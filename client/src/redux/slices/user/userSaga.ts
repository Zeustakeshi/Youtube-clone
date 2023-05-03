import { all, takeLatest } from "redux-saga/effects";
import { LoginSaga, RegisterSaga, updateUserSaga } from "./userHandler";
import { login, register, updateUser } from "./userSlice";

export default function* userSaga() {
    yield all([
        takeLatest(login.type, LoginSaga),
        takeLatest(register.type, RegisterSaga),
        takeLatest(updateUser.type, updateUserSaga),
    ]);
}
