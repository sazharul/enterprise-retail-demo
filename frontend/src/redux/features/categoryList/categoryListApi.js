import {baseApi} from "../../api/baseApi";

const categoryListApi = baseApi.injectEndpoints({
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
        categoryList: builder.query({
            query: () => ({
                url: "category",
                method: "GET",
            }),
        }),
    }),
});

export const {useCategoryListQuery} = categoryListApi;
