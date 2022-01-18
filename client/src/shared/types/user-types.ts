export interface LoginUserType {
    email: string;
    password: string;
}

export const EMPTY_LOGIN_USER: LoginUserType = {
    email: "",
    password: ""
}