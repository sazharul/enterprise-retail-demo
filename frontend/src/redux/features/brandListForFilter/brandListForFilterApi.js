import {nodeBaseApi} from "../../api/nodeBaseApi";

const brandListForFilterApi = nodeBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        brandListForFilter: builder.query({
            query: () => ({
                url: "/brand-format",
                method: "GET",
            }),
        }),
        topBrandListForFilter: builder.query({
            query: () => ({
                url: "/top-brand",
                method: "GET",
            }),
        }),
    }),
});

export const {useBrandListForFilterQuery, useTopBrandListForFilterQuery} = brandListForFilterApi;
