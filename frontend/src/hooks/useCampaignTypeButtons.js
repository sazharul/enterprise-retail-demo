import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useCampaignTypeButtons = () => {
    const {data: buttonsData = {}, isLoading, error} = useQuery({
        queryKey: ["buttons"],
        // enabled: !loading,
        queryFn: async () => {
            try {
                const res = await axios.get(`campaign_type`);
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to fetch campaign types");
            }
        },
    });

    return [buttonsData, isLoading, error];
};

export default useCampaignTypeButtons;
