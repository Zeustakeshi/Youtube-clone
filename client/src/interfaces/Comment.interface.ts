export interface IComment {
    id: string | number;
    videoID: string;
    userID: string;
    comment: string;
    likes: string[];
}
