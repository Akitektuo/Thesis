import { LoginUserType, RegisterUserType } from "shared/types/user-types";
import { BASE_URL } from "./constants";
import { httpPost } from "./helper-functions";

const URL = `${BASE_URL}authenticate`;

export const login = (loginUser: LoginUserType) => httpPost<string>(`${URL}/login`, loginUser);

export const register = (registerUser: RegisterUserType) =>
    httpPost<string>(`${URL}/register`, registerUser);