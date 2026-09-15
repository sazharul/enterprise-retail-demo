import {baseApi} from "../../api/baseApi";

const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        home: builder.query({
            query: () => ({
                url: "get-home-web",
                method: "GET",
            }),
        }),
    }),
});

export const {useHomeQuery} = homeApi;
