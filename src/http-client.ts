import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export const client: AxiosInstance = axios.create();

export async function processHttpRequest(method: string, url: string, endpointConfig?: Partial<AxiosRequestConfig>) {
    const config: AxiosRequestConfig = Object.assign({}, endpointConfig ?? {}, {
        method,
        url,
    });

    try {
        const response = await client(config);
        return response.data;
    } catch (error) {
        if (error.response) {
            // the server responded with a status that fails in validateStatus
            return error.response.data;
        } else if (error.request) {
            // no response received, error.request is an instance of XMLHttpRequest
            console.error(error);
            return { error: { code: "no_response" } };
        } else {
            // request setup is incorrect
            console.error(error);
            return { error: { code: "invalid_request_setup", message: error.message } };
        }
    }
}
