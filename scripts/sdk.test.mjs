import {test, expect} from "vitest";
import {renderSegmentRecursive, renderSchema} from "./sdk.mjs";
import os from "node:os";

const indent = '    '
const lnbr = os.EOL
const schema1 = {
    paths: {
        '/': {
            get: {}
        },
        '/otp': {
            post: {
                requestBody: {}
            },
            put: {
                requestBody: {}
            }
        },
        '/otp/request': {
            post: {
                requestBody: {}
            }
        }
    }
}
const schema2 = {
    paths: {
        '/': {
            get: {}
        },
        '/otp': {
            post: {
                operationId: 'OtpPost',
                requestBody: {}
            },
            put: {
                requestBody: {}
            }
        },
        '/otp/request': {
            post: {
                requestBody: {}
            }
        },
        '/session': {
            get: {}
        }
    }
}

test('renderSegmentRecursive', () => {
    const sample1 = ['otp']
    const result1 = renderSegmentRecursive(sample1)
    expect(result1).toBe(`otp: {${lnbr}},${lnbr}`)

    const sample2 = ['otp', 'request']
    const result2 = renderSegmentRecursive(sample2)
    expect(result2).toBe(`otp: {${lnbr}${indent}request: {${lnbr}${indent}},${lnbr}},${lnbr}`)

    const sample3 = ['otp', 'request']
    const result3 = renderSegmentRecursive(sample3, { level: 0, schema: schema1, path: '/', processedPaths: [], collectedTypes: [], tmodule: '' })
    const expect3 = `otp: {
    post: async (json: HarboorAuthOtpPostBody, opts?: Partial<AxiosRequestConfig> & SdkRequestOptions): Promise<HarboorAuthOtpPostResponse> => {
        return (await processHttpRequest('post', '/otp', Object.assign({}, opts ?? {}, { data: json }))) as HarboorAuthOtpPostResponse
    },
    put: async (json: HarboorAuthOtpPutBody, opts?: Partial<AxiosRequestConfig> & SdkRequestOptions): Promise<HarboorAuthOtpPutResponse> => {
        return (await processHttpRequest('put', '/otp', Object.assign({}, opts ?? {}, { data: json }))) as HarboorAuthOtpPutResponse
    },
    request: {
        post: async (json: HarboorAuthOtpRequestPostBody, opts?: Partial<AxiosRequestConfig> & SdkRequestOptions): Promise<HarboorAuthOtpRequestPostResponse> => {
            return (await processHttpRequest('post', '/otp/request', Object.assign({}, opts ?? {}, { data: json }))) as HarboorAuthOtpRequestPostResponse
        },
    },
},
`
    expect(result3).toBe(expect3)
})

test('renderSchema', () => {
    const result1 = renderSchema(schema2)
    const expect1 = `const sdk = {
    util,
    client,
    get: async (opts?: Partial<AxiosRequestConfig> & SdkRequestOptions): Promise<HarboorAuthHomeGetResponse> => {
        return (await processHttpRequest('get', '/', opts)) as HarboorAuthHomeGetResponse
    },
    otp: {
        post: async (json: HarboorAuthOtpPostBody, opts?: Partial<AxiosRequestConfig> & SdkRequestOptions): Promise<HarboorAuthOtpPostResponse> => {
            return (await processHttpRequest('post', '/otp', Object.assign({}, opts ?? {}, { data: json }))) as HarboorAuthOtpPostResponse
        },
        put: async (json: HarboorAuthOtpPutBody, opts?: Partial<AxiosRequestConfig> & SdkRequestOptions): Promise<HarboorAuthOtpPutResponse> => {
            return (await processHttpRequest('put', '/otp', Object.assign({}, opts ?? {}, { data: json }))) as HarboorAuthOtpPutResponse
        },
        request: {
            post: async (json: HarboorAuthOtpRequestPostBody, opts?: Partial<AxiosRequestConfig> & SdkRequestOptions): Promise<HarboorAuthOtpRequestPostResponse> => {
                return (await processHttpRequest('post', '/otp/request', Object.assign({}, opts ?? {}, { data: json }))) as HarboorAuthOtpRequestPostResponse
            },
        },
    },
    session: {
        get: async (opts?: Partial<AxiosRequestConfig> & SdkRequestOptions): Promise<HarboorAuthSessionGetResponse> => {
            return (await processHttpRequest('get', '/session', opts)) as HarboorAuthSessionGetResponse
        },
    },
}
`
    expect(result1).toStrictEqual(expect1)
})
