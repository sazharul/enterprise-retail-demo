import moment from "moment";
import React, {useState} from "react";
import {CiCalendar} from "react-icons/ci";
import {IoEyeOutline, IoPersonOutline} from "react-icons/io5";
import {Bars} from "react-loader-spinner";
import {ScrollRestoration, useParams} from "react-router-dom";
import BeautyAdviceDetailsTopBanner from "../../assets/BeautyAdviceDetails/beauty-advice-details-top-banner.png";
import bottomBanner from "../../assets/BeautyAdviceDetails/bottomBanner.jpg";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import ImageURL from "../../components/ImageURL/ImageURL";
import BeautyAdviceCard from "../../components/allCards/BeautyAdviceCard/BeautyAdviceCard";
import useBeautyAdviceBlogDetails from "../../hooks/useBeautyAdviceBlogDetails";
import useBeautyAdviceBlog from "../../hooks/useBeautyAdviceBlog";

const BeautyAdviceDetails = () => {
    const [current, setCurrent] = useState(3);
    const onChange = (page) => {
        setCurrent(page);
    };
    const paginationStyles = {
        borderRadius: "20px", // Adjust the border-radius value as needed
    };

    const {id} = useParams();

    const {blogDetailsData, isLoading} = useBeautyAdviceBlogDetails(id);

    const {blogData} = useBeautyAdviceBlog();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }
    return (
        <>
            {blogDetailsData?.status === true ? (
                <>
                    <div className="container mx-auto px-[10px] mb-10 md:mb-20">
                        <Breadcrumbs className={"mt-2 md:mt-5"} first={"Home"} second={"Beauty Advice"} secondLink={'/beauty-advice'} third={"Details"}/>
                        <h4 className="font-semibold text-xl md:text-3xl text-center mb-3 md:mb-8">{blogDetailsData?.data?.blog?.title}</h4>
                        <div className="w-full ">
                            <ImageURL className={"max-h-[200px] w-full"} image={blogDetailsData?.data?.blog?.thumbnail}/>
                            {/* <ImageURL className={" max-h-full w-full"} image={blogDetailsData?.data?.blog?.image} /> */}
                        </div>
                        <div className="flex items-center justify-between py-3 border-b-[1px]">
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <CiCalendar/>
                                    <p className="text-[#000000A6] font-Inter text-xs font-medium leading-normal tracking-tighter">{moment(blogDetailsData?.data?.blog?.created_at).format("MMM DD, YYYY")}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IoPersonOutline/>

                                    <p className="text-[#000000A6] font-Inter text-xs font-medium leading-normal tracking-tighter">
                                        Posted By: <span className="text-black font-semibold">GlowCart</span>
                                    </p>
                                </div>
                            </div>
                            {/* <div className="flex items-center gap-2">
                                <IoEyeOutline />
                                <p className="text-[#000000A6] font-Inter text-xs font-medium leading-normal tracking-tighter">144 users</p>
                            </div> */}
                        </div>
                        <div className="border-b-[1px] mb-3 md:mb-5">
                            {blogDetailsData?.data?.blog?.description && (
                                <div
                                    className="text-[#000000A6] font-Inter text-base font-normal leading-5  pb-2 my-2 md:my-4 md:w-10/12 mx-auto"
                                    dangerouslySetInnerHTML={{
                                        __html: blogDetailsData?.data?.blog?.description,
                                    }}
                                />
                            )}
                        </div>
                        {/*<ImageURL className={" max-h-full w-full"} image={bottomBanner}/>*/}
                    </div>
                    <div className="container mx-auto mb-10 md:mb-20">
                        <h5 className="text-black font-Inter text-[20px] font-semibold leading-normal ps-[10px] mb-2 md:mb-4">Related Beauty Advices </h5>
                        <CardCarousel
                            defaultSlidesToShow={blogData?.data?.length > 4 ? 4 : blogData?.data?.length < 2 ? 1 : blogData?.data?.length}
                            slidesToShowFor540={1}
                            slidesToShowFor640={2}
                            slidesToShowFor768={2}
                            slidesToShowFor1024={2}
                            slidesToShowFor1280={blogData?.data?.length > 4 ? 4 : blogData?.data?.length < 2 ? 1 : blogData?.data?.length}
                            slidesToShowFor1536={blogData?.data?.length > 4 ? 4 : blogData?.data?.length < 2 ? 1 : blogData?.data?.length}
                        >
                            {blogData.status === true &&
                                blogData?.data.map((blog, index) => (
                                    <div key={index} className="min-w-min px-[10px]">
                                        <BeautyAdviceCard key={index} {...blog} blog={blog}/>
                                    </div>
                                ))}
                        </CardCarousel>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                    <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
                </div>
            )}

            <ScrollRestoration/>
        </>
    );
};

export default BeautyAdviceDetails;
