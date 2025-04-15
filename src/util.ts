export interface Util {
    formDataToJson: <T extends Record<string, unknown>>(formData: FormData) => T;
}

export const util: Util = {
    formDataToJson,
};

function formDataToJson<T extends Record<string, unknown>>(formData: FormData) {
    const json: Record<string, unknown> = {};
    for (const pair of formData.entries()) {
        const k = pair[0] as string;

        if (k in json) {
            if (!Array.isArray(json[k])) {
                json[k] = [json[k]];
            }

            (json[k] as unknown[]).push(pair[1]);
        } else {
            json[k] = pair[1];
        }
    }
    return json as T;
}
