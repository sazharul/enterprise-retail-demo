import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useBillingDetailsCity = () => {
    const {data: cityList = [], isLoading: cityListLoading, isError, error} = useQuery({
        queryKey: ["getCityList"],
        queryFn: async () => {
            try {
                const res = await axios.get(`get-city-list`);
                // return res.data;
                if (res.data.success === true) {
                    const result = res.data.data.map((item) => ({
                        value: item.city_id,
                        label: item.city_name,
                    }));
                    return result
                }
            } catch (error) {
                throw new Error(
                    error.response?.data?.message || "Failed to fetch banner data"
                );
            }
        },
    });

    return {cityList, cityListLoading, isError, error};
};

export default useBillingDetailsCity;
