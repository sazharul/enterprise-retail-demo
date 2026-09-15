import {Divider} from "antd";
import moment from "moment";
import React, {useContext, useEffect, useState} from "react";
import {BsCheck, BsPersonCircle} from "react-icons/bs";
import {FaChevronDown} from "react-icons/fa6";
import {FiThumbsUp} from "react-icons/fi";
import {GoStarFill} from "react-icons/go";
import {Bars} from "react-loader-spinner";
import {Link, ScrollRestoration, useLocation, useParams} from "react-router-dom";
import AllReviewBadge from "../../assets/AllReviewPage/AllReviewBadge.svg";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ImageURL from "../../components/ImageURL/ImageURL";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import Button from "../../components/ui/Button";
import useAuthUser from "../../hooks/useAuthUser";
import {LogicProviderContext} from "../../providers/LogicProvider";
import {useProductDetailsMutation} from "../../redux/features/productDetails/productDetailsApi";
import {useGetReviewProductWiseMutation, useReviewHelpfulMutation} from "../../redux/features/review/reviewApi";
import showToast from "../../utilities/showToast";
import CreateReview from "../ProductDetails/CreateReview/CreateReview";
import PerReview from "../ProductDetails/PerReview/PerReview";
import noReviewImage from "../../assets/AllReviewPageWithNoReview/NoReview.svg";

