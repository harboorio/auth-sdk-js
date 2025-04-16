import { type AxiosInstance } from "axios";
import { type Util } from "./util";
import type {
    HarboorAuthHomeGetResponse,
    HarboorAuthOtpPostResponse,
    HarboorAuthOtpPostBody,
    HarboorAuthOtpPutResponse,
    HarboorAuthOtpPutBody,
} from "./schema/index";

export const client: AxiosInstance;
export const sdk: HarboorAuthSdk;

interface HarboorAuthSdk {
    util: Util;
    client: AxiosInstance;
    get: () => Promise<HarboorAuthHomeGetResponse>;
    otp: {
        post: (json: HarboorAuthOtpPostBody) => Promise<HarboorAuthOtpPostResponse>;
        put: (json: HarboorAuthOtpPutBody) => Promise<HarboorAuthOtpPutResponse>;
    };
}
