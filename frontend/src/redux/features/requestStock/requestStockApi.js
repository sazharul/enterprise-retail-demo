import {baseApi} from "../../api/baseApi";

const requestStockApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        stockRequest: builder.mutation({
            query: (data) => {
                return {
                    url: `stock-request`,
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

export const {useStockRequestMutation} = requestStockApi;
