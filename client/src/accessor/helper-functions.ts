import { getToken } from "helpers/token-helper";
import { ServerResponse } from "./types";

type httpMethod = "GET" | "POST" | "PUT" | "DELETE"; 

export const httpGet = <T>(url: string, body?: any) => genericFetch<T>("GET", url, body);

export const httpPost = <T>(url: string, body?: any) => genericFetch<T>("POST", url, body);

export const httpPut = <T>(url: string, body?: any) => genericFetch<T>("PUT", url, body);

export const httpDelete = <T>(url: string, body?: any) => genericFetch<T>("DELETE", url, body);

const genericFetch = <T>(method: httpMethod, url: string, body?: any) =>
    new Promise<T>(async (resolve, reject) => {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(body)
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