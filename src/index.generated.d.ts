import { type AxiosInstance } from "axios";
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
    get: () => Promise<HarboorAuthHomeGetResponse>;
    otp: {
        post: (json: HarboorAuthOtpPostBody) => Promise<HarboorAuthOtpPostResponse>;
        put: (json: HarboorAuthOtpPutBody) => Promise<HarboorAuthOtpPutResponse>;
    };
}
