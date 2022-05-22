import { UserDashboardType } from "shared/types/user-types";
import { BASE_URL_API } from "./constants";
import { httpGet } from "./helper-functions";

const URL = `${BASE_URL_API}user`;

export const isAdmin = () => httpGet<boolean>(`${URL}/isAdmin`);

export const getUserDashboard = () => httpGet<UserDashboardType>(`${URL}/dashboard`);