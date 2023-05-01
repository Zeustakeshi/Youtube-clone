import { AuthorType } from "./User.interface";

export interface IVideoSimilar {
    _id: string;
    keyword: string;
    similarity: number;
}

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
    author?: AuthorType;
    similars: IVideoSimilar[];
}

export interface IVideoState {
    videos: IVideo[];
    // relatedVideos: IVideo[];
    error: string | null;
    itemCount: number;
    pageCount: number;
    currentPage: number;
}

export interface FetchVideoPayloadType {
    tag?: string;
    page?: number;
    limit?: number;
}

export interface IVideoResponse {
    videos: IVideo[];
    itemCount: number;
    pageCount: number;
}
