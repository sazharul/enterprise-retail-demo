import {baseApi} from "../../api/baseApi";

const offersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        whoWeAre: builder.query({
            query: () => ({
                url: "whoweare",
                method: "GET",
            }),
        }),
        termCondition: builder.query({
            query: () => ({
                url: "termcondition",
                method: "GET",
            }),
        }),
        privacyPolicy: builder.query({
            query: () => ({
                url: "privacypolicy",
                method: "GET",
            }),
        }),
        delationPolicy: builder.query({
            query: () => ({
                url: "delationpolicy",
                method: "GET",
            }),
        }),
        cancellationPolicy: builder.query({
            query: () => ({
                url: "cancellationpolicy",
                method: "GET",
            }),
        }),
        returnreFund: builder.query({
            query: () => ({
                url: "returnrefund",
                method: "GET",
            }),
        }),
        shippingPolicy: builder.query({
            query: () => ({
                url: "shipping-policy",
                method: "GET",
            }),
        }),
    }),
});

export const {useWhoWeAreQuery, useTermConditionQuery, usePrivacyPolicyQuery, useDelationPolicyQuery, useCancellationPolicyQuery, useReturnreFundQuery, useShippingPolicyQuery} = offersApi;
