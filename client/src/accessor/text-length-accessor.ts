import { BASE_URL } from "./constants";
import { httpPost } from "./helper-functions";

const URL = `${BASE_URL}textLength`;

export const getTextLength = (text: string) => httpPost<{ content: string }>(URL, { content: text });