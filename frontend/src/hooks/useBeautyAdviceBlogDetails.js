import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useBeautyAdviceBlogDetails = (id) => {
    const {data: blogDetailsData = {}, isLoading, isError, error} = useQuery({
        queryKey: ["blogDetailsData", id || "placeholder"],
        queryFn: async () => {
            if (!id) {
                return {placeholder: true};
            }
            try {
                const res = await axios.get(`blogs/${id}`);
                return res.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || "Failed to fetch banner data"
                );
            }
        },
    });

    return {blogDetailsData, isLoading, isError, error};
};

export default useBeautyAdviceBlogDetails;
