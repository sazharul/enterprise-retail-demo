import React from "react";
import {useForm} from "react-hook-form";
import {FaStarOfLife} from "react-icons/fa6";
import {IoCall} from "react-icons/io5";
import {MdEmail} from "react-icons/md";
import {ScrollRestoration} from "react-router-dom";
import {useContactMutation, useGetContactQuery} from "../../redux/features/contact/contactApi";
import showToast from "../../utilities/showToast";
import {Bars} from "react-loader-spinner";

const ContactUs = () => {
    const [contactMutation] = useContactMutation();
    const {data: getContactQuery, isLoading} = useGetContactQuery();


    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await contactMutation(data);

            if (response?.data?.status) {
                setValue("name", "")
                setValue("email", "")
                setValue("number", "")
                setValue("message", "")
                showToast(`Message sent successfully!`)
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-[10px] mb-10 md:mb-20">
            <div className="flex justify-center my-3 md:my-6">
                <h3 className="text-black font-inter text-xl font-semibold leading-normal">Contact Us</h3>
            </div>
            <div style={{boxShadow: "0px 0px 24px 0px rgba(228, 237, 240, 0.65)"}} className=" bg-[#FFF] rounded-lg flex flex-col md:flex-row">
                {/* left side start */}
                <div className="w-full md:w-6/12 md:border-e-[0.5px] border-[#ECECEC] py-4 px-2 xs:py-6 xs:px-5 lg:py-[30px] lg:px-[32px]">
                    <h3 className="text-black font-inter text-[24px] font-semibold leading-normal mb-4">Contact Information</h3>

                    <p className="text-[#000000CC] font-inter text-sm font-medium leading-5 mb-4">
                        We love to hear from you on our customer service, delivery, website or any topics you want to share with us. Your comments and
                        suggestions will be appreciated.{" "}
                    </p>
                    <div>
                        <div className="flex items-center gap-3 w-full mb-8">
                            <div className="bg-[#5DC9F4] rounded-full p-2 h-min">
                                <IoCall className="text-white" size={20}/>
                            </div>
                            <div className="w-full">
                                <div className="flex flex-wrap gap-x-2 justify-between ">
                                    <p className="text-black font-inter text-sm md:text-base font-semibold leading-normal">Call Us</p>
                                </div>
                                <p className="text-[#000000CC] font-sm text-sm font-medium leading-[26px]">
                                    {getContactQuery?.data?.phone} ({getContactQuery?.data?.start_time} - {getContactQuery?.data?.end_time})
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full mb-8">
                            <div className="bg-[#5DC9F4] rounded-full p-[6px] h-min">
                                <MdEmail className="text-white" size={25}/>
                            </div>
                            <div className="w-full">
                                <div className="flex flex-wrap gap-x-2 justify-between ">
                                    <p className="text-black font-inter text-sm md:text-base font-semibold leading-normal">E-mail</p>
                                </div>
                                <p className="text-[#000000CC] font-sm text-sm font-medium leading-[26px]">{getContactQuery?.data?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* left side end */}
                {/* right side start */}
                <div className="w-full md:w-6/12 p-2 xs:p-5 s lg:p-8">
                    <div className="p-3 md:p-4 bg-[#EEFAFF] rounded-md">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="bg-[#fff] rounded-4px] py-2 px-2 xs:py-3 xs:px-3 lg:py-5 lg:px-6 mb-4 rounded-[4px]">
                                <h3 className="text-black font-inter text-xl font-semibold leading-normal md:mb-2">Get in Touch</h3>

                                <div>
                                    <div className="mb-5">
                                        <label>
                                            <span className="flex text-sm font-medium mb-3">
                                                Full Name
                                                <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                            </span>
                                        </label>
                                        <input
                                            {...register("name", {
                                                required: true,
                                                minLength: 2,
                                                maxLength: 50,
                                                pattern: /^[A-Za-z\s\-,'.]+$/,
                                            })}
                                            type="text" // Change type to text to allow leading zeros
                                            placeholder="Enter your full name"
                                            className="p-2 w-full rounded-sm bg-white border-[0.5px] text-[14px] border-[#bfbfbf]"
                                        />
                                        {errors.name && errors.name.type === "required" && (
                                            <span className="text-red-600">Full Name is required</span>
                                        )}
                                        {errors.name && errors.name.type === "minLength" && (
                                            <span className="text-red-600">Full Name should be at least 2 characters long</span>
                                        )}
                                        {errors.name && errors.name.type === "maxLength" && (
                                            <span className="text-red-600">Full Name should not exceed 50 characters</span>
                                        )}
                                        {errors.name && errors.name.type === "pattern" && (
                                            <span className="text-red-600">Please enter a valid Full Name</span>
                                        )}
                                    </div>
                                    <div className="mb-5">
                                        <label>
                                            <span className="flex text-sm font-medium mb-3">
                                                Email
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
                                        {errors.email && errors.email.type === "required" && (
                                            <span className="text-red-600">This field is required</span>
                                        )}
                                    </div>
                                    <div className="mb-5">
                                        <label>
                                            <span className="flex text-sm font-medium mb-3">
                                                Phone
                                                <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                            </span>
                                        </label>
                                        <input
                                            {...register("number", {
                                                required: true,
                                                pattern: /^0\d{10}$/, // Regular expression for 11 digits starting with 0
                                            })}
                                            type="number" // Change type to text to allow leading zeros
                                            placeholder="Phone number"
                                            className="p-2 w-full rounded-sm bg-white border-[0.5px] text-[14px] border-[#bfbfbf]"
                                        />
                                        {errors.phone && errors.phone.type === "pattern" && (
                                            <p className="text-red-500">Phone number must start with 0 and be 11 digits</p>
                                        )}
                                        {errors.phone && errors.phone.type === "required" && (
                                            <span className="text-red-600">This field is required</span>
                                        )}
                                    </div>

                                    <div className="md-2 2xl:mb-5 ">
                                        <label>
                                            <span className="text-sm flex font-medium mb-3 text-black">
                                                Message
                                                <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                            </span>
                                        </label>

                                        <textarea
                                            name="message"
                                            {...register("message", {
                                                required: true,
                                            })}
                                            placeholder="Write your message"
                                            rows="4"
                                            className="border text-[14px] rounded w-full p-2"
                                        ></textarea>
                                        {errors.message && errors.message.type === "required" && (
                                            <span className="text-red-600">This field is required</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit" // Set type to "submit" if type prop exists, otherwise default to "button"
                                className={
                                    "btn bg-[#5DC9F4] py-[14px] rounded-[4px] text-white text-[14px] font-semibold leading-5 whitespace-nowrap w-full"
                                }
                                onClick={handleSubmit && (() => handleSubmit())} // Conditionally attach onClick handler
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
                {/* right side end*/}
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default ContactUs;
