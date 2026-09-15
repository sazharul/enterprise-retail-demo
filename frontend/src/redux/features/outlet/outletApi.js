import {baseApi} from "../../api/baseApi";

const outletApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //   offerProducts: builder.mutation({
        //         query: (data) => {
        //             return {
        //                 url: `offer-products`,
        //                 method: "POST",
        //                 body: data,
        //             };
        //         },
        //     }),
        getOutlet: builder.query({
            query: () => ({
                url: "get-outlet",
                method: "GET",
            }),
        }),
    }),
});

export const {useGetOutletQuery} = outletApi;
