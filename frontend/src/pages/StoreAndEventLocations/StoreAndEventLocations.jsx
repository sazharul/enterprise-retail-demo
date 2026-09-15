import React from "react";
import {LuClock5} from "react-icons/lu";
import {IoCall} from "react-icons/io5";
import {IoLocationOutline} from "react-icons/io5";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import {Link, ScrollRestoration} from "react-router-dom";
import {useGetOutletQuery} from "../../redux/features/outlet/outletApi";
import {Bars} from "react-loader-spinner";
import {FaLocationDot} from "react-icons/fa6";
import Button from "../../components/ui/Button";
import ImageURL from "../../components/ImageURL/ImageURL.jsx";

const StoreAndEventLocations = () => {
    const {data, isLoading} = useGetOutletQuery();

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
                <h3 className="text-black font-inter text-xl font-semibold leading-normal">Store & Events</h3>
            </div>
            <div style={{boxShadow: "0px 0px 24px 0px rgba(228, 237, 240, 0.65)"}} className=" bg-[#FFF] rounded-lg flex flex-col sm:flex-row">
                {/* left side start */}
                <div className="sm:w-5/12">
                    <div>
                        <p className="p-2 sm:p-3 md:p-6 text-black font-inter text-base md:text-xl font-semibold leading-normal">Find A GlowCart Store Near You</p>
                        <div>
                            {data?.status &&
                                data?.data?.map((store, i) => (
                                    <div key={i} className=" border-t-[1px] py-2 px-2 sm:py-3 sm:px-3 md:py-5 md:px-6">
                                        <p className="text-black font-inter text-base font-semibold leading-normal mb-2 md:mb-4">{store?.name}</p>
                                        {/* <span className="flex items-center gap-2 text-black mb-1 md:mb-3">
                                            <LuClock5 size={15} />
                                            <p className="text-[#000000CC] font-inter text-xs font-medium leading-[18px]">Open : 10:00 AM - 09:30 PM</p>
                                        </span> */}
                                        <span className="flex items-center gap-2 text-black mb-1 md:mb-3">
                                            <IoCall size={14}/>

                                            <p className="text-[#000000CC] font-inter text-xs font-medium leading-[18px]">{store?.mobile}</p>
                                        </span>
                                        <span className="flex items-start gap-1 md:gap-2 text-black mb-3 md:mb-5">
                                            <FaLocationDot size={14}/>
                                            <p className="text-[#000000CC] font-inter text-xs font-medium leading-[18px]">{store?.address}</p>
                                        </span>
                                        <div className="flex items-center gap-3 md:gap-5">
                                            {" "}
                                            <Link to={`https://www.google.com/maps/search/${store?.latitude},+${store?.longitude}?sa=X&ved=1t:242&ictx=111`}>
                                                <Button className={"py-2 px-4 text-xs hover:cursor-pointer"}>View On Map</Button>
                                            </Link>
                                            <Link to={`/store-and-event-details?id=${store?.id}`}>
                                                <Button className={"py-2 px-4 text-xs hover:cursor-pointer"}>Store Details</Button>
                                            </Link>

                                        </div>
                                    </div>
                                ))}
                            {/* per store start */}
                        </div>
                    </div>
                </div>
                {/* left side end */}
                {/* right side start */}
                <div className="w-full sm:border-l-[0.5px] border-[#ECECEC] p-2 sm:p-4 md:p-8">
                    <ImageURL className="w-full h-auto max-h-full" image={data?.data[0]?.map_image}/>
                </div>
                {/* right side end*/}
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default StoreAndEventLocations;
