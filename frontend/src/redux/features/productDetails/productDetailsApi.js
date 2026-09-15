import {baseApi} from "../../api/baseApi";

const productDetailsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        productDetails: builder.mutation({
            query: (data) => {
                return {
                    url: `/product-detail/${data?.id}`,
                    //url: `product-detail/${data?.id}`,
                    method: "POST",
                    body: {user_id: data?.user_id},
                };
            },
            // providesTags: ["ProductDetails"],
        }),
    }),
});

export const {useProductDetailsMutation} = productDetailsApi;
