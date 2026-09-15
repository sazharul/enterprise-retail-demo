import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {IoEyeOff, IoEyeSharp} from "react-icons/io5";
import Button from "../../../components/ui/Button";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import showToast from "../../../utilities/showToast";
import {useNavigate} from "react-router-dom";
import {Bars} from "react-loader-spinner";
import useAuthUser from "../../../hooks/useAuthUser";

const UpdatePassword = () => {
    const [isShowOldPassword, setIsShowOldPassword] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [isResponseLoading, setIsResponseLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {userData} = useAuthUser();

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm();
    const password = watch("new_password", "");

    const onSubmit = (data) => {
        setIsResponseLoading(true);
        axiosSecure
            .post("edit_pass", data)
            .then((res) => {
                if (res.data.status === true) {
                    setIsResponseLoading(false);
                    showToast(res?.data?.message);
                    navigate("/my-account/my-profile");
                } else {
                    setIsResponseLoading(false);
                    // Handle other cases if needed
                    showToast(res?.data?.data?.error, "error");
                }
            })
            .catch((error) => {
                setIsResponseLoading(false);
                let errorMessageList = error.response.data.data;
                // setErrorFromAPI(errorMessageList);
                showToast(errorMessageList?.error, "error");
            });
    };

    return (
        <>
            <div style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}} className="rounded-lg bg-white">
                <div className="py-3 ps-3 md:py-5 md:ps-8 border-b-[0.5px] border-[#ECECEC]">
                    <h3 className="text-black text-opacity-80 font-inter text-xl lg:text-2xl font-semibold leading-[33.5px]">My Profile</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="pt-3 px-3 md:mb-3 md:pt-6 md:px-8">
                    <p className="text-black font-Inter text-lg font-medium leading-normal mb-5">Edit Password</p>
                    <div className="md:w-10/12 lg:w-8/12">
                        {/* ---------- */}
                        {userData?.data?.is_google_login == 1 || (
                            <div className="mb-5">
                                <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Old Password
                                        {/* <FaStarOfLife size={6} className="text-[#F40F6F]" /> */}
                                    </span>
                                </label>
                                <span className="relative">
                                    <input
                                        {...register("old_password", {
                                            required: true,
                                            minLength: 8, // Minimum password length of 8 characters
                                        })}
                                        type={isShowOldPassword ? "text" : "password"}
                                        placeholder="Enter your old password"
                                        className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-[14px] font-normal leading-normal tracking-[-0.14px]"
                                    />
                                    {isShowOldPassword ? (
                                        <span onClick={() => setIsShowOldPassword(false)} className="absolute right-2 top-[3px] hover:cursor-pointer">
                                            <IoEyeSharp size={16} className="text-[#807D7E]"/>
                                        </span>
                                    ) : (
                                        <span onClick={() => setIsShowOldPassword(true)} className="absolute right-2 top-[3px] hover:cursor-pointer">
                                            <IoEyeOff size={16} className="text-[#807D7E]"/>
                                        </span>
                                    )}
                                </span>
                                {errors.old_password && errors.old_password.type === "minLength" && <p className="text-red-500">Password must be at least 8 characters long</p>}
                                {errors.old_password && errors.old_password.type === "required" && <span className="text-red-600">This field is required</span>}
                            </div>
                        )}

                        <div className="mb-5">
                            <label>
                                <span className="flex text-sm font-medium mb-3">
                                    New Password
                                    {/* <FaStarOfLife size={6} className="text-[#F40F6F]" /> */}
                                </span>
                            </label>
                            <span className="relative">
                                <input
                                    {...register("new_password", {
                                        required: true,
                                        minLength: 8, // Minimum password length of 8 characters
                                    })}
                                    type={isShowPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-[14px] font-normal leading-normal tracking-[-0.14px]"
                                />
                                {isShowPassword ? (
                                    <span onClick={() => setIsShowPassword(false)} className="absolute right-2 top-[3px] hover:cursor-pointer">
                                        <IoEyeSharp size={16} className="text-[#807D7E]"/>
                                    </span>
                                ) : (
                                    <span onClick={() => setIsShowPassword(true)} className="absolute right-2 top-[3px] hover:cursor-pointer">
                                        <IoEyeOff size={16} className="text-[#807D7E]"/>
                                    </span>
                                )}
                            </span>
                            {errors.new_password && errors.new_password.type === "minLength" && <p className="text-red-500">Password must be at least 8 characters long</p>}
                            {errors.new_password && errors.new_password.type === "required" && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="mb-6">
                            <label>
                                <span className="flex text-sm font-medium mb-3">
                                    Confirm Password
                                    {/* <FaStarOfLife size={6} className="text-[#F40F6F]" /> */}
                                </span>
                            </label>
                            <span className="relative">
                                <input
                                    {...register("c_password", {
                                        required: true,
                                        validate: (value) => value === password || "Passwords do not match", // Validation to compare with the 'password' field
                                    })}
                                    type={isShowConfirmPassword ? "text" : "password"}
                                    placeholder="Re-type your password"
                                    className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-[14px] font-normal leading-normal tracking-[-0.14px]"
                                />
                                {isShowConfirmPassword ? (
                                    <span onClick={() => setIsShowConfirmPassword(false)} className="absolute right-2 top-[3px] hover:cursor-pointer">
                                        <IoEyeSharp size={16} className="text-[#807D7E]"/>
                                    </span>
                                ) : (
                                    <span onClick={() => setIsShowConfirmPassword(true)} className="absolute right-2 top-[3px] hover:cursor-pointer">
                                        <IoEyeOff size={16} className="text-[#807D7E]"/>
                                    </span>
                                )}
                            </span>
                            {errors.c_password && <p className="text-red-500">{errors.c_password.message}</p>}
                            {errors.c_password && errors.c_password.type === "minLength" && <p className="text-red-500">Password must be at least 8 characters long</p>}
                            {errors.c_password && errors.c_password.type === "required" && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>

                    {isResponseLoading ? (
                        <div className="pb-10 ms-2">
                            <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
                        </div>
                    ) : (
                        <Button type="submit" className="border mb-10">
                            Change Password
                        </Button>
                    )}
                </form>
            </div>
        </>
    );
};

export default UpdatePassword;
