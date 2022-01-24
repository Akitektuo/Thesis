export interface LoginUserType {
    email: string;
    password: string;
}

export const EMPTY_LOGIN_USER: LoginUserType = {
    email: "",
    password: ""
};

export interface RegisterUserType {
    email: string;
    password: string;
    confirmPassword: string;
}

export const EMPTY_REGISTER_USER: RegisterUserType = {
    email: "",
    password: "",
    confirmPassword: ""
};