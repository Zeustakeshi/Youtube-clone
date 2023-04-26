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
        login(state, action: PayloadAction<IUserLoginDataField>) {},
        register(state, action: PayloadAction<IUserRegisterDataField>) {},
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
    },
});

export const { login, register, fetchUserSuccess, fetchUserFailure } =
    userSlice.actions;
export default userSlice.reducer;
