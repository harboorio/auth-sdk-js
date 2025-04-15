import { type AxiosInstance } from "axios";
import type {
    HarboorAuthHomeGetResponse,
    HarboorAuthOtpPostResponse,
    HarboorAuthOtpPostBody,
    HarboorAuthOtpPutResponse,
    HarboorAuthOtpPutBody,
} from "./schema/index";

export type client = AxiosInstance;
export type sdk = HarboorAuthSdk;

interface HarboorAuthSdk {
    get: () => Promise<HarboorAuthHomeGetResponse>;
    otp: {
        post: (json: HarboorAuthOtpPostBody) => Promise<HarboorAuthOtpPostResponse>;
        put: (json: HarboorAuthOtpPutBody) => Promise<HarboorAuthOtpPutResponse>;
    };
}
