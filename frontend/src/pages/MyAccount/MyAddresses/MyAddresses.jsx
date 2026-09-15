import React, {useEffect, useState} from "react";
import {IoCall} from "react-icons/io5";
import {MdEmail} from "react-icons/md";
import {ImLocation2} from "react-icons/im";
import {TbEdit} from "react-icons/tb";
import {RiDeleteBin6Line} from "react-icons/ri";
import {Divider} from "antd";
import {Link, useNavigate} from "react-router-dom";
import useUserAddress from "../../../hooks/useUserAddress";
import {Bars, ProgressBar, ThreeDots} from "react-loader-spinner";
import {BsCheck} from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import showToast from "../../../utilities/showToast";

const MyAddresses = () => {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState(null);
    const {userAddress, isUserAddressLoading, refetchAddress} = useUserAddress();
    const [isResponseLoading, setIsResponseLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const newDefaultAddress = userAddress?.data?.filter((address) => address.id === selectedCheckboxes);
        if (newDefaultAddress && newDefaultAddress.length > 0) {
            newDefaultAddress[0].status = "1";
            setIsResponseLoading(true);
            axiosSecure
                .post(`edit_address/${selectedCheckboxes}`, ...newDefaultAddress)
                .then((res) => {
                    if (res.data.status === true) {
                        setIsResponseLoading(false);
                        // addTokenToLocalStorage(res.data.data.token);
                        showToast(res?.data?.message);
                        refetchAddress();
                    } else {
                        setIsResponseLoading(false);
                        // Handle other cases if needed
                        showToast(res?.data?.data?.error, "error");
                    }
                })
                .catch((error) => {
                    setIsResponseLoading(false);
                    let errorMessageList = error.response.data.data;
                    showToast(errorMessageList?.error, "error");
                    showToast(errorMessageList?.district_id, "error");
                    showToast(errorMessageList?.city_id, "error");
                });
        }
    }, [selectedCheckboxes]);

    const handleDeleteAddress = (id) => {
        axiosSecure
            .delete(`delete_address/${id}`)
            .then((res) => {
                if (res.data.status === true) {
                    setIsResponseLoading(false);
                    // addTokenToLocalStorage(res.data.data.token);
                    showToast(res?.data?.message);
                    refetchAddress();
                } else {
                    setIsResponseLoading(false);
                    // Handle other cases if needed
                    showToast(res?.data?.data?.error, "error");
                }
            })
            .catch((error) => {
                setIsResponseLoading(false);
                let errorMessageList = error.response.data.data;
                showToast(errorMessageList?.error, "error");
                showToast(errorMessageList?.district_id, "error");
                showToast(errorMessageList?.city_id, "error");
            });
    };

    if (isUserAddressLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }

    return (
        <div style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}} className="rounded-lg bg-white ">
            <div className="py-3 ps-3 px-1 xs:px-3 md:px-6 lg:px-8 md:py-2 lg:py-5 md:ps-6 lg:ps-8 border-b-[0.5px] border-[#ECECEC] flex justify-between">
                <h3 className="text-black text-opacity-80 font-inter text-xl lg:text-2xl font-semibold leading-[33.5px]">My Addresses</h3>
                <Link to={"/my-account/my-addresses/add-new-address"}>
                    <button className="py-2 px-6 bg-[#5DC9F4] rounded text-white font-inter text-sm font-semibold leading-normal">Add New</button>
                </Link>
            </div>
            <div className="pt-3 pb-3 px-1 xs:px-3 md:mb-3 md:pt-3 lg:pt-6 md:px-6 lg:px-8">
                {/* per order start  */}
                {userAddress?.status === true && userAddress?.data?.length > 0 ? (
                    <>
                        {userAddress?.data?.map((address) => (
                            <div key={address.id} className="border border-[#E2E8F0] bg-[#fff] rounded-lg p-6 relative mb-3">
                                <div className="border-b-2 border-[#ECECEC] pb-1">
                                    <p className="text-black font-inter text-lg font-medium leading-normal mb-5">{address.name}</p>
                                    <span className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                                        <IoCall size={12}/>
                                        <p>{address.phone}</p>
                                    </span>
                                    {address?.email && (
                                        <span className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                                            <MdEmail size={14}/>
                                            <p>{address.email}</p>
                                        </span>
                                    )}

                                    <span className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                                        <ImLocation2 size={12}/>
                                        <p>{address.address}</p>
                                    </span>
                                </div>
                                {/* <div className="flex items-center gap-1 mt-3">
                                    <input type="checkbox" />{" "}
                                    <p className="text-[#000000CC] font-inter text-sm font-medium leading-normal tracking-tighter">
                                        Set as default shipping address
                                    </p>
                                </div> */}
                                <div className="flex flex-wrap items-center gap-1">
                                    <label className="flex items-center hover:cursor-pointer gap-3 text-[#252728] font-inter text-sm font-normal leading-normal w-fit h-min mt-3"
                                           onChange={() => setSelectedCheckboxes(address?.id)}>
                                        <div className="relative flex items-center">
                                            {/* <input
                                            type="checkbox"
                                            className={`rounded h-4 w-4 ${
                                                selectedCheckboxes == (address?.status) ? "bg-[#5DC9F4] text-white" : "bg-white"
                                            } border border-[#0094CF] appearance-none`}
                                        /> */}
                                            <input type="checkbox"
                                                   className={`rounded h-4 w-4 ${address?.status == 1 ? "bg-[#5DC9F4] text-white" : "bg-white"} border border-[#0094CF] appearance-none`}/>
                                            <BsCheck size={16} className="absolute top-0 text-white"/>
                                        </div>
                                        <p className="text-[#000000CC] font-inter text-sm font-medium leading-normal tracking-tighter">Set as default shipping address</p>
                                    </label>
                                    {isResponseLoading && address?.id == selectedCheckboxes &&
                                        <ProgressBar visible={true} height="30" width="50" color="#5DC9F4" ariaLabel="progress-bar-loading" wrapperStyle={{}} wrapperClass=""/>}
                                </div>
                                <div className="absolute top-2 xs:top-3 right-4 flex items-center gap-">
                                    <Link to={`/my-account/my-addresses/edit-address/${address?.id}`}>
                                        <span className="text-black font-inter text-sm font-medium leading-normal flex items-center gap-2 ">
                                            <TbEdit/>
                                            <p className="">edit</p>
                                        </span>
                                    </Link>
                                    <Divider type="vertical"/>
                                    <span onClick={() => handleDeleteAddress(address?.id)}
                                          className="text-black font-inter text-sm font-medium leading-normal flex items-center gap-2 hover:cursor-pointer">
                                        <RiDeleteBin6Line/>
                                        <p className="">Remove</p>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="min-h-[calc(100vh-70vh)]">
                        <p className="text-red-500 text-center mt-5 text-xl">No address has been added yet.</p>
                    </div>
                )}
                {/* <div className="border border-[#E2E8F0] bg-[#fff] rounded-lg p-6 relative">
                    <div className="border-b-2 border-[#ECECEC] pb-1">
                        <p className="text-black font-inter text-lg font-medium leading-normal mb-5">Sadik Ahmmed</p>
                        <span className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                            <IoCall size={12} />
                            <p>+8801234567892</p>
                        </span>
                        <span className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                            <MdEmail size={14} />
                            <p>sadik@gmail.com</p>
                        </span>
                        <span className="flex items-start gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                            <ImLocation2 size={20} />
                            <p>Dhaka, Dhaka South, 109/1/3 Link Road, North-South Mosque Goli, West Rajabazar</p>
                        </span>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                        <input type="checkbox" />{" "}
                        <p className="text-[#000000CC] font-inter text-sm font-medium leading-normal tracking-tighter">
                            Set as default shipping address
                        </p>
                    </div>
                    <div className="absolute top-2 xs:top-3 right-4 flex items-center gap-">
                        <Link to={"/my-account/my-addresses/edit-address"}>
                            <span className="text-black font-inter text-sm font-medium leading-normal flex items-center gap-2 ">
                                <TbEdit />
                                <p className="">edit</p>
                            </span>
                        </Link>
                        <Divider type="vertical" />
                        <span className="text-black font-inter text-sm font-medium leading-normal flex items-center gap-2 hover:cursor-pointer">
                            <RiDeleteBin6Line />
                            <p className="">Remove</p>
                        </span>
                    </div>
                </div> */}
                {/* per order end */}
            </div>
        </div>
    );
};

export default MyAddresses;
