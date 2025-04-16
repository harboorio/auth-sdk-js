import { AxiosInstance } from 'axios';

interface Util {
    formDataToJson: <T extends Record<string, unknown>>(formData: FormData) => T;
}

interface HarboorAuthHomeGetResponse200 {
  name: string;
  version: string;
  [k: string]: unknown;
}

type HarboorAuthHomeGetResponse = HarboorAuthHomeGetResponse200
interface HarboorAuthOtpPostBody {
  credentialType: "email" | "phone";
  credential:
    | string
    | {
        country: string;
        num: string;
      };
}

interface HarboorAuthOtpPostResponse200 {
  success: boolean;
}

interface HarboorAuthOtpPostResponse400 {
  error: {
    code: string;
    message?: string;
  };
}

type HarboorAuthOtpPostResponse = HarboorAuthOtpPostResponse200 | HarboorAuthOtpPostResponse400
interface HarboorAuthOtpPutBody {
  otp: string;
}

interface HarboorAuthOtpPutResponse200 {
  success: boolean;
}

type HarboorAuthOtpPutResponse = HarboorAuthOtpPutResponse200

declare const client: AxiosInstance
declare const sdk: HarboorAuthSdk

interface HarboorAuthSdk {
    util: Util
    client: AxiosInstance
    get: () => Promise<HarboorAuthHomeGetResponse>
    otp: {
        post: (json: HarboorAuthOtpPostBody) => Promise<HarboorAuthOtpPostResponse>
        put: (json: HarboorAuthOtpPutBody) => Promise<HarboorAuthOtpPutResponse>
    },
}

export { client, sdk };
export type { HarboorAuthHomeGetResponse, HarboorAuthOtpPostBody, HarboorAuthOtpPostResponse, HarboorAuthOtpPutBody, HarboorAuthOtpPutResponse, HarboorAuthSdk };
