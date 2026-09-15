import logo from "../../../assets/logo/logo.png";
import {useForm} from "react-hook-form";
import {FaFacebook, FaStarOfLife} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {IoEyeSharp} from "react-icons/io5";
import {Divider} from "antd";
import {Link, ScrollRestoration, useNavigate} from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useState} from "react";
import showToast from "../../../utilities/showToast";

const ForgotPassword = () => {
    const [errorFromAPI, setErrorFromAPI] = useState(null);

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {

        sessionStorage.setItem("email", data?.email);

        axiosSecure
            .post("forgot_password", data)
            .then((res) => {
                if (res?.data?.status === true) {


                    navigate("/otp-verification-email");
                }
            })
            .catch((error) => {
                let errorMessageList = error?.response?.data?.data;

                showToast(errorMessageList?.error, "error");
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
                    <h3 className="mb-1 lg:mb-3 text-black font-inter text-2xl font-medium leading-normal">Forgot Password</h3>
                    <p className="mb-5 lg:mb-8 text-black text-opacity-80 font-inter text-[14px] font-normal leading-5">
                        Enter the email address you used when you joined and we’ll send you instructions to reset your password.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="mb-5">
                                <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Email Address
                                        <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                    </span>
                                </label>
                                <input
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for basic email format validation
                                    })}
                                    // onChange={() => setErrorFromAPI(null)}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-[14px] font-normal leading-normal  tracking-[-0.14px]"
                                />
                                {errors.email && errors.email.type === "pattern" && (
                                    <p className="text-red-500">Please enter a valid email address</p>
                                )}
                                {errors.email && errors.email.type === "required" && <span className="text-red-600">This field is required</span>}
                                {/* {errorFromAPI?.email && (
                  <p className="text-red-500">
                   {errorFromAPI?.email} || The email has already been taken
                  </p>
                )} */}
                            </div>

                            <div className="mb-3 lg:mb-6">
                                <button
                                    type="submit"
                                    className="btn bg-[#5DC9F4] w-full py-[14px] rounded-[4px] text-white  text-[14px] font-semibold leading-5"
                                >
                                    Send reset instructions
                                </button>
                            </div>
                        </div>
                    </form>

                    <Divider/>
                    <div>
                        <p className="mb-5 lg:mb-10 text-center text-black text-opacity-75 font-inter text-[14px] font-normal leading-normal">
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

export default ForgotPassword;
