import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
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
            document.cookie = "access_token=";
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
            } = action.payload;

            state.username = username;
            state.email = email;
            state._id = _id;
            state.subscribedUsers = subscribedUsers;
            state.subscribers = subscribers;
            state.avatar = avatar;
        },
        fetchUserFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        updateUserSubscribed(state, action: PayloadAction<string[]>) {
            state.subscribedUsers = action.payload;
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
    updateUserSubscribed,
} = userSlice.actions;
export default userSlice.reducer;
