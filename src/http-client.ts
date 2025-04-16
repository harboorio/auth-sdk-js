import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export interface SdkRequestOptions {
    sdkMinTimeThreshold?: number;
}

export const client: AxiosInstance = axios.create();

const requestOptionsProps = ["sdkMinTimeThreshold"];

export async function processHttpRequest(
    method: string,
    url: string,
    requestOptions?: Partial<AxiosRequestConfig> & SdkRequestOptions,
) {
    const minTimeThreshold = requestOptions?.sdkMinTimeThreshold ?? 0;
    const startTime = minTimeThreshold > 0 ? Date.now() : 0;
    const axiosOptions = requestOptions
        ? Object.keys(requestOptions)
              .filter((prop) => !requestOptionsProps.includes(prop))
              .reduce(
                  (memo, prop) =>
                      Object.assign({}, memo, { [prop]: requestOptions[prop as keyof typeof requestOptions] }),
                  {},
              )
        : {};
    const config: AxiosRequestConfig = Object.assign({}, axiosOptions ?? {}, {
        method,
        url,
    });

    try {
        const response = await client(config);

        if (minTimeThreshold > 0) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < minTimeThreshold) {
                const remainingTime = minTimeThreshold - elapsedTime;
                await new Promise((resolve) => setTimeout(resolve, remainingTime));
            }
        }

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
