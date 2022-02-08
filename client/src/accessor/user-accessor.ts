import { BASE_URL } from "./constants";
import { httpGet } from "./helper-functions";

const URL = `${BASE_URL}user`;

export const isAdmin = () => httpGet<boolean>(`${URL}/isAdmin`);