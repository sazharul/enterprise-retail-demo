import {baseApi} from "../../api/baseApi";

const faqsApi = baseApi.injectEndpoints({
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
        getFAQ: builder.query({
            query: () => ({
                url: "faqs",
                method: "GET",
            }),
        }),
    }),
});

export const {useGetFAQQuery} = faqsApi;
