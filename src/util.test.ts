import { expect, test } from "vitest";
import { util } from "@src/util";

interface RequestBody {
    name: "Abc";
}

test("form data to json", () => {
    const form1 = new FormData();
    form1.append("abc", "1");
    expect(util.formDataToJson(form1)).toStrictEqual({ abc: "1" });

    form1.append("prefs", "1");
    form1.append("prefs", "2");
    expect(util.formDataToJson<RequestBody>(form1)).toStrictEqual({ abc: "1", prefs: ["1", "2"] });
});
