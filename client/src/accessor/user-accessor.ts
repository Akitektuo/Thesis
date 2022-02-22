import { UserDashboardType } from "shared/types/user-types";
import { BASE_URL } from "./constants";
import { httpGet } from "./helper-functions";

const URL = `${BASE_URL}user`;

export const isAdmin = () => httpGet<boolean>(`${URL}/isAdmin`);

export const getUserDashboard = () => httpGet<UserDashboardType>(`${URL}/dashboard`);