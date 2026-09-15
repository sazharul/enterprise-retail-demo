import {useQuery} from "@tanstack/react-query";
import {getTokenFromLocalStorage} from "../utilities/tokenHandler";
import useAxiosSecure from "./useAxiosSecure";

const useUserAddress = () => {
    const token = getTokenFromLocalStorage();
    const axiosSecure = useAxiosSecure();

    const {
        data: userAddress = {},
        refetch: refetchAddress,
        isLoading: isUserAddressLoading,
        isError: userError,
        error: userErrorDetail,
    } = useQuery({
        queryKey: ["userAddress", token || "placeholder"], // Use a placeholder if token is not available
        queryFn: async () => {
            if (!token) {
                return {placeholder: true};
            }

            try {
                const res = await axiosSecure.get(`get_address`);
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to fetch user data");
            }
        },
        enabled: !!token, // Enable the query only if token exists
    });

    return {
        userAddress,
        refetchAddress,
        isUserAddressLoading,
        userError,
        userErrorDetail,
    };
};

export default useUserAddress;
