import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import {getTokenFromLocalStorage} from "../utilities/tokenHandler";

const useCartData = () => {
    const token = getTokenFromLocalStorage();
    const axiosSecure = useAxiosSecure();
    const {
        data: cartData = {},
        refetch: cartRefetch,
        isLoading: isCartLoading,
        isFetching: isCartFetching,
        isRefetching: isCartRefetching,
        isError: cartError,
        error: cartErrorDetail,
    } = useQuery({
        queryKey: ["cartData", token || "placeholder"],
        queryFn: async () => {
            // Return a placeholder value if the token is not available
            if (!token) {
                return {placeholder: true};
            }

            try {
                const res = await axiosSecure.get(`user/add-to-cart/list`);
                return res?.data;
            } catch (error) {
                // Log the entire error for more details
                console.error("Error fetching user data:", error);
                // Throw a clear error message based on the response
                throw new Error(error.response?.data?.message || "Failed to fetch user data");
            }
        },
        enabled: !!token,
    });

    return {
        cartData,
        cartRefetch,
        isCartFetching,
        isCartRefetching,
        isCartLoading,
        cartError,
        cartErrorDetail,
    };
};

export default useCartData;
