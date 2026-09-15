import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useHomeCampaignMultipleBanner = () => {
    const {
        data: HomeCampaignMultipleBanner = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["HomeCampaignMultipleBanner"],
        queryFn: async () => {
            try {
                const res = await axios.get(`banner_image`);
                if (res.data.success === true) {
                    return res.data.data;
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to fetch category data");
            }
        },
    });

    return {HomeCampaignMultipleBanner, isLoading, isError, error};
};

export default useHomeCampaignMultipleBanner;
