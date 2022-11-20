import {
    IFilter,
    ICondition,
    IRule,
    ITrigger,
    AppHook,
    WhenTrigger,
    IAsyncFilter,
} from "../src";


describe("test appHook async", () => {
    it("should call async filter ok", async () => {

        const apphook = new AppHook();
        expect(apphook.hasAnyFilters("get_test_name")).toBe(false);

        const rule: IRule = {
            condition: {
                doCheck: () => true,
            },
            args: [],
        };

        // Single layer filter
        const filter1: IAsyncFilter<string> = apphook.addFilterAsync<string>(
            "get_test_name",
            async (defaultValue) => defaultValue + " Filtered1",
            [],
            rule
        );
        expect(filter1.hook).toBe("get_test_name");

        const filterd1 = await apphook.applyFiltersAsync<string>("get_test_name", "Test Name");
        expect(filterd1).toBe("Test Name Filtered1");

        // Double layer filter
        const filter2: IAsyncFilter<any> = apphook.addFilterAsync(
            "get_test_name",
            async (defaultValue) => defaultValue + " Filtered2",
            [],
            rule
        );
        expect(filter2.hook).toBe("get_test_name");


        const filterd2 = await apphook.applyFiltersAsync<string>("get_test_name", "Test Name");
        expect(filterd2).toBe("Test Name Filtered2 Filtered1");

        // third layer filter
        const filter3: IAsyncFilter<string> = apphook.addFilterAsync(
            "get_test_name",
            async (defaultValue) => defaultValue + " Filtered3",
            [],
            rule,
            999
        );
        expect(filter3.hook).toBe("get_test_name");

        const filterd3 = await apphook.applyFiltersAsync<string>("get_test_name", "Test Name");
        expect(filterd3).toBe("Test Name Filtered2 Filtered1 Filtered3");

        // delete filter
        apphook.removeFilterAsync(filter1);

        const filterd4 = await apphook.applyFiltersAsync("get_test_name", "Test Name");
        expect(filterd4).toBe("Test Name Filtered2 Filtered3");

        expect(apphook.hasAnyAsyncFilters("get_test_name")).toBe(true);
    })


});
