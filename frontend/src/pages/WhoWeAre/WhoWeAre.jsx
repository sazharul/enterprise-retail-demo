import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {ScrollRestoration} from "react-router-dom";
import {twMerge} from "tailwind-merge";
import topBanner from "../../assets/WhoWeAre/whoWeAreBanner.png";
import bgImage from "../../assets/WhoWeAre/bgImage.png";
import image1 from "../../assets/WhoWeAre/whoWeAre.png";
import image2 from "../../assets/WhoWeAre/whoWeAre1.jpg";
import grid1 from "../../assets/WhoWeAre/grid1.png";
import grid2 from "../../assets/WhoWeAre/grid2.png";
import grid4 from "../../assets/WhoWeAre/grid4.png";
import ImageURL from "../../components/ImageURL/ImageURL";
import {TbCertificate, TbTag} from "react-icons/tb";
import {SlBadge} from "react-icons/sl";
import {LiaTruckMovingSolid} from "react-icons/lia";
import {useWhoWeAreQuery} from "../../redux/features/companyPolicy/companyPolicyApi";
import {Bars} from "react-loader-spinner";

const WhoWeAre = () => {
    const {data: whoWeAreQuery, isLoading: whoWeAreLoading} = useWhoWeAreQuery()

    if (whoWeAreLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }
    return (
        <div className="container mx-auto px-[10px] mt-4 md:mt-10 min-h-[calc(100vh-50vh)]">
            {
                whoWeAreQuery?.status == true && <div dangerouslySetInnerHTML={{__html: whoWeAreQuery?.data?.document}}/>
            }
            {/* */}
            {/* <div className="mb-10 md:mb-20">
                <div className="container mx-auto px-[10px] ">
                    <Breadcrumbs className={"my-2"} first={"Home"} second={"My Account"} />
                   
                    <div className="w-full">
                        <ImageURL className={" max-h-full w-full"} image={topBanner} />
                    </div>
                 
                </div>
                <div className="flex justify-center">
                    <h5 className="pb-2 border-b-2 text-xl md:text-2xl border-black my-3">Why Buy From Us?</h5>
                </div>
                <div
                    className={twMerge(` bg-cover bg-center object-cover bg-no-repeat w-full `)}
                    style={{
                        backgroundImage: `url("${bgImage}")`,
                    }}
                >
                    <div className="container mx-auto px-[10px] ">
                        <div className="flex flex-col md:flex-row items-center md:gap-9 mb-5">
                            <div className="w-[300px] h-300px]">
                                <ImageURL className={" max-h-full w-full"} image={image1} />
                            </div>
                            <div className="md:w-1/2">
                                <h5 className="text-2xl font-bold">Products of world famous brand</h5>
                                <p className="text-base font-medium text-[#000000BF] md:w-6/12">We focus on sourcing and distribute affordable new products of world famous brand from the very fast moving beauty world.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row-reverse items-center md:gap-9">
                            <div className="w-[300px] md:h-[300px]">
                                <ImageURL className={" max-h-full w-full"} image={image2} />
                            </div>
                            <div className="md:w-4/12">
                                <h5 className="text-2xl font-bold">Widest range of beauty products </h5>
                                <p className="text-base font-medium text-[#000000BF]">We stock one of the widest range of beauty products available and are constantly sourcing and evaluating new products from all over the world.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FFF2F7]">
                    <div className="container mx-auto px-[10px] grid grid-cols-1 md:grid-cols-2 p-16">
                        <div className="">
                            <ImageURL className={" max-h-full w-full"} image={grid1} />
                        </div>
                        <div className="relative">
                            <ImageURL className={" max-h-full w-full"} image={grid2} />
                            <div className="absolute top-0  h-full w-full flex justify-center items-center p-5 lg:p-16">
                                <div>
                                    <div className=" flex justify-center">
                                        <h5 className="pb-2 border-b-2 border-white text-white text-center font-Inter text-base md:text-2xl lg:text-[48px] font-bold leading-normal w-fit mb-3 lg:mb-8">Our Mission</h5>
                                    </div>
                                    <p className="text-white text-center font-Inter text-xs md:text-base font-medium md:leading-6">
                                        Our group of experts and trainees is dedicated to excellence across the board for our company. This covers the caliber of the tools, the instruction, and the team's constant follow-up and customer care! We
                                        collaborate closely with the companies we serve to provide dependent-on-experience recommendations, upskill staff members, and generally improve their own businesses.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <ImageURL className={" max-h-full w-full"} image={grid2} />
                            <div className="absolute top-0  h-full w-full flex justify-center items-center p-5 lg:p-16">
                                <div>
                                    <div className=" flex justify-center">
                                        <h5 className="pb-2 border-b-2 border-white text-white text-center font-Inter text-base md:text-2xl lg:text-[48px] font-bold leading-normal w-fit mb-3 lg:mb-8">Our Mission</h5>
                                    </div>
                                    <p className="text-white text-center font-Inter text-xs md:text-base font-medium md:leading-6">
                                        Our group of experts and trainees is dedicated to excellence across the board for our company. This covers the caliber of the tools, the instruction, and the team's constant follow-up and customer care! We
                                        collaborate closely with the companies we serve to provide dependent-on-experience recommendations, upskill staff members, and generally improve their own businesses.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className=" scale-[102%] object-center">
                            <ImageURL className={" max-h-full w-full"} image={grid4} />
                        </div>
                    </div>
                </div>
              
                <div className="bg-white py-7 md:py-14">
                    <div className="px-[10px] container mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-3 gap-y-4 ">
                       
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="bg-primary-color p-3 rounded-full">
                                <LiaTruckMovingSolid size={25} className="text-white" />
                            </div>
                            <div>
                                <h5 className="border-b-[1px] pb-[1px] mb-1 text-black font-inter text-sm font-bold leading-normal">Nation Wide Shipping</h5>
                                <p className="text-[#00000080] text-[11px] font-medium leading-[14px] mb-[2px]">Inside Dhaka Within 2 Days</p>
                                <p className="text-[#00000080] text-[11px] font-medium leading-[14px]">Outside Dhaka Within 3 Days</p>
                            </div>
                        </div>
                     
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="bg-primary-color p-3 rounded-full">
                                <TbCertificate size={25} className="text-white" />
                            </div>
                            <div>
                                <h5 className="border-b-[1px] pb-[1px] mb-1 text-black font-inter text-sm font-bold leading-normal">Secure Payment Method</h5>
                                <p className="text-[#00000080] text-[11px] font-medium leading-[14px] mb-[2px]">100% secure online payment method</p>
                            </div>
                        </div>
                     
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="bg-primary-color p-3 rounded-full">
                                <SlBadge size={25} className="text-white" />
                            </div>
                            <div>
                                <h5 className="border-b-[1px] pb-[1px] mb-1 text-black font-inter text-sm font-bold leading-normal">100% Authentic</h5>
                                <p className="text-[#00000080] text-[11px] font-medium leading-[14px] mb-[2px]">Products Sourced Directly</p>
                            </div>
                        </div>
                   
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="bg-primary-color p-3 rounded-full">
                                <TbTag size={25} className="text-white" />
                            </div>
                            <div>
                                <h5 className="border-b-[1px] pb-[1px] mb-1 text-black font-inter text-sm font-bold leading-normal">1900+ Brands</h5>
                                <p className="text-[#00000080] text-[11px] font-medium leading-[14px] mb-[2px]">1.2 Lakh+ Products</p>
                            </div>
                        </div>
                     
                    </div>
                </div>
               
            </div> */}
            <ScrollRestoration/>
        </div>
    );
};

export default WhoWeAre;
