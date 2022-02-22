import { DisplayBadgeType } from "./badge-types";

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

export interface UserDashboardLevelType {
    level: number;
    experience: number;
    levelMinimumExperience: number;
    levelMaximumExperience: number;
}

export interface UserDashboardType extends UserDashboardLevelType {
    email: string;
    topBadges: DisplayBadgeType[];
}