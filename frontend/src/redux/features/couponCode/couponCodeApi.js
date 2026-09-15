import {baseApi} from "../../api/baseApi";

const couponCodeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCouponCode: builder.mutation({
            query: (data) => {
                return {
                    url: `coupon`,
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

export const {useGetCouponCodeMutation} = couponCodeApi;
