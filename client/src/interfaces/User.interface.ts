export interface User {
    _id: string | number | null | undefined;
    username: string;
    email?: string;
    avatar?: string;
    subscribers: number;
    subscribedUsers: string[];
    error?: string | null;
}

export type AuthorType = Pick<
    User,
    "avatar" | "_id" | "username" | "subscribers"
>;

export interface IUserLoginDataField {
    email: string;
    password: string;
}

export interface IUserRegisterDataField {
    email: string;
    password: string;
    userName: string;
}
