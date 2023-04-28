export interface IComment {
    _id: string | number;
    videoID: string;
    userID: string;
    comment: string;
    likes: string[];
    createdAt: string;
    updatedAt: string;
}
