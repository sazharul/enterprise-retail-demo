import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useSearchProducts = (searchParams) => {
    const {
        data: searchedData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["searchProducts", searchParams],
        queryFn: async () => {
            try {
                const res = await axios.get("get_all_search_products", {
                    params: searchParams,
                });
                return res.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || "Failed to fetch data"
                );
            }
        },
    });

    return {searchedData, isLoading, isError};
};

export default useSearchProducts;
