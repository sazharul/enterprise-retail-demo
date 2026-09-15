import React from "react";
import {FaArrowLeft, FaLocationDot} from "react-icons/fa6";
import {IoCall, IoLocationOutline} from "react-icons/io5";
import {Link, useLocation} from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {useGetOutletQuery} from "../../redux/features/outlet/outletApi";
import ImageURL from "../../components/ImageURL/ImageURL";

const StoreAndEventDetails = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    const {data, isLoading} = useGetOutletQuery();

    const selectedStore = data?.data.find((store) => store.id == id);


    return (
        <div className="container mx-auto px-[10px] mb-10 md:mb-20">
            <Breadcrumbs
                first={"Home"}
                second={"Store & Events"}
                className={"my-4"}
            />
            <div className="flex justify-center my-3 md:my-6">
                <h3 className="text-black font-inter text-xl font-semibold leading-normal">
                    Store & Events
                </h3>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
                {/* left side start */}
                <div
                    style={{boxShadow: "0px 0px 24px 0px rgba(228, 237, 240, 0.65)"}}
                    className="md:w-7/12 lg:w-5/12 rounded-lg bg-white"
                >
                    <Link to={"/store-and-event-location"}>
            <span className="flex items-center gap-2 py-5 px-3 border-b-[1px] text-black font-inter text-xl font-semibold leading-normal">
              <FaArrowLeft size={16}/>
              <p>Back</p>
            </span>
                    </Link>
                    {/* per store start */}
                    <div className=" border-t-[1px] py-2 px-2 sm:py-3 sm:px-3 md:py-5 md:px-6">
                        <p className="text-black font-inter text-base font-semibold leading-normal mb-2 md:mb-4">
                            {selectedStore?.name}
                        </p>
                        {/* <span className="flex items-center gap-2 text-black mb-1 md:mb-3">
                            <LuClock5 size={15} />
                            <p className="text-[#000000CC] font-inter text-xs font-medium leading-[18px]">Open : 10:00 AM - 09:30 PM</p>
                        </span> */}
                        <span className="flex items-center gap-2 text-black mb-1 md:mb-3">
              <IoCall size={14}/>
              <p className="text-[#000000CC] font-inter text-xs font-medium leading-[18px]">
                {selectedStore?.mobile}
              </p>
            </span>
                        <span className="flex items-start gap-1 md:gap-2 text-black mb-3 md:mb-5">
            <FaLocationDot size={14}/>
              <p className="text-[#000000CC] font-inter text-xs font-medium leading-[18px] w">
                {selectedStore?.address}
              </p>
            </span>
                        {/* <div className="flex items-center gap-3 md:gap-5">
                            {" "}
                            <MainButton title={"View On Map"} className={"py-2 px-4 text-xs "} />
                        </div> */}
                    </div>
                    {/* per store end*/}
                </div>
                {/* left side end*/}
                {/* right side start */}
                <div className="w-full max-h-screen">
                    {/* <img
            className="rounded-md  h-full w-full"
            src="https://media-afr-cdn.oriflame.com/contentImage?externalMediaId=201bc7b3-c2f8-4578-af70-2dfe9523f20f&w=684&q=90"
            alt=""
          /> */}
                    <ImageURL className={"w-full h-full"} image={selectedStore?.map_image}/>
                </div>
                {/* right side end*/}
            </div>
        </div>
    );
};

export default StoreAndEventDetails;
