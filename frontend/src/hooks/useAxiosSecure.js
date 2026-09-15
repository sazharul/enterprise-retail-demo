import axios from "axios";
import {useNavigate} from "react-router-dom";
import {getTokenFromLocalStorage} from "../utilities/tokenHandler";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:8002/api"}/`,
    // baseURL: 'http://192.168.1.61/api/'
    // baseURL: "http://192.168.1.120:88/api/"
});
const useAxiosSecure = () => {
    const navigate = useNavigate();

    // request interceptor to add authorization header for every secure call to teh api
    axiosSecure.interceptors.request.use(
        function (config) {
            const token = getTokenFromLocalStorage();

            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        async (error) => {
            const status = error.response.status;

            // for 401 or 403 logout the user and move the user to the login
            if (status === 401 || status === 403) {
                // await logOut();
                localStorage.removeItem("authToken");
                navigate("/login-with-email");
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
