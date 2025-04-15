import { client, processHttpRequest } from "@src/http-client";
import { util } from "@src/util";
import type {
    HarboorAuthHomeGetResponse,
    HarboorAuthOtpPostResponse,
    HarboorAuthOtpPostBody,
    HarboorAuthOtpPutResponse,
    HarboorAuthOtpPutBody,
} from "./schema/index";

client.defaults.withCredentials = true;
client.defaults.responseType = "json";
client.defaults.validateStatus = function () {
    return true;
};
client.defaults.baseURL = "";

const sdk = {
    util: util,
    get: async (): Promise<HarboorAuthHomeGetResponse> => {
        return (await processHttpRequest("get", "/")) as HarboorAuthHomeGetResponse;
    },
    otp: {
        post: async (json: HarboorAuthOtpPostBody): Promise<HarboorAuthOtpPostResponse> => {
            return (await processHttpRequest("post", "/otp", { data: json })) as HarboorAuthOtpPostResponse;
        },
        put: async (json: HarboorAuthOtpPutBody): Promise<HarboorAuthOtpPutResponse> => {
            return (await processHttpRequest("put", "/otp", { data: json })) as HarboorAuthOtpPutResponse;
        },
    },
};

export { client, sdk };
