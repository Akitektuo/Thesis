import { BASE_URL_API } from "./constants";
import { httpPost } from "./helper-functions";

const URL = `${BASE_URL_API}textLength`;

export const getTextLength = (text: string) => httpPost<{ content: string }>(URL, { content: text });