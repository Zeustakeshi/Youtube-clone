import axios from "axios";
import {
    FetchVideoPayloadType,
    IVideoResponse,
} from "../../../interfaces/Video.interface";
import { API_URL } from "../../../utils/const";

export const fetchVideoApi = async (payload?: FetchVideoPayloadType) => {
    const { data }: { data: IVideoResponse } = await axios({
        method: "GET",
        url: API_URL + "/video",
        params: {
            tag: payload?.query,
        },
        withCredentials: true,
    });
    return data;
};
