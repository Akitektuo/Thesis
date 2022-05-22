import { DisplayBadgeType, PlainBadgeType } from "shared/types/badge-types";
import { BASE_URL_API } from "./constants";
import { httpGet, httpPost, httpPut } from "./helper-functions";

const URL = `${BASE_URL_API}badges`;

export const createBadge = (badge: PlainBadgeType) => httpPost<PlainBadgeType>(URL, badge);

export const updateBadge = (badge: PlainBadgeType) => httpPut<PlainBadgeType>(URL, badge);

export const getAllBadges = () => httpGet<PlainBadgeType[]>(`${URL}/all`);

export const getAllBadgesForUser = () => httpGet<DisplayBadgeType[]>(`${URL}/userAll`);