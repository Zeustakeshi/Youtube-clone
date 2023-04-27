export interface IVideo {
    _id: string | number | null;
    title: string;
    userID: string | number;
    thumbnailURL: string;
    youtubeID: string;
    views: number;
    likes: string[];
    tags: string[];
    desc: string;
    createdAt: string;
    updatedAt: string;
}

export interface IVideoState {
    videos: IVideo[];
    // relatedVideos: IVideo[];
    error: string | null;
    itemCount: number;
    pageCount: number;
}

export interface FetchVideoPayloadType {
    query: string;
}

export interface IVideoResponse {
    videos: IVideo[];
    itemCount: number;
    pageCount: number;
}
