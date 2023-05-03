import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    IUpdateUserPayloadAction,
    IUserLoginDataField,
    IUserRegisterDataField,
    User,
} from "../../../interfaces/User.interface";

const initialState: User = {
    _id: null,
    username: "",
    email: "",
    avatar: "",
    subscribedUsers: [],
    subscribers: 0,
    error: null,
    background: "",
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getUserFromLocalStorage(state) {
            const storageData = localStorage.getItem("current-user");
            if (storageData) {
                const userData = JSON.parse(storageData);
                state.username = userData.username;
                state.email = userData.email;
                state._id = userData._id;
                state.subscribedUsers = userData.subscribedUsers;
                state.subscribers = userData.subscribers;
                state.avatar = userData.avatar;
                state.background = userData.background;
            }
        },
        login(state, action: PayloadAction<IUserLoginDataField>) {},
        register(state, action: PayloadAction<IUserRegisterDataField>) {},
        logout(state) {
            state.username = initialState.username;
            state.email = initialState.email;
            state._id = initialState._id;
            state.subscribedUsers = initialState.subscribedUsers;
            state.subscribers = initialState.subscribers;
            state.avatar = initialState.avatar;
            state.background = initialState.background;
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie =
                    name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
            localStorage.clear();
        },
        fetchUserSuccess(state, action: PayloadAction<User>) {
            const {
                username,
                email,
                _id,
                subscribedUsers,
                subscribers,
                avatar,
                background,
            } = action.payload;

            state.username = username;
            state.email = email;
            state._id = _id;
            state.subscribedUsers = subscribedUsers;
            state.subscribers = subscribers;
            state.avatar = avatar;
            state.background = background;
        },
        fetchUserFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        updateUser(state, action: PayloadAction<IUpdateUserPayloadAction>) {},
        updateUserSuccess(
            state,
            action: PayloadAction<IUpdateUserPayloadAction>
        ) {
            if (
                typeof action.payload.data !== "string" &&
                action.payload.type === "subscribedUsers"
            ) {
                state[action.payload.type] = action.payload.data;
            } else if (
                typeof action.payload.data === "string" &&
                action.payload.type !== "subscribedUsers"
            ) {
                state[action.payload.type] = action.payload.data;
            }
            localStorage.setItem("current-user", JSON.stringify(state));
        },
    },
});

export const {
    getUserFromLocalStorage,
    login,
    register,
    logout,
    fetchUserSuccess,
    fetchUserFailure,
    updateUser,
    updateUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
