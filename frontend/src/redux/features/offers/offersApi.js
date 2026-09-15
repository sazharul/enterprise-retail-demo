import {nodeBaseApi} from "../../api/nodeBaseApi";

const offersApi = nodeBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        offerProducts: builder.mutation({
            query: (data) => {
                return {
                    url: `/offer-products`,
                    method: "POST",
                    body: data,
                };
            },
        }),
        offerProductsByCategory: builder.mutation({
            query: (data) => {
                return {
                    url: `offer-cat-products?page=${data.page_number}`,
                    method: "POST",
                    body: data,
                };
            },
        }),
        offers: builder.query({
            query: () => ({
                url: "/get-available-offers",
                method: "GET",
            }),
        }),
    }),
});

export const {useOffersQuery, useOfferProductsMutation, useOfferProductsByCategoryMutation} = offersApi;
