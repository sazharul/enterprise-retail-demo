import {baseApi} from "../../api/baseApi";

const pathaoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        city: builder.query({
            query: () => ({
                url: "get-city-list",
                method: "GET",
            }),
            // providesTags: ["Pathao"],
        }),
        zone: builder.query({
            query: (cityId) => ({
                url: `get-zone-list/${cityId}`,
                method: "GET",
            }),
            // invalidatesTags: ["Pathao"],
        }),
        area: builder.query({
            query: (zoneId) => ({
                url: `get-area-list/${zoneId}`,
                method: "GET",
            }),
            // invalidatesTags: ["Pathao"],
        }),
    }),
});

export const {useCityQuery, useZoneQuery, useAreaQuery} = pathaoApi;
