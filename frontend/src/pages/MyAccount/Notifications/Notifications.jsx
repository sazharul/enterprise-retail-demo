import React, {useEffect} from "react";
import {IoIosNotifications} from "react-icons/io";
import {useGetNotificationsQuery} from "../../../redux/features/notifications/notificationsApi";
import {Bars} from "react-loader-spinner";
import moment from "moment";
import {onMessage} from "firebase/messaging";
import {messaging} from "../../../firebase/firebase.config";

const Notifications = () => {
    const {data: getNotificationsQuery, isLoading, refetch} = useGetNotificationsQuery();


    // onMessage(messaging, (payload) => {
    //     
    //     refetch()
    // });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }
    return (
        <>
            {getNotificationsQuery?.status == true && (
                <div style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}} className="rounded-lg bg-white">
                    <div className="py-3 ps-3 md:py-2 lg:py-5 md:ps-6 lg:ps-8 border-b-[0.5px] border-[#ECECEC]">
                        <h3 className="text-black text-opacity-80 font-inter text-xl lg:text-2xl font-semibold leading-[33.5px]">Notifications</h3>
                    </div>
                    <div className="flex flex-col gap-3 min-h-[calc(100vh-70vh)] md:gap-5 pt-3 pb-3 px-1 xs:px-3 md:mb-3 md:pt-5 lg:pt-6 md:px-6 lg:px-8">
                        {/* per order start  */}
                        {getNotificationsQuery?.data?.data?.map((item, i) => (
                            <div key={i} className="flex justify-between border hover:cursor-pointer border-[#E2E8F0] rounded-lg bg-[#EEFAFF] px-5 py-4">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="bg-[#5DC9F4] rounded-full p-1 h-min relative">
                                        <IoIosNotifications className="text-white" size={30}/>
                                        <div className="absolute top-0 -right-0 bg-[#0094CF] rounded-full h-3 w-3"></div>
                                    </div>
                                    <div className="w-full">
                                        <div className="flex flex-wrap gap-x-2 justify-between ">
                                            <p className="text-black font-inter text-sm md:text-base font-semibold leading-normal whitespace-nowrap">{item?.title}</p>
                                            <p className="text-[#000000CC] font-inter text-xs md:text-sm font-normal leading-normal whitespace-nowrap">{moment(item?.created_at).format("MMM DD, YYYY")}</p>
                                        </div>
                                        <p className="text-[#000000CC] font-inter text-xs md:text-sm font-medium leading-normal">{item?.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* <>
                            <div className="flex justify-between border hover:cursor-pointer border-[#E2E8F0] rounded-lg bg-[#EEFAFF] px-5 py-4">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="bg-[#5DC9F4] rounded-full p-1 h-min relative">
                                        <IoIosNotifications className="text-white" size={30} />
                                        <div className="absolute top-0 -right-0 bg-[#0094CF] rounded-full h-3 w-3"></div>
                                    </div>
                                    <div className="w-full">
                                        <div className="flex flex-wrap gap-x-2 justify-between ">
                                            <p className="text-black font-inter text-sm md:text-base font-semibold leading-normal whitespace-nowrap">Order Placed Successfully</p>
                                            <p className="text-[#000000CC] font-inter text-xs md:text-sm font-normal leading-normal whitespace-nowrap">24 Nov 2023</p>
                                        </div>
                                        <p className="text-[#000000CC] font-inter text-xs md:text-sm font-medium leading-normal">While buying products from GlowCart, you can use your available reward points by applying at checkout.</p>
                                    </div>
                                </div>
                            </div>
                        </> */}
                        {/* per order end */}
                        {/* per order start  */}
                        {/* <>
                            <div className="flex justify-between border hover:cursor-pointer border-[#E2E8F0] rounded-lg bg-[#FFF] px-5 py-4">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="bg-[#5DC9F4] rounded-full p-1 h-min">
                                        <IoIosNotifications className="text-white" size={30} />
                                    </div>
                                    <div className="w-full">
                                        <div className="flex flex-wrap gap-x-2 justify-between ">
                                            <p className="text-black font-inter text-sm md:text-base font-semibold leading-normal">Order Arrived</p>
                                            <p className="text-[#000000CC] font-inter text-xs md:text-sm font-normal leading-normal whitespace-nowrap">24 Nov 2023</p>
                                        </div>
                                        <p className="text-[#000000CC] font-inter text-xs md:text-sm font-medium leading-normal">
                                            Order <span className="text-black font-inter text-xs md:text-sm  font-semibold leading-normal">#875355 - EU</span> has been completed & arrived at the destinaton address.{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </> */}
                        {/* per order end */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Notifications;
