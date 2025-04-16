import { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { type Util } from "./util";
import type {
    HarboorAuthHomeGetResponse,
    HarboorAuthOtpPostResponse,
    HarboorAuthOtpPostBody,
    HarboorAuthOtpPutResponse,
    HarboorAuthOtpPutBody,
} from "./schema/index";
import type { SdkRequestOptions } from "./http-client";

export const client: AxiosInstance;
export const sdk: HarboorAuthSdk;

export interface HarboorAuthSdk {
    util: Util;
    client: AxiosInstance;
    get: (opts?: Partial<AxiosRequestConfig> & SdkRequestOptions) => Promise<HarboorAuthHomeGetResponse>;
    otp: {
        post: (
            json: HarboorAuthOtpPostBody,
            opts?: Partial<AxiosRequestConfig> & SdkRequestOptions,
        ) => Promise<HarboorAuthOtpPostResponse>;
        put: (
            json: HarboorAuthOtpPutBody,
            opts?: Partial<AxiosRequestConfig> & SdkRequestOptions,
        ) => Promise<HarboorAuthOtpPutResponse>;
    };
}

export type {
    HarboorAuthHomeGetResponse,
    HarboorAuthOtpPostResponse,
    HarboorAuthOtpPostBody,
    HarboorAuthOtpPutResponse,
    HarboorAuthOtpPutBody,
};
