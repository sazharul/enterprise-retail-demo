// import { useQuery } from "@tanstack/react-query";
// import { getFromLocalStorage } from "../utilities/getFromLocalStorage";
// import useAxiosSecure from "./useAxiosSecure";

// const useAuthUser = () => {
//     const token = getFromLocalStorage();
//     const axiosSecure = useAxiosSecure();

//     const {
//         data: userData ={},
//         refetch : userRefetch,
//         isLoading: isUserLoading,
//         isError: userError,
//         error: userErrorDetail,
//     } = useQuery({
//         queryKey: ["user", token || "placeholder"], // Use a placeholder if token is not available
//         queryFn: async () => {
//             if (!token) {
//                 return; // Return nothing if the token is not available
//             }

//             try {
//                 const res = await axiosSecure.get(`user`);
//                 return res.data;
//             } catch (error) {
//                 throw new Error(error.response?.data?.message || "Failed to fetch user data");
//             }
//         },
//         enabled: !!token, // Enable the query only if token exists
//     });

//     return {
//         userData,
//         userRefetch,
//         isUserLoading,
//         userError,
//         userErrorDetail,
//     };
// };

// export default useAuthUser;


import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import {getTokenFromLocalStorage} from "../utilities/tokenHandler";

const useAuthUser = () => {
    const token = getTokenFromLocalStorage();
    const axiosSecure = useAxiosSecure();
    const {
        data: userData = {},
        refetch: userRefetch,
        isLoading: isUserLoading,
        isError: userError,
        error: userErrorDetail,
    } = useQuery({
        queryKey: ["user", token || "placeholder"],
        queryFn: async () => {
            // Return a placeholder value if the token is not available
            if (!token) {
                return {placeholder: true};
            }

            try {
                const res = await axiosSecure.get(`profile`);
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
        userData,
        userRefetch,
        isUserLoading,
        userError,
        userErrorDetail,
    };
};

export default useAuthUser;
