import {toast} from "sonner";
import {baseApi} from "../../api/baseApi";
import {setUser} from "./authSlice";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => {
                return {
                    url: "login",
                    method: "POST",
                    body: userInfo,
                }
            },
            //   invalidatesTags: ["User"],
            onSuccess: (result, variables, api, {dispatch}) => {
                const {user, token} = result;
                // Dispatch setUser action to update authSlice with user and token
                dispatch(setUser({user, token}));
                // Show a success toast message
                toast.success("Login successful");
            },
        }),
        userData: builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
    }),
});

export const {useLoginMutation, useUserDataQuery} = authApi;
