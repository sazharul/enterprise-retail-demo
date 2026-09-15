import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useNavItems = () => {
    const {data: navItems = {}, isLoading: isMenuDataLoading, refetch, isError, error} = useQuery({
        queryKey: ["navItems"],
        queryFn: async () => {
            try {
                const res = await axios.get("category_level");
                if (res.data.success === true) {
                    return res.data; // Returning the data if the request is successful
                } else {
                    throw new Error("Request was not successful");
                }
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || "Failed to fetch banner data"
                );
            }
        },
    });

    return {navItems, isMenuDataLoading, refetch, isError, error};
};

export default useNavItems;
