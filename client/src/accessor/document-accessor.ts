import { BASE_URL_API } from "./constants";
import { httpGetFile, httpPost } from "./helper-functions";

const URL = `${BASE_URL_API}documents`;

export const uploadDocument = (document: File) => httpPost<string>(URL, document);

export const downloadDocument = (name: string) => httpGetFile(`${URL}/${name}`);