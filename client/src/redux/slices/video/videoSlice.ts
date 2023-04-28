import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    FetchVideoPayloadType,
    IVideo,
    IVideoResponse,
    IVideoState,
} from "../../../interfaces/Video.interface";

const initialState: IVideoState = {
    videos: [],
    error: null,
    itemCount: 0,
    pageCount: 0,
    currentPage: 1,
};

const videoSlice = createSlice({
    name: "video",
    initialState: initialState,
    reducers: {
        fetchVideo(
            state,
            action: PayloadAction<FetchVideoPayloadType | undefined>
        ) {},
        fechVideoSuccess(state, action: PayloadAction<IVideoResponse>) {
            state.videos = action.payload.videos;
            state.itemCount = action.payload.itemCount;
            state.pageCount = action.payload.pageCount;
        },
        fetchVideoFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        fetchLoadMoreVideo(
            state,
            action: PayloadAction<FetchVideoPayloadType>
        ) {},
        fechLoadMoreVideoSuccess(state, action: PayloadAction<IVideoResponse>) {
            state.videos = [...state.videos, ...action.payload.videos];
            state.itemCount = action.payload.itemCount;
            state.pageCount = action.payload.pageCount;
        },
        increasementCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage += action.payload;
        },
        resetCurrentPage(state) {
            state.currentPage = 1;
        },
    },
});

export const {
    fetchVideo,
    fechVideoSuccess,
    fetchVideoFailure,
    fetchLoadMoreVideo,
    fechLoadMoreVideoSuccess,
    increasementCurrentPage,
    resetCurrentPage,
} = videoSlice.actions;
export default videoSlice.reducer;
