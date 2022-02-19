import { PlainBadgeType } from "shared/types/badge-types";
import { BASE_URL } from "./constants";
import { httpGet, httpPost, httpPut } from "./helper-functions";

const URL = `${BASE_URL}badges`;

export const createBadge = (badge: PlainBadgeType) => httpPost<PlainBadgeType>(URL, badge);

export const updateBadge = (badge: PlainBadgeType) => httpPut<PlainBadgeType>(URL, badge);

export const getAllBadges = () => httpGet<PlainBadgeType[]>(`${URL}/all`);