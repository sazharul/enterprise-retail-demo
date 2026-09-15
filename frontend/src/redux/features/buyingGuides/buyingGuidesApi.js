import {baseApi} from "../../api/baseApi";

const buyingGuidesApi = baseApi.injectEndpoints({
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
        getBuyingGuides: builder.query({
            query: () => ({
                url: "buying-guide",
                method: "GET",
            }),
        }),
    }),
});

export const {useGetBuyingGuidesQuery} = buyingGuidesApi;
