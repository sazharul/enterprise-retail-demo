import axios from "axios";
import {useContext, useState} from "react";
import {FaStarOfLife} from "react-icons/fa";
import {Bars} from "react-loader-spinner";
import {ScrollRestoration, useNavigate} from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import {LogicProviderContext} from "../../../providers/LogicProvider";
import showToast from "../../../utilities/showToast";
import {addTokenToLocalStorage} from "../../../utilities/tokenHandler";

const EmailOTPVerification = () => {
    const [otp, setOTP] = useState(["", "", "", "", ""]);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errorFromAPI, setErrorFromAPI] = useState(null);
    const navigate = useNavigate()

    const {windowWidth} = useContext(LogicProviderContext);

    const handleInputChange = (index, value) => {
        if (value === "" || value.match(/^[0-9]+$/)) {
            // Reset error if the input is a number or empty

            const newOTP = [...otp];
            newOTP[index] = value;

            // Allow changing the input number when backspace is pressed
            if (value === "" && index > 0) {
                // If the current input is empty and not the first digit, move focus to the previous input field
                document.getElementById(`otp-input-${index - 1}`).focus();
            } else if (value !== "" && index < 4) {
                // If the input is not empty and not the last digit, move focus to the next input field
                document.getElementById(`otp-input-${index + 1}`).focus();
            }

            setOTP(newOTP);
        }
    };

    const email = sessionStorage.getItem("email");
    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if all OTP digits are entered
        const isFilled = otp.every((digit) => digit !== "");
        if (isFilled) {
            // Here, you can send the OTP to the server for verification or handle it as needed
            const enteredOTP = otp.join("");
            setSubmitLoading(true);

            axios
                .post("verify_email", {otp: enteredOTP, email: email})
                .then((res) => {
                    setSubmitLoading(false);
                    if (res.data.status === true) {
                        // showToast(res?.data?.message)
                        addTokenToLocalStorage(res?.data?.data?.token);
                        // refetch();
                        navigate("/reset-password");
                    } else {
                        showToast(res?.data?.data?.error, "error")
                    }
                })
                .catch((error) => {
                    setSubmitLoading(false);
                    let errorMessageList = error.response.data.data;
                    setErrorFromAPI(errorMessageList);
                    showToast(errorMessageList?.error, "error")
                });
        } else {
            showToast("Please enter all OTP digits.", "error")
        }
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
                    <h3 className="mb-1 lg:mb-3 text-black font-inter text-2xl font-medium leading-normal">OTP Verification</h3>
                    <p className="mb-5 lg:mb-8 text-black text-opacity-80 font-inter text-[14px] font-normal leading-5">
                        Enter the 5-digit verification code which we sent to your given email (example@gmail.com).
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-5">
                                <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Verification Code
                                        <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                    </span>
                                </label>
                                <div className="flex gap-3 xs:gap-6 h-10 xs:h-[50px] justify-center">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <input
                                            // className="rounded-sm border-[0.5px] border-gray-300 bg-white text-center w-[40px] h-[40px]"
                                            className={`rounded-sm border-[0.5px] border-gray-300 bg-white text-center ${
                                                windowWidth >= 380 && "max-w-[60px] max-h-[48px]"
                                            } ${windowWidth <= 380 && "max-w-[38px] max-h-[35px]"} ${
                                                windowWidth <= 320 && "max-w-[38px] max-h-[34px]"
                                            }`}
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type="text"
                                            maxLength="1"
                                            value={otp[index]}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3 lg:mb-6">
                                {submitLoading ? (
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
                                        Verify Code
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>

                    {/* <Divider />
                    <div>
                        <p className="mb-5 lg:mb-10 text-center text-black text-opacity-75 font-inter text-[14px] font-normal leading-normal">
                            Already have an account?
                            <Link to={"/login-with-email"}>
                                {" "}
                                <span className="text-black font-semibold">Login</span>
                            </Link>
                        </p>
                    </div> */}
                </div>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default EmailOTPVerification;
