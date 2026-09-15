import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useMyOrder = () => {
    const {data: orderData = [], isLoading, isError, error} = useQuery({
        queryKey: ["orderData"],
        queryFn: async () => {
            try {
                const res = await axios.get(`my_order_list`);
                return res.data.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || "Failed to fetch banner data"
                );
            }
        },
    });

    return {orderData, isLoading, isError, error};
};

export default useMyOrder;
