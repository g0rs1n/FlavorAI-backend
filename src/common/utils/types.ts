

export interface IRegisterData {
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    password: string;
    avatarPath?: string;
}

export interface ILoginData {
    username?: string;
    email: string;
    password: string;
}

export interface IUserBase {
    id: number;
    email: string;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    avatarPath?: string | null;
}
