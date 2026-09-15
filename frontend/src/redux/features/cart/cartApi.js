import {baseApi} from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: (data) => {
                return {
                    url: `user/add-to-cart`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["Cart"],
        }),
        updateCart: builder.mutation({
            query: (data) => {
                return {
                    url: `user/update-cart/${data.id}`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["Cart"],
        }),
        removeFormCart: builder.mutation({
            query: (id) => {
                return {
                    url: `user/remove-form-cart/${id}`,
                    method: "POST",
                    // body: data,
                };
            },
            invalidatesTags: ["Cart"],
        }),
        cartList: builder.query({
            query: () => ({
                url: "user/add-to-cart/list",
                method: "GET",
            }),
            providesTags: ["Cart"],
        }),
    }),
});

export const {useAddToCartMutation, useUpdateCartMutation, useRemoveFormCartMutation, useCartListQuery} = cartApi;
