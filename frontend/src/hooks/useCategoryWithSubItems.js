import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useCategoryWithSubItems = () => {
    const {
        data: categoryData = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            try {
                const res = await axios.get(`category_level`);
                if (res.data.success === true) {
                    return res.data;
                } else {
                    throw new Error("Failed to fetch category data");
                }
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to fetch category data");
            }
        },
    });

    return {categoryData, isLoading, isError, error};
};

export default useCategoryWithSubItems;
