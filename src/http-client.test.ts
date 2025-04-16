import { expect, test } from "vitest";
import { processHttpRequest } from "@src/http-client";

test("processHttpRequest", async () => {
    const url = "http://icanhazip.com";
    const startTime = Date.now();
    await processHttpRequest("get", url);
    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(1999);
});

test("processHttpRequest with min time threshold", async () => {
    const url = "http://icanhazip.com";
    const startTime = Date.now();
    await processHttpRequest("get", url, { sdkMinTimeThreshold: 2000 });
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThan(1999);
});
