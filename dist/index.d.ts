import { AxiosInstance } from 'axios';

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

type client = AxiosInstance
type sdk = HarboorAuthSdk

interface HarboorAuthSdk {
    get: () => Promise<HarboorAuthHomeGetResponse>
    otp: {
        post: (json: HarboorAuthOtpPostBody) => Promise<HarboorAuthOtpPostResponse>
        put: (json: HarboorAuthOtpPutBody) => Promise<HarboorAuthOtpPutResponse>
    },
}

export type { client, sdk };
