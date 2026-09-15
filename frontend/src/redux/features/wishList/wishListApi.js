import {baseApi} from "../../api/baseApi";

const wishListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addToWishList: builder.mutation({
            query: (data) => {
                return {
                    url: `wishlist`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["WishList"],
        }),
        getWishList: builder.query({
            query: () => ({
                url: "getwishlist",
                method: "GET",
            }),
            providesTags: ["WishList"],
        }),
        // getWishList: builder.query({
        //     query: async () => {
        //         const response = await fetch({
        //             url: "getwishlist",
        //             method: "GET",
        //         });
        //         const responseData = await response.json();
        //         if (responseData.message === "Unauthenticated.") {
        //             return [];
        //         }
        //         return responseData;
        //     },
        //     providesTags: ["WishList"],
        // }),
    }),
});

export const {useAddToWishListMutation, useGetWishListQuery} = wishListApi;
