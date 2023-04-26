import { all, takeLatest } from "redux-saga/effects";
import { LoginSaga } from "./userHandler";
import { login } from "./userSlice";
// import {} from "./appHandler";
// import {} from "./appSlice";

export default function* userSaga() {
    yield all([takeLatest(login.type, LoginSaga)]);
}