const AllReviewPage = () => {
    const {id} = useParams();
    const location = useLocation();
    const [isCreateReview, setIsCreateReview] = useState(false);
    const [isWithImage, setIsWithImage] = useState(false);
    const [ratingCount, setRatingCount] = useState(null);
    const [ratingCountFive, setRatingCountFive] = useState(false);
    const [ratingCountFour, setRatingCountFour] = useState(false);
    const [ratingCountThree, setRatingCountThree] = useState(false);
    const [ratingCountTwo, setRatingCountTwo] = useState(false);
    const [ratingCountOne, setRatingCountOne] = useState(false);

    const [getReviewMutation, {data: getReviewData, isLoading}] = useGetReviewProductWiseMutation();
    const [productDetailsMutation, {data: singleProduct}] = useProductDetailsMutation();
    const {handleShowReviewModal, isHelpfulRefetch} = useContext(LogicProviderContext);
    const {userData} = useAuthUser();
    //
    const searchParams = new URLSearchParams(location.search);
    const selectedImage = searchParams.get("selected_image");
    const productName = searchParams.get("product_name");
    const averageRatingStar = searchParams.get("reviews_avg_star");
    const reviewEligible = searchParams.get("eligible");
    const isFromSingleOrder = searchParams.get("from-order");

    useEffect(() => {
        //
        if (isFromSingleOrder == "true") {
            setIsCreateReview(true);
        }
    }, [isFromSingleOrder]);

    useEffect(() => {
        //
        if (selectedImage == "true") {
            setIsWithImage(true);
        }
    }, [selectedImage]);
    useEffect(() => {
        if (ratingCountOne == true) {
            setRatingCount(1);
        } else if (ratingCountTwo == true) {
            setRatingCount(2);
        } else if (ratingCountThree == true) {
            setRatingCount(3);
        } else if (ratingCountFour == true) {
            setRatingCount(4);
        } else if (ratingCountFive == true) {
            setRatingCount(5);
        } else {
            setRatingCount(null);
        }
    }, [ratingCountOne, ratingCountTwo, ratingCountThree, ratingCountFour, ratingCountFive]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await productDetailsMutation({
                    id: id,
                    user_id: userData?.data?.id ? userData?.data?.id : null,
                });
                // You can do something with the response if needed
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchReviewData = async () => {
            const reviewFilterData = {
                product_id: id,
                ...(isWithImage == true && {with_image: 1}),
                ...(ratingCount > 0 && {rating: ratingCount}),
                user_id: userData?.data?.id ? userData?.data?.id : null,
            };

            try {
                const response = await getReviewMutation(reviewFilterData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchReviewData();
        fetchData();
    }, [userData?.status == true, id, isWithImage, ratingCount, isHelpfulRefetch]);

    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
    //             <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
    //         </div>
    //     );
    // }

    return (
        <div className="container mx-auto px-[10px]">
            <Breadcrumbs className={"mt-5 mb-3"} first={"Home"} second={"All Reviews"}/>
            {/* <div className="h-7"> */}
            <p className="text-black font-Inter text-base md:text-[20px] font-medium mb-3">{productName}</p>
            {/* </div> */}
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

                {/* new rating */}
                <>
                    <div className="flex items-center md:hidden gap-5">
                        {reviewEligible == "true" && (
                            <div>
                                <Button
                                    onClick={() => setIsCreateReview((prev) => !prev)}
                                    className="border-black text-black mt-2 px-3 rounded-md"
                                    variant="bordered"
                                >
                                    Write Review
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="py-2 md:px-5 md:pt-5">
                        <div className={`flex  ${isCreateReview ? "items-start" : "items-center"} gap-4 pb-2 md:pb-4`}>
                            {averageRatingStar !== "null" && (
                                <div className="flex items-center gap-2">
                                    <h1 className="text-black font-inter text-2xl md:text-5xl font-bold leading-normal">
                                        {averageRatingStar == null ? 0 : parseFloat(averageRatingStar).toFixed(2)}/<span className="font-medium">5</span>
                                    </h1>
                                    <div>
                                        <p className="text-black  text-sm font-semibold leading-normal">Overall Ratings</p>
                                        <p className="text-[#000000A6]  text-xs font-normal leading-normal">{getReviewData?.data?.data?.length} verified ratings</p>
                                    </div>
                                </div>
                            )}

                            {reviewEligible == "true" && (
                                <>
                                    <Divider className={`h-10 hidden md:block ${isCreateReview && "h-56"}`} type="vertical"/>
                                    {isCreateReview ? (
                                        <CreateReview className={"hidden md:block"} cancel={setIsCreateReview} myReview={singleProduct?.data?.product?.my_review}
                                                      order_id={singleProduct?.data?.product?.order_id}/>
                                    ) : (
                                        <div className="hidden md:flex items-center gap-5">
                                            <div>
                                                <p className="text-[#000000A6]  text-sm font-semibold leading-normal">Add your Review</p>
                                            </div>
                                            <div>
                                                <Button
                                                    onClick={() => setIsCreateReview((prev) => !prev)}
                                                    className="border-black text-black px-7 rounded-md"
                                                    variant="bordered"
                                                >
                                                    Write Review
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div>
                            {isCreateReview && (
                                <CreateReview className={"block md:hidden"} cancel={setIsCreateReview} myReview={singleProduct?.data?.product?.my_review}
                                              order_id={singleProduct?.data?.product?.order_id}/>
                            )}
                        </div>
                        <div className="border-t-[1px] border-b-[1px] py-5">
                            <p className={`text-[#000000A6] text-sm font-semibold leading-5  pb-[15px] text-black mb-1`}>Refine Reviews By</p>
                            <div className="flex flex-wrap items-center gap-3">
                                <div
                                    onClick={() => setIsWithImage(!isWithImage)}
                                    className={`${
                                        isWithImage && "text-white bg-primary-color border-primary-color"
                                    } font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF] border px-3 pb-2 hover:cursor-pointer`}
                                >
                                    With Images
                                </div>
                                <div
                                    onClick={() => {
                                        setRatingCountFive((prev) => !prev);
                                        setRatingCountOne(false);
                                        setRatingCountTwo(false);
                                        setRatingCountThree(false);
                                        setRatingCountFour(false);
                                    }}
                                    className={`${
                                        ratingCountFive && "text-white bg-primary-color border-primary-color"
                                    } font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF] border px-3 pb-2 hover:cursor-pointer`}
                                >
                                    5 Star
                                </div>
                                <div
                                    onClick={() => {
                                        setRatingCountFour((prev) => !prev);
                                        setRatingCountOne(false);
                                        setRatingCountTwo(false);
                                        setRatingCountThree(false);
                                        setRatingCountFive(false);
                                    }}
                                    className={`${
                                        ratingCountFour && "text-white bg-primary-color border-primary-color"
                                    } font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF] border px-3 pb-2 hover:cursor-pointer`}
                                >
                                    4 Star
                                </div>
                                <div
                                    onClick={() => {
                                        setRatingCountThree((prev) => !prev);
                                        setRatingCountOne(false);
                                        setRatingCountTwo(false);
                                        setRatingCountFour(false);
                                        setRatingCountFive(false);
                                    }}
                                    className={`${
                                        ratingCountThree && "text-white bg-primary-color border-primary-color"
                                    } font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF] border px-3 pb-2 hover:cursor-pointer`}
                                >
                                    3 Star
                                </div>
                                <div
                                    onClick={() => {
                                        setRatingCountTwo((prev) => !prev);
                                        setRatingCountOne(false);
                                        setRatingCountThree(false);
                                        setRatingCountFour(false);
                                        setRatingCountFive(false);
                                    }}
                                    className={`${
                                        ratingCountTwo && "text-white bg-primary-color border-primary-color"
                                    } font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF] border px-3 pb-2 hover:cursor-pointer`}
                                >
                                    2 Star
                                </div>
                                <div
                                    onClick={() => {
                                        setRatingCountOne((prev) => !prev);
                                        setRatingCountTwo(false);
                                        setRatingCountThree(false);
                                        setRatingCountFour(false);
                                        setRatingCountFive(false);
                                    }}
                                    className={`${
                                        ratingCountOne && "text-white bg-primary-color border-primary-color"
                                    } font-medium text-xs rounded-full pt-2 border-[#CECECE] text-[#000000BF] border px-3 pb-2 hover:cursor-pointer`}
                                >
                                    1 Star
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <p className={`text-[#000000A6] text-sm font-semibold leading-5 pt-3  md:pt-[15px] text-black mb-1`}>Most Useful Review</p>
                            <div className="w-full">
                                {/* per comment start*/}
                                {isLoading ? (
                                    <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                                        <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
                                    </div>
                                ) : getReviewData?.data?.data?.length > 0 ? (
                                    <>
                                        {getReviewData?.data?.data?.map((review, index) => (
                                            <PerReview key={index} review={review}/>
                                        ))}
                                    </>
                                ) : (
                                    <div className="">
                                        {/* no review image start */}
                                        <div className="flex justify-center mb-8">
                                            <div className="w- flex justify-center">
                                                <img className={" max-h-full w-full object-cover"} src={noReviewImage}/>
                                            </div>
                                        </div>
                                        {/* no review image end */}
                                        <h5 className="text-[#000000A6] font-Inter text-[24px] text-center font-medium leading-normal mb-2">Could not find any review</h5>

                                        <p className="text-[#000000A6] font-Inter text-[16px] text-center font-medium leading-normal mb-8">
                                            No review has been written for this particular selection of filter. <br/> We recommend that you
                                        </p>
                                        {/* <div className="flex justify-center">
                            <Button className="rounded px-20 xs:px-36 py-3" variant="bordered">
                                Clear Filters
                            </Button>
                        </div> */}
                                    </div>
                                )}

                                {/* per review end */}
                            </div>
                            {/* <Link to={`/all-review/${id}`}>
                                <div className="flex justify-center items-center gap-1 mt-4 mb-1 hover:cursor-pointer">
                                    <p className="font-semibold text-sm">Read more reviews</p>
                                    <FaChevronDown />
                                </div>
                            </Link> */}
                        </div>
                    </div>
                </>
                {/* new rating */}
            </div>
            {/* rating end*/}
            {/* comment modal start */}

            <ReviewModal/>
            {/* comment modal end*/}
            <ScrollRestoration/>
        </div>
    );
};

export default AllReviewPage;
