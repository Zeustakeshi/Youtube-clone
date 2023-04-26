export interface IVideo {
    title: string;
    userID: string | number;
    thumbnailURL: string;
    videoURL: string;
    views: number;
    likes: string[];
    tags: string[];
    desc: string;
}
