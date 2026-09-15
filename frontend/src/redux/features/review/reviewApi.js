import {baseApi} from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviewProductWise: builder.mutation({
            query: (data) => {
                return {
                    url: "get-review-product-wise",
                    method: "POST",
                    body: data,
                };
            },
            providesTags: ["Reviews"],
        }),
        reviewHelpful: builder.mutation({
            query: (data) => {
                return {
                    url: "store-review-helpful",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["Reviews"],
        }),
        reviewImages: builder.mutation({
            query: (data) => ({
                url: "get-review-all-images",
                method: "POST",
                body: data,
            }),
        }),
        submitProductReview: builder.mutation({
            query: (data) => {
                return {
                    url: "product-review",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["Reviews"],
        }),
        myReviews: builder.query({
            query: (sort) => ({
                url: `my-reviews?sort=${sort}`,
                method: "GET",
            }),
            providesTags: ["Reviews"],
        }),
    }),
});

export const {useReviewHelpfulMutation, useReviewImagesMutation, useGetReviewProductWiseMutation, useSubmitProductReviewMutation, useMyReviewsQuery} = reviewApi;
