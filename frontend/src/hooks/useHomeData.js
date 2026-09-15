import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {NODE_API_URL} from "../config/api";

const useHomeData = () => {
    const {
        data: homeData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["homeData"],
        queryFn: async () => {
            try {
                const res = await axios.get(`${NODE_API_URL}/get-home-web`);
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to fetch banner data");
            }
        },
    });

    return {homeData, isLoading, isError, error};
};

export default useHomeData;
