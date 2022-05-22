import { getToken } from "helpers/token-helper";
import { ServerResponse } from "./types";

type httpMethod = "GET" | "POST" | "PUT" | "DELETE"; 

export const httpGet = <T>(url: string, body?: any) => genericFetch<T>("GET", url, body);

export const httpPost = <T>(url: string, body?: any) => genericFetch<T>("POST", url, body);

export const httpPut = <T>(url: string, body?: any) => genericFetch<T>("PUT", url, body);

export const httpDelete = <T>(url: string, body?: any) => genericFetch<T>("DELETE", url, body);

const getHeadersWithAuthorization = () => new Headers({ "Authorization": `Bearer ${getToken()}`});

const genericFetch = <T>(method: httpMethod, url: string, body?: any) =>
    new Promise<T>(async (resolve, reject) => {
        const isFile = body instanceof File;
        const formData = new FormData();

        const headers = getHeadersWithAuthorization();

        if (isFile)
            formData.append("file", body);
        else 
            headers.append("Content-Type", "application/json");

        try {
            const response = await fetch(url, {
                method,
                headers,
                body: isFile ? formData : JSON.stringify(body)
            });
            
            const { statusCode, payload } = await response.json() as ServerResponse<T>;

            if (statusCode / 100 === 2)
                resolve(payload);
            else
                reject(payload);
        } catch (exception) {
            reject("Could not connect to the server!");
        }
    });

export const httpGetFile = (url: string) =>
    new Promise<Blob>(async (resolve, reject) => {
        const headers = getHeadersWithAuthorization();

        try {
            const response = await fetch(url, {
                method: "GET",
                headers
            });

            resolve(await response.blob());
        } catch (exception) {
            reject(exception);
        }
    }); 