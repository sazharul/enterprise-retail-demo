import {baseApi} from "../../api/baseApi";

const notificationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getNotifications: builder.query({
            query: () => ({
                url: "get-notification",
                method: "GET",
            }),
        }),
        storeToken: builder.mutation({
            query: (data) => {
                return {
                    url: `store-token`,
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

export const {useGetNotificationsQuery, useStoreTokenMutation} = notificationsApi;
