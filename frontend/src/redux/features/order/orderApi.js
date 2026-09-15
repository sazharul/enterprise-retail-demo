import {baseApi} from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        order: builder.mutation({
            query: (data) => {
                return {
                    url: `order-store`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["Cart", "order"],
        }),
        orderHistoryList: builder.query({
            query: () => ({
                url: "order-details",
                method: "GET",
            }),

            transformResponse: (response) => {
                response?.data?.orders?.data?.forEach((order) => {
                    let orderList = [];
                    if (order?.order_details !== null && order?.order_details?.length > 0) {
                        order?.order_details?.forEach((element) => {
                            if (element?.combo_id === null && element?.buy_get_id === null) {
                                orderList.push([element]);
                            } else {
                                if (element?.combo_id !== null) {
                                    if (orderList?.filter((el) => el?.filter((e) => e?.combo_id === element?.combo_id)?.length > 0)?.length === 0) {
                                        orderList.push(order?.order_details?.filter((el) => el?.combo_id === element?.combo_id));
                                    }
                                } else if (element?.buy_get_id !== null) {
                                    if (orderList?.filter((el) => el?.filter((e) => e?.buy_get_id === element?.buy_get_id)?.length > 0).length === 0) {
                                        orderList?.push(order?.order_details?.filter((el) => el?.buy_get_id === element?.buy_get_id));
                                    }
                                }
                            }
                        });
                    }
                    order.order_details = orderList;
                });

                // consolelog(response?.data?.orders);
                return response;
            },
            providesTags: ["order"],
        }),
        orderDetails: builder.query({
            query: (id) => ({
                url: `order-details/${id}`,
                method: "GET",
            }),
            providesTags: ["order"],
            transformResponse: (response) => {

                let orderList = [];
                if (response?.data?.order_details !== null && response?.data?.order_details?.length > 0) {
                    response?.data?.order_details?.forEach((element) => {
                        if (element?.combo_id === null && element?.buy_get_id === null) {
                            orderList.push([element]);
                        } else {
                            if (element?.combo_id !== null) {
                                if (orderList?.filter((el) => el?.filter((e) => e?.combo_id === element?.combo_id)?.length > 0)?.length === 0) {
                                    orderList.push(response?.data?.order_details?.filter((el) => el?.combo_id === element?.combo_id));
                                }
                            } else if (element?.buy_get_id !== null) {
                                if (orderList?.filter((el) => el?.filter((e) => e?.buy_get_id === element?.buy_get_id)?.length > 0).length === 0) {
                                    orderList?.push(response?.data?.order_details?.filter((el) => el?.buy_get_id === element?.buy_get_id));
                                }
                            }
                        }
                    });
                }
                response.data.order_details = orderList;
                return response;
            }
        }),
        cancelOrder: builder.mutation({
            query: (data) => {
                return {
                    url: `order-destroy/${data}`,
                    method: "POST",
                    // body: data,
                };
            },
            invalidatesTags: ["Cart", "order"],
        }),
        orderEdit: builder.query({
            query: (data) => {
                return {
                    url: `order-edit/${data}`,
                    method: "GET",
                    // body: data,
                };
            },
            invalidatesTags: ["Cart", "order"],
        }),
    }),
});

export const {useOrderMutation, useOrderHistoryListQuery, useOrderDetailsQuery, useCancelOrderMutation, useOrderEditQuery} = orderApi;
