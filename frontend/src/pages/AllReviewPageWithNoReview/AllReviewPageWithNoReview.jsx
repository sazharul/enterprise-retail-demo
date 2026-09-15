import React, {useState} from "react";
import Button from "../../components/ui/Button";
import {Divider, Modal} from "antd";
import CreateReview from "../ProductDetails/CreateReview/CreateReview";
import reviewImg1 from "../../assets/review-image/review1.png";
import reviewImg2 from "../../assets/review-image/review2.png";
import {BsCheck, BsPersonCircle} from "react-icons/bs";
import {GoStarFill} from "react-icons/go";
import {FiThumbsUp} from "react-icons/fi";
import {FaChevronDown} from "react-icons/fa6";
import {ScrollRestoration} from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import AllReviewBadge from "../../assets/AllReviewPage/AllReviewBadge.svg";
import noReviewImage from "../../assets/AllReviewPageWithNoReview/NoReview.svg";
import {IoMdClose} from "react-icons/io";
import ReviewSlider from "../../components/ReviewSlider/ReviewSlider";
import ImageURL from "../../components/ImageURL/ImageURL";

const AllReviewPageWithNoReview = () => {
    const [isCreateReview, setIsCreateReview] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto px-[10px]">
            <Breadcrumbs className={"mt-5 mb-3"} first={"Home"} second={"My Account"}/>
            <p className="text-black font-Inter text-base md:text-[20px] font-medium mb-3">
                Lakme Absolute Skin Dew Color Sensational Ultimattes Satin Lipstick - 102 Nude Rose - All Reviews
            </p>
            {/* rating start */}
            <div className="rounded p-1 mb-10 md:mb-20 " style={{boxShadow: "0px 0px 6px 0px #E4EDF0"}}>
                {/* <div className="border-b-[1px] flex justify-between md:px-5 overflow-hidden overflow-x-auto slim-scroll">
                                <p className={`text-[#000000A6] text-sm font-semibold leading-5 border-b-primary-color py-[15px] text-black`}>
                                    Ratings & Reviews
                                </p>
                                <div className="flex items-center md:hidden gap-5">
                                    <div>
                                        <Button
                                            onClick={() => setIsCreateReview((prev) => !prev)}
                                            className="border-black text-black px-3 rounded-md"
                                            variant="bordered"
                                        >
                                            Write Review
                                        </Button>
                                    </div>
                                </div>
                            </div> */}
                <div className="bg-[#D4F3FF] flex items-center gap-2 py-2 ps-2 md:ps-4 md:m-4 rounded-md">
                    <img src={AllReviewBadge} alt=""/>
                    <p className="text-[#000000A6] font-Inter text-sm font-medium">GlowCart is committed to showing genuine and verified reviews.</p>
                </div>
                <div className="py-2 md:p-5">
                    <div className={`flex  ${isCreateReview ? "items-start" : "items-center"} gap-2 xs:gap-4 pb-2 md:pb-4`}>
                        <div className="flex items-center gap-2">
                            <h1 className="text-black font-inter text-2xl md:text-5xl font-bold leading-normal">
                                4.3/<span className="font-medium">5</span>
                            </h1>
                            <div>
                                <p className="text-black text-[10px] xs:text-sm font-semibold leading-normal whitespace-nowrap">Overall Ratings</p>
                                <p className="text-[#000000A6]   text-[10px] xs:text-xs  font-normal leading-normal">234 verified ratings</p>
                            </div>
                        </div>

                        <Divider className={`h-10 hidden md:block ${isCreateReview && "h-56"}`} type="vertical"/>
                        {isCreateReview ? (
                            <CreateReview className={"hidden md:block"} cancel={setIsCreateReview}/>
                        ) : (
                            <div className="flex items-center gap-2 sm:gap-5">
                                <div>
                                    <p className="text-[#000000A6] hidden xs:block text-sm font-semibold leading-normal">Add your Review</p>
                                </div>
                                <div>
                                    <Button
                                        onClick={() => setIsCreateReview((prev) => !prev)}
                                        className="border-black text-black px-2 sm:px-7 rounded-md"
                                        variant="bordered"
                                    >
                                        Write Review
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>{isCreateReview && <CreateReview className={"block md:hidden"} cancel={setIsCreateReview}/>}</div>
                    <div className="border-t-[1px] border-b-[1px] py-5">
                        <p className={`text-[#000000A6] text-sm font-semibold leading-5  pb-[15px] text-black mb-1`}>Refine Reviews By</p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button className="font-medium text-xs rounded-full pt-2" variant="bordered">
                                Verified Buyers
                            </Button>
                            <Button className="font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF]" variant="bordered">
                                With Images
                            </Button>
                            <Button className="font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF]" variant="bordered">
                                5 Star
                            </Button>
                            <Button className="font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF]" variant="bordered">
                                4 Star
                            </Button>
                            <Button className="font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF]" variant="bordered">
                                3 Star
                            </Button>
                            <Button className="font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF]" variant="bordered">
                                2 Star
                            </Button>
                            <Button className="font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF]" variant="bordered">
                                1 Star
                            </Button>
                        </div>
                    </div>
                    {/* Could not find any review start */}
                    <div className="">
                        {/* no review image start */}
                        <div className="flex justify-center mb-8">
                            <div className="w- flex justify-center">
                                <ImageURL className={" max-h-full w-full object-cover"} image={noReviewImage}/>
                            </div>
                        </div>
                        {/* no review image end */}
                        <h5 className="text-[#000000A6] font-Inter text-[24px] text-center font-medium leading-normal mb-2">
                            Could not find any review
                        </h5>

                        <p className="text-[#000000A6] font-Inter text-[16px] text-center font-medium leading-normal mb-8">
                            No review has been written for this particular selection of filter. <br/> We recommend that you
                        </p>
                        <div className="flex justify-center">
                            <Button className="rounded px-20 xs:px-36 py-3" variant="bordered">
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                    {/* Could not find any review end */}
                </div>
            </div>
            {/* rating end*/}
            {/* comment modal start */}
            <Modal
                // title="Cancel Order"
                open={isModalOpen}
                onCancel={handleCancel}
                closeIcon={false}
                width={1000}
                okButtonProps={{
                    hidden: true,
                }}
                cancelButtonProps={{
                    hidden: true,
                }}
            >
                <div className="w-full relative">
                    <div
                        onClick={handleCancel}
                        className="absolute top-2 left-2 md:top-7 md:left-7 z-10 bg-[#00000080] rounded-full p-1 md:p-2 hover:cursor-pointer"
                    >
                        <IoMdClose className="text-white"/>
                    </div>
                    <div className="flex flex-col md:flex-row items-start gap-5">
                        {/* carousel start */}
                        <div className="md:w-6/12 w-full">
                            <ReviewSlider/>
                        </div>
                        {/* carousel end */}
                        <div className="border-b-[1px] py-3 md:py-6 md:w-6/12 px-2 md:px-5">
                            <div className="flex flex-col items-start gap-3 md:gap-7 ">
                                <div className="flex items-center gap-2 w-full pb-3 border-b-[1px]">
                                    <div>
                                        <BsPersonCircle size={35} className=" text-[#D9D9D9]"/>
                                    </div>
                                    <div>
                                        <p className="text-black font-bold text-sm leading-normal whitespace-nowrap">Vinod Kumar</p>
                                        <div className="flex items-center gap-1">
                                            <BsCheck size={12} className=" text-white bg-[#5dc9f4] rounded-full"/>
                                            <p className="text-[#000000A6] text-[10px] font-medium leading-normal whitespace-nowrap">
                                                Verified Buyers
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="w-full">
                                        <div className="flex flex-wrap gap-y-2 items-start justify-between w-full  mb-4">
                                            <div className="flex items-center">
                                                <div className="bg-[#5dc9f4] text-white rounded-md flex justify-center items-center gap-1 py-[6px] px-2">
                                                    <p>5</p>
                                                    <GoStarFill size={15} className="text-white"/>
                                                </div>
                                                <Divider className="h-6" type="vertical"/>
                                                <div className="rounded-md w-6 h-6 bg-[#BF2E4B]"></div>
                                                <p className="text-[#000000A6] text-sm font-medium leading-normal ms-2">Nude Shade Color</p>
                                            </div>
                                            <p className="text-[#000000CC] text-xs font-normal leading-normal">20 July 2023</p>
                                        </div>
                                        <div onClick={showModal}>
                                            <p className="text-black text-sm font-semibold leading-normal">“Velvet in bullet.....”</p>
                                            <p className="text-[#000000A6] text-sm font-normal leading-normal mb-4">
                                                It feels light and weightless and has a matte finish that looks fabulous on the pout. This one feels
                                                non-sticky and repairs flakiness as is infused with Avocado oil and hyalu...
                                                <span className="text-[#000000CC] font-medium">Read More</span>
                                            </p>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-1/12">
                                                    <img src={reviewImg1} alt=""/>
                                                </div>
                                                <div className="w-1/12">
                                                    <img src={reviewImg2} alt=""/>
                                                </div>
                                                <div className="w-1/12">
                                                    <img src={reviewImg1} alt=""/>
                                                </div>
                                                <div className="w-1/12">
                                                    <img src={reviewImg2} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <Button className="text-primary-color rounded-sm" variant="bordered">
                                            <span className="flex items-center gap-1">
                                                {" "}
                                                <FiThumbsUp size={18}/>
                                                Helpful
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* comment modal end*/}
            <ScrollRestoration/>
        </div>
    );
};

export default AllReviewPageWithNoReview;
