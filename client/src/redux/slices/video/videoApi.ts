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
            tag: payload?.tag,
            page: payload?.page,
            limit: payload?.limit,
        },
        withCredentials: true,
    });
    return data;
};
