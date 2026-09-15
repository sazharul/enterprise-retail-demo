import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useBeautyAdviceBlog = () => {
    const {data: blogData = [], isLoading, isError, error} = useQuery({
        queryKey: ["blogData"],
        queryFn: async () => {
            try {
                const res = await axios.get(`blogs`);
                return res.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || "Failed to fetch banner data"
                );
            }
        },
    });

    return {blogData, isLoading, isError, error};
};

export default useBeautyAdviceBlog;
