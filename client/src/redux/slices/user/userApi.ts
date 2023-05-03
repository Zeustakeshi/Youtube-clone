import axios from "axios";
import {
    IUpdateUserPayloadAction,
    IUserLoginDataField,
    IUserRegisterDataField,
} from "../../../interfaces/User.interface";
import { API_URL } from "../../../utils/const";

export const login = async (payload: IUserLoginDataField) => {
    const { data } = await axios({
        method: "POST",
        url: API_URL + `/user/login`,
        data: {
            email: payload.email,
            password: payload.password,
        },
        withCredentials: true,
    });
    return data;
};

export const register = async (payload: IUserRegisterDataField) => {
    const { data } = await axios({
        method: "POST",
        url: API_URL + "/user/register",
        data: {
            username: payload.userName,
            email: payload.email,
            password: payload.password,
        },
        withCredentials: true,
    });
    return data;
};

export const updateUserAPI = async (
    payload: IUpdateUserPayloadAction
): Promise<any> => {
    return await axios({
        method: "PATCH",
        url: API_URL + "/user/update",
        data: {
            [payload.type]: payload.data,
        },
        headers: {
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        withCredentials: true,
    });
};
