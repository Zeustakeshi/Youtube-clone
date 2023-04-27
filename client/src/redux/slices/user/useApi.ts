import axios from "axios";
import {
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
