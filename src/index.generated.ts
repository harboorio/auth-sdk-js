import { client, processHttpRequest, type SdkRequestOptions } from "@src/http-client";
import { util } from "@src/util";
import type {
    HarboorAuthHomeGetResponse,
    HarboorAuthOtpPostResponse,
    HarboorAuthOtpPostBody,
    HarboorAuthOtpPutResponse,
    HarboorAuthOtpPutBody,
} from "./schema/index";
import type { AxiosRequestConfig } from "axios";

client.defaults.withCredentials = true;
client.defaults.responseType = "json";
client.defaults.validateStatus = function () {
    return true;
};
client.defaults.baseURL = "";

const sdk = {
    util,
    client,
    get: async (opts?: Partial<AxiosRequestConfig> & SdkRequestOptions): Promise<HarboorAuthHomeGetResponse> => {
        return (await processHttpRequest("get", "/", opts)) as HarboorAuthHomeGetResponse;
    },
    otp: {
        post: async (
            json: HarboorAuthOtpPostBody,
            opts?: Partial<AxiosRequestConfig> & SdkRequestOptions,
        ): Promise<HarboorAuthOtpPostResponse> => {
            return (await processHttpRequest(
                "post",
                "/otp",
                Object.assign({}, opts ?? {}, { data: json }),
            )) as HarboorAuthOtpPostResponse;
        },
        put: async (
            json: HarboorAuthOtpPutBody,
            opts?: Partial<AxiosRequestConfig> & SdkRequestOptions,
        ): Promise<HarboorAuthOtpPutResponse> => {
            return (await processHttpRequest(
                "put",
                "/otp",
                Object.assign({}, opts ?? {}, { data: json }),
            )) as HarboorAuthOtpPutResponse;
        },
    },
};

export { sdk };
