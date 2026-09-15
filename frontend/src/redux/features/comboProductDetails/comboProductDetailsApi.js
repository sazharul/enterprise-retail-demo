import {baseApi} from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getComboProductList: builder.mutation({
            query: (data) => {
                return {
                    url: `combo-products`,
                    method: "POST",
                    body: data,
                };
            },
            // invalidatesTags: ["Cart"],
        }),

        getComboProductDetails: builder.query({
            query: (id) => {
                return {
                    url: `combo-product-detail/${id}`,
                    method: "GET",
                };
            },
            // providesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetComboProductListMutation,
    useGetComboProductDetailsQuery,
} = cartApi;
