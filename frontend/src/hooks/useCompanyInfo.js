import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useCompanyInfo = () => {
    const {data: companyInfo, isLoading, isError} = useQuery({
        queryKey: ["companyInfo"],
        // enabled: !loading,
        queryFn: async () => {
            try {
                const res = await axios.get(`company_information`);
                if (res.data.success === true) {
                    return res.data;
                } else {
                    throw new Error("Failed to fetch company information");
                }
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || "Failed to fetch company information"
                );
            }
        },
    });

    if (isLoading) {
        // Handle loading state
        return {companyInfo: undefined, isLoading: true, isError: false};
    }

    if (isError || !companyInfo) {
        // Handle error state or undefined companyInfo
        return {companyInfo: undefined, isLoading: false, isError: true};
    }

    // Data loaded successfully
    return {companyInfo, isLoading: false, isError: false};
};

export default useCompanyInfo;
