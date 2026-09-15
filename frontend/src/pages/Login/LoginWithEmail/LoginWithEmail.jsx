import {Divider} from "antd";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {BsCheck} from "react-icons/bs";
import {FaFacebook, FaStarOfLife} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {IoEyeOff, IoEyeSharp} from "react-icons/io5";
import {Bars} from "react-loader-spinner";
import {Link, ScrollRestoration, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import logo from "../../../assets/logo/logo.png";
import {addTokenToLocalStorage} from "../../../utilities/tokenHandler";
import {AuthContext} from "../../../providers/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";
import {decrypt, encrypt} from "../../../utilities/EncryptAndDecrypt";
import {useLoginMutation} from "../../../redux/features/auth/authApi";
import {useDispatch} from "react-redux";
import {setUser} from "../../../redux/features/auth/authSlice";
import {toast} from "sonner";
import showToast from "../../../utilities/showToast";

const LoginWithEmail = () => {
    const [selectedCheckbox, setSelectedCheckbox] = useState(false);
    const [errorFromAPI, setErrorFromAPI] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isResponseLoading, setIsResponseLoading] = useState(false);
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckboxChange = (key) => {
        // Update the selected checkbox state
        setSelectedCheckbox(key);

        // Get the existing search parameters
        const searchParams = new URLSearchParams(location.search);

        // Update the 'sort_by' parameter
        searchParams.set("sort_by", key);

        // Update the URL
        // navigate(`${link}?${searchParams.toString()}`);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        // Retrieve saved email and password from cookies
        const savedEmail = Cookies.get("savedEmail");
        const savedPassword = Cookies.get("savedPassword");
        const decryptEmail = decrypt(savedEmail);
        const decryptPassword = decrypt(savedPassword);
        if (savedPassword) {
            setSelectedCheckbox(true);
        }

        // Set the input field values
        setValue("email", decryptEmail || "");
        setValue("password", decryptPassword || "");
    }, [setValue]);

    const onSubmit = async (data) => {
        setIsResponseLoading(true);
        const toastId = toast.loading("Logging in");
        const encryptEmail = encrypt(data.email);
        const encryptPassword = encrypt(data.password);
        if (selectedCheckbox) {
            Cookies.set("savedEmail", encryptEmail, {expires: 30}); // Expires in 30 days
            Cookies.set("savedPassword", encryptPassword, {expires: 30});
        } else {
            // Remove cookies if "Remember Me" is not checked
            Cookies.remove("savedEmail");
            Cookies.remove("savedPassword");
        }

        //   axios
        //     .post("login", data)
        //     .then((res) => {
        //         setIsResponseLoading(false);
        //       if (res.data.status === true) {
        //         addTokenToLocalStorage(res.data.data.token);
        //         Swal.fire({
        //           position: "center",
        //           icon: "success",
        //           title: "Login successful",
        //           showConfirmButton: false,
        //           timer: 1500,
        //         });
        //         navigate("/");
        //       } else {
        //
        //         // Handle other cases if needed
        //         setIsResponseLoading(false);
        //       }
        //     })
        //     .catch((error) => {
        //         let errorMessageList = error.response.data.data;
        //         setIsResponseLoading(false);

        //         // Extracting a specific property for rendering
        //         const errorMessage = errorMessageList.error || "An error occurred";

        //         setErrorFromAPI(errorMessage);
        //       });
        try {
            const res = await login(data).unwrap();
            if (res?.status === true) {
                addTokenToLocalStorage(res?.data?.token);
                dispatch(setUser({user: data, token: res.data.token}));
                // toast.success("Logged in", { id: toastId, duration: 2000 });
                showToast(res?.message)

                // Swal.fire({
                //     position: "center",
                //     icon: "success",
                //       title: "Login successful",
                //       showConfirmButton: false,
                //       timer: 1500,
                //     });
                navigate("/");
            } else {
                showToast(res?.message, 'error')
                // Handle other cases if needed
                setIsResponseLoading(false);
            }
        } catch (err) {
            //
            setIsResponseLoading(false);

            showToast(err?.data?.message, "error")
        }
    };

    const url = window.location.pathname.split("/").pop();

    return (
        <div className="mx-2">
            <div
                style={{boxShadow: "0px 0px 16px 0px rgba(228, 237, 240, 0.80)"}}
                className="max-w-[520px] flex-shrink-0 rounded-[4px] bg-white  mx-auto mt-3 lg:mt-9 mb-3 lg:mb-20"
            >
                {
                    url !== "login-with-email" && (
                        <div className="pt-4 lg:pt-8 pb-3 lg:pb-6 border-b-[0.5px]">
                            <img className="w-[175.997px] mx-auto" src={logo} alt="logo"/>
                        </div>
                    )
                }


                <div className="pt-2 px-2 pb-2 xs:px-5 md:pt-3 md:px-7 md:pb-5 lg:pt-6 lg:px-[60px] lg:pb-[40px]">
                <h3 className="mb-3 lg:mb-6 text-black font-inter font-medium text-2xl lg:text-4xl leading-normal pt-6">
                        Login
                    </h3>
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
                                    className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-[14px] font-normal leading-normal  tracking-[-0.14px]  "
                                />
                                {errors.email && errors.email.type === "pattern" && (
                                    <p className="text-red-500">
                                        Please enter a valid email address
                                    </p>
                                )}
                                {errors.email && errors.email.type === "required" && (
                                    <span className="text-red-600">This field is required</span>
                                )}
                                {errorFromAPI && <p className="text-red-500">{errorFromAPI}</p>}
                            </div>

                            <div className="mb-5">
                                <label>
                  <span className="flex text-sm font-medium mb-3">
                    Password
                    <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                  </span>
                                </label>
                                <span className="relative">
                  <input
                      {...register("password", {
                          required: true,
                          minLength: 8, // Minimum password length of 8 characters
                      })}
                      type={isShowPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-[14px] font-normal leading-normal tracking-[-0.14px]"
                  />
                                    {isShowPassword ? (
                                        <span
                                            onClick={() => setIsShowPassword(false)}
                                            className="absolute right-2 top-[3px] hover:cursor-pointer"
                                        >
                      <IoEyeSharp size={16} className="text-[#807D7E]"/>
                    </span>
                                    ) : (
                                        <span
                                            onClick={() => setIsShowPassword(true)}
                                            className="absolute right-2 top-[3px] hover:cursor-pointer"
                                        >
                      <IoEyeOff size={16} className="text-[#807D7E]"/>
                    </span>
                                    )}
                </span>
                                {errors.password && errors.password.type === "minLength" && (
                                    <p className="text-red-500">
                                        Password must be at least 8 characters long
                                    </p>
                                )}
                                {errors.password && errors.password.type === "required" && (
                                    <span className="text-red-600">This field is required</span>
                                )}
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <label
                                    className="flex items-center hover:cursor-pointer gap-3 text-[#252728] font-inter text-sm font-normal leading-normal w-fit h-min"
                                    onChange={() => setSelectedCheckbox((prev) => !prev)}
                                >
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className={`rounded h-4 w-4 ${
                                                selectedCheckbox == true
                                                    ? "bg-[#5DC9F4] text-white"
                                                    : "bg-white"
                                            } border border-[#0094CF] appearance-none`}
                                        />
                                        <BsCheck size={16} className="absolute top-0 text-white"/>
                                    </div>
                                    <p className="text-black-80 font-inter text-[14px] font-normal leading-normal tracking-[-0.14px]">
                                        Remember Me
                                    </p>
                                </label>

                                <Link to={"/forgot-password"}>
                                    <p className="text-black-80 font-inter text-[14px] font-normal leading-normal tracking-[-0.14px]">
                                        Forgot Password?
                                    </p>
                                </Link>
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
                                        Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-col gap-2 lg:gap-3">
                        <p className="text-center  text-black text-opacity-60 text-xs font-normal leading-normal tracking-[-0.12px]">
                            or
                        </p>
                        <Link to={"/login-with-phone"}>
                            {" "}
                            <p className="text-center  text-black text-sm font-medium leading-normal tracking-[-0.12px]">
                                Login With OTP
                            </p>
                        </Link>
                        <p className="text-center  text-black text-opacity-60 text-xs font-normal leading-normal tracking-[-0.12px]">
                            or
                        </p>
                        <SocialLogin/>
                    </div>
                    <Divider/>
                    <div>
                        <p className="mb-5 lg:mb-10 text-center text-black text-opacity-75 font-inter text-[14px] font-normal leading-normal">
                            Don’t have an account?{" "}
                            <Link to={"/sign-up"}>
                                {" "}
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

export default LoginWithEmail;
