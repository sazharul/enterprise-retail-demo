import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {NODE_API_URL} from "../../config/api";

export const nodeBaseApi = createApi({
    reducerPath: "nodeBaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${NODE_API_URL}/`,
    }),
    endpoints: () => ({}),
});
