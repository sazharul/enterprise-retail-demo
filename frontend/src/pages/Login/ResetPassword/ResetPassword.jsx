import {Divider} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {FaStarOfLife} from "react-icons/fa";
import {IoEyeOff, IoEyeSharp} from "react-icons/io5";
import {Bars} from "react-loader-spinner";
import {Link, ScrollRestoration, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../assets/logo/logo.png";
import {addTokenToLocalStorage, getTokenFromLocalStorage} from "../../../utilities/tokenHandler";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ResetPassword = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [isEmailErrorFromApi, setIsEmailErrorFromApi] = useState("");
    const [isPhoneErrorFromApi, setIsPhoneErrorFromApi] = useState("");
    const [isResponseLoading, setIsResponseLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm();

    const token = getTokenFromLocalStorage();

    const axiosSecure = useAxiosSecure();
    const resetEmail = sessionStorage.getItem("email");
    useEffect(() => {
        setValue("email", resetEmail || "");
    }, [setValue, resetEmail]);

    const password = watch("new_password");
    const navigate = useNavigate();
    const onSubmit = (data) => {
        setIsResponseLoading(true);
        axiosSecure
            .post("change_password", data)
            .then((res) => {
                if (res.data.status === true) {
                    setIsResponseLoading(false);
                    addTokenToLocalStorage(res.data.data.token);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Registration successful",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/");
                } else {
                    setIsResponseLoading(false);
                    // Handle other cases if needed
                }
            })
            .catch((error) => {
                setIsResponseLoading(false);
                const emailError = error?.response?.data?.data?.email;
                const phoneError = error?.response?.data?.data?.phone;
                if (emailError) {
                    setIsEmailErrorFromApi(...emailError);
                }
                if (phoneError) {
                    setIsPhoneErrorFromApi(...phoneError);
                }
            });
    };
    return (
        <div className="mx-2">
            <div
                style={{boxShadow: "0px 0px 16px 0px rgba(228, 237, 240, 0.80)"}}
                className="max-w-[520px] flex-shrink-0 rounded-[4px] bg-white  mx-auto mt-3 lg:mt-9 mb-3 lg:mb-20"
            >
                <div className="pt-4 lg:pt-8 pb-3 lg:pb-6 border-b-[0.5px]">
                    <img className="w-[175.997px] mx-auto" src={logo} alt="logo"/>
                </div>
                <div className="pt-2 px-2 pb-2 xs:px-5 md:pt-3 md:px-7 md:pb-5 lg:pt-6 lg:px-[60px] lg:pb-[40px]">
                    <h3 className="mb-3 lg:mb-6 text-black font-inter font-medium text-2xl lg:text-4xl leading-normal">Reset Your Password</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>

                            {/* <div className="mb-5">
                                <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Email Address
                                        <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                    </span>
                                </label>
                                <input
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for basic email format validation
                                    })}
                                    onChange={() => setIsEmailErrorFromApi("")}
                                    readOnly={true}
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black  text-[14px] font-normal leading-normal  tracking-[-0.14px]"
                                />
                                {isEmailErrorFromApi && <p className="text-red-500">{isEmailErrorFromApi}</p>}
                                {errors.email && errors.email.type === "pattern" && (
                                    <p className="text-red-500">Please enter a valid email address</p>
                                )}
                                {errors.email && errors.email.type === "required" && <span className="text-red-600">This field is required</span>}
                               
                            </div> */}
                            <div className="mb-5">
                                <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Password
                                        <FaStarOfLife size={6} className="text-[#F40F6F]"/>
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
                                {errors.new_password && errors.new_password.type === "minLength" && (
                                    <p className="text-red-500">Password must be at least 8 characters long</p>
                                )}
                                {errors.new_password && errors.new_password.type === "required" && (
                                    <span className="text-red-600">This field is required</span>
                                )}
                            </div>
                            <div className="mb-6">
                                <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Confirm Password
                                        <FaStarOfLife size={6} className="text-[#F40F6F]"/>
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
                                        <span
                                            onClick={() => setIsShowConfirmPassword(false)}
                                            className="absolute right-2 top-[3px] hover:cursor-pointer"
                                        >
                                            <IoEyeSharp size={16} className="text-[#807D7E]"/>
                                        </span>
                                    ) : (
                                        <span
                                            onClick={() => setIsShowConfirmPassword(true)}
                                            className="absolute right-2 top-[3px] hover:cursor-pointer"
                                        >
                                            <IoEyeOff size={16} className="text-[#807D7E]"/>
                                        </span>
                                    )}
                                </span>
                                {errors.c_password && <p className="text-red-500">{errors.c_password.message}</p>}
                                {errors.c_password && errors.c_password.type === "minLength" && (
                                    <p className="text-red-500">Password must be at least 8 characters long</p>
                                )}
                                {errors.c_password && errors.c_password.type === "required" && (
                                    <span className="text-red-600">This field is required</span>
                                )}
                            </div>

                            <div className="mb-3 lg:mb-6">
                                {isResponseLoading ? (
                                    <div className="flex justify-center">
                                        <Bars
                                            height="40"
                                            width="80"
                                            color="#5DC9F4"
                                            ariaLabel="bars-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                        />
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn bg-[#5DC9F4] w-full py-[14px] rounded-[4px] text-white  text-[14px] font-semibold leading-5"
                                    >
                                        Register
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-col gap-2 lg:gap-3">
                        <p className="text-black text-opacity-80 text-center text-[14px] font-normal leading-5">
                            By continuing, you agree that you have read and accept our{" "}
                            <span className="text-black text-[14px] font-semibold leading-5">T&Cs</span> and{" "}
                            <span className="text-black text-[14px] font-semibold leading-5">Privacy Policy.</span>
                        </p>
                    </div>
                    <Divider/>
                    <div>
                        <p className="mb-5 lg:mb-10 text-center text-black text-opacity-75 text-[14px] font-normal leading-normal">
                            Already have an account?
                            <Link to={"/login-with-email"}>
                                {" "}
                                <span className="text-black font-semibold">Login</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default ResetPassword;
