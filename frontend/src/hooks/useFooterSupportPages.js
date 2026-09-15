import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useFooterSupportPages = () => {
    const {
        data: FooterSupportData = {},
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["footerSupportData"],
        queryFn: async () => {
            try {
                const res = await axios.get(`page`);
                if (res.data.success === true) {
                    return res.data;
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to fetch category data");
            }
        },
    });

    return {FooterSupportData, isLoading, isError, error};
};

export default useFooterSupportPages;
