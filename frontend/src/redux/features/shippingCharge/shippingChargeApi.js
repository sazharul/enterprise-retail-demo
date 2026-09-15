import {nodeBaseApi} from "../../api/nodeBaseApi";

const shippingChargeApi = nodeBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        shippingCharge: builder.query({
            query: () => ({
                url: "/getShippingCharge",
                method: "GET",
            }),
        }),

    }),
});

export const {useShippingChargeQuery} = shippingChargeApi;
