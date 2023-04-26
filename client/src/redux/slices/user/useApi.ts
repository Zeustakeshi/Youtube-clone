import axios from "axios";
import { IUserLoginDataField } from "../../../interfaces/User.interface";
import { API_URL } from "../../../utils/const";

export const login = async (payload: IUserLoginDataField) => {
    const { data } = await axios({
        method: "POST",
        url: API_URL + `/user/login`,
        data: {
            email: payload.email,
            password: payload.password,
        },
    });
    return data;
};
