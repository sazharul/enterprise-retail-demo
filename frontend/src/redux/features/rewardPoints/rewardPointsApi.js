import {baseApi} from "../../api/baseApi";
import {nodeBaseApi} from "../../api/nodeBaseApi";

const rewardPointsNodeApi = nodeBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRewardPointsData: builder.query({
            query: () => ({
                url: "/getRewardData",
                method: "GET",
            }),
        }),
    }),
});

const rewardPointsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRewardPointsHistory: builder.query({
            query: () => ({
                url: "reward-history",
                method: "GET",
            }),
        }),
    }),
});

export const {useGetRewardPointsDataQuery} = rewardPointsNodeApi;
export const {useGetRewardPointsHistoryQuery} = rewardPointsApi;
