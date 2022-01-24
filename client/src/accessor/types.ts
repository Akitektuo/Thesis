export interface ServerResponse<T> {
    statusCode: number;
    payload: T;
}