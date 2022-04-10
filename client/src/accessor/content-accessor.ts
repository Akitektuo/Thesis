import { IdWithPosition } from "shared/types";
import { PlainContentType } from "shared/types/content-types";
import { BASE_URL } from "./constants";
import { httpDelete, httpGet, httpPost, httpPut } from "./helper-functions";

const URL = `${BASE_URL}contents`;

export const createContent = (content: PlainContentType) =>
    httpPost<PlainContentType>(URL, content);

export const updateContent = (content: PlainContentType) =>
    httpPut<PlainContentType>(URL, content);

export const deleteContent = (contentId: string) =>
    httpDelete(`${URL}/${contentId}`);

export const getAllContents = (chapterId: string) =>
    httpGet<PlainContentType[]>(`${URL}/allForChapter/${chapterId}`);

export const rearrangeContents = (chapterId: string, idsWithPositions: IdWithPosition[]) =>
    httpPut(`${URL}/rearrange/${chapterId}`, idsWithPositions);