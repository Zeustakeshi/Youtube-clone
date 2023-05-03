export interface User {
    _id: string | number | null | undefined;
    username: string;
    email?: string;
    avatar?: string;
    subscribers: number;
    subscribedUsers: string[];
    error?: string | null;
    background?: string;
}

export type AuthorType = Pick<
    User,
    "avatar" | "_id" | "username" | "subscribers" | "background"
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

export interface IUpdateUserPayloadAction {
    type: "background" | "username" | "avatar" | "subscribedUsers";
    data: string | string[];
}
