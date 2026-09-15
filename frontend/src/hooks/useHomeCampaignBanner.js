import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useHomeCampaignBanner = () => {
    const {data: campaignBannerData, isLoading, isError, error} = useQuery({
        queryKey: ["campaignBanner"],
        queryFn: async () => {
            try {
                const res = await axios.get(`forCampBanner`);
                return res.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || "Failed to fetch banner data"
                );
            }
        },
    });

    return {campaignBannerData, isLoading, isError, error};
};

export default useHomeCampaignBanner;
