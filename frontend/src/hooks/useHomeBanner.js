import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useHomeBanner = () => {
    const {data: bannerData, isLoading, isError, error} = useQuery({
        queryKey: ["banner"],
        queryFn: async () => {
            try {
                const res = await axios.get(`getSlider`);
                return res.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || "Failed to fetch banner data"
                );
            }
        },
    });

    return {bannerData, isLoading, isError, error};
};

export default useHomeBanner;
