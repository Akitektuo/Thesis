import { BASE_URL } from "./constants";
import { httpPost } from "./helper-functions";

const URL = `${BASE_URL}documents`;

export const uploadDocument = (document: File) => httpPost<string>(URL, document);