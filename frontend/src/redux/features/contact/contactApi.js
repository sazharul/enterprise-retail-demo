import {baseApi} from "../../api/baseApi";
import {nodeBaseApi} from "../../api/nodeBaseApi";

const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        contact: builder.mutation({
            query: (data) => {
                return {
                    url: `contact-store`,
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

const contactSettingsApi = nodeBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getContact: builder.query({
            query: () => ({
                url: "/get-general-setting",
                method: "GET",
            }),
        }),
    }),
});

export const {useContactMutation} = contactApi;
export const {useGetContactQuery} = contactSettingsApi;
