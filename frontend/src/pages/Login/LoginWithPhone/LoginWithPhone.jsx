import logo from "../../../assets/logo/logo.png";
import {useForm} from "react-hook-form";
import {FaFacebook, FaStarOfLife} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {IoEyeSharp} from "react-icons/io5";
import {Divider} from "antd";
import {Link, ScrollRestoration, useNavigate} from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useState} from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import showToast from "../../../utilities/showToast";

const LoginWithPhone = () => {
    const [errorFromAPI, setErrorFromAPI] = useState(null);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        sessionStorage.setItem("phone", data?.phone);
        axiosSecure
            .post("otp_login", data)
            .then((res) => {

                if (res?.data?.status === true) {
                    navigate("/otp-verification-phone");
                } else {
                    showToast(res?.data?.message)
                }
            })
            .catch((error) => {
                showToast(error?.response?.data?.message, "error");
                let errorMessageList = error.response.data.data;
                //
                setErrorFromAPI(errorMessageList);
                //console.error('Error during registration:', error);
                // Handle errors from the API call
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
                    <h3 className="mb-3 lg:mb-6 text-black font-inter font-medium text-2xl lg:text-4xl leading-normal">Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="mb-5">
                                <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Phone Number
                                        <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                    </span>
                                </label>
                                <input
                                    {...register("phone", {
                                        required: true,
                                        pattern: /^0\d{10}$/, // Regular expression for 11 digits starting with 0
                                    })}
                                    type="number" // Change type to text to allow leading zeros
                                    placeholder="Phone number"
                                    className="p-2 w-full text-[14px] rounded-sm bg-white border-[0.5px] border-[#bfbfbf]"
                                />
                                {errors.phone && errors.phone.type === "pattern" && (
                                    <p className="text-red-500">Phone number must start with 0 and be 11 digits</p>
                                )}
                                {errors.phone && errors.phone.type === "required" && <span className="text-red-600">This field is required</span>}
                            </div>

                            {/* <div className="mb-[11px]">
                            <label>
                                <span className="flex text-sm font-medium mb-3">
                                    Password
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <span className="relative">
                                <input
                                    {...register("password", {
                                        required: true,
                                        minLength: 8, // Minimum password length of 8 characters
                                    })}
                                    type="password"
                                    placeholder="Enter password"
                                    className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-opacity-50 text-[14px] font-normal leading-normal tracking-[-0.14px]"
                                />
                                <span className="absolute right-2 top-[3px]">
                                    <IoEyeSharp size={16} className="text-[#807D7E]" />
                                </span>
                            </span>
                            {errors.password && errors.password.type === "minLength" && (
                                <p className="text-red-500">Password must be at least 8 characters long</p>
                            )}
                            {errors.password && errors.password.type === "required" && <span className="text-red-600">This field is required</span>}
                        </div> */}

                            {/* <div className="flex justify-between items-center mb-6">
                                <p className="text-black-80 font-inter text-[14px] font-normal leading-normal tracking-[-0.14px]">Remember Me</p>

                                <p className="text-black-80 font-inter text-[14px] font-normal leading-normal tracking-[-0.14px]">Forgot Password?</p>
                            </div> */}

                            <div className="mb-3 lg:mb-6">
                                <button
                                    type="submit"
                                    className="btn bg-[#5DC9F4] w-full py-[14px] rounded-[4px] text-white  text-[14px] font-semibold leading-5"
                                >
                                    Login With OTP
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-col gap-2 lg:gap-3">
                        <p className="text-center  text-black text-opacity-60 text-xs font-normal leading-normal tracking-[-0.12px]">or</p>
                        <Link to={"/login-with-email"}>
                            {" "}
                            <p className="text-center  text-black text-sm font-medium leading-normal tracking-[-0.12px]">
                                Login With Email & Password
                            </p>
                        </Link>
                        <p className="text-center  text-black text-opacity-60 text-xs font-normal leading-normal tracking-[-0.12px]">or</p>
                        <SocialLogin/>
                    </div>
                    <Divider/>
                    <div>
                        <p className="mb-5 lg:mb-10 text-center text-black text-opacity-75 font-inter text-[14px] font-normal leading-normal">
                            Don’t have an account?{" "}
                            <Link to={"/sign-up"}>
                                <span className="text-black font-semibold">Register</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default LoginWithPhone;
