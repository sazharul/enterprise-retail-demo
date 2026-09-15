import React, {useEffect, useState} from "react";
import StarRating from "../../../components/StarRating/StarRating";
import {Select} from "antd";
import Button from "../../../components/ui/Button";
import {useMyReviewsQuery} from "../../../redux/features/review/reviewApi";
import {Bars} from "react-loader-spinner";
import ImageURL from "../../../components/ImageURL/ImageURL";
import moment from "moment";
import {Link} from "react-router-dom";

const MyRatingAndReviews = () => {
    const [sort, setSort] = useState("asc");
    const {data: myReview, isLoading: myReviewIsLoading, refetch: refetchMyReviews} = useMyReviewsQuery(sort);

    const handleChange = async (value) => {
        await setSort(value);
        await refetchMyReviews();
    };

    if (myReviewIsLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }
    return (
        <div style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}} className="rounded-lg bg-white">
            <div className="py-3 ps-3 px-1 xs:px-3 md:px-6 lg:px-8 md:py-2 lg:py-5 md:ps-6 lg:ps-8 border-b-[0.5px] border-[#ECECEC] flex flex-wrap md:gap-2 justify-between items-center">
                <h3 className="text-black text-opacity-80 font-inter text-xl lg:text-2xl font-semibold leading-[33.5px]">My Ratings & Reviews</h3>
                <div className="flex items-center">
                    <span className="me-2">Sort By:</span>
                    <Select
                        defaultValue="Most Recent"
                        style={{
                            width: 150,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: "desc",
                                label: "Most Recent",
                            },
                            {
                                value: "asc",
                                label: "Oldest",
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="pt-3 pb-3 px-1 xs:px-3 md:mb-3 md:pt-3 lg:pt-6 md:px-6 lg:px-8">
                {/* per order start  */}
                {myReview?.status == true &&
                    myReview?.data?.data?.map((review, i) => (
                        <div key={i} className="flex flex-col md:flex-row justify-between gap-2 md:gap-4 lg:gap-8">
                            <div className=" md:w-56 flex gap-2 flex-row md:flex-col">
                                <ImageURL image={review?.product?.image} className={"rounded-[4px] border-[0.2px] border-[#E2E8F0] h-24 md:h-[170px]  lg:h-[190px] mb-2"}/>
                                {/* <img className= src="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61bAczzhRrL._SL1500_.jpg" alt="" /> */}
                                <div>
                                    <p className="text-black font-inter text-xs font-medium leading-4 mb-2">{review?.product?.name}</p>
                                    {/* <p className="text-black font-inter text-sm font-bold leading-normal">৳550</p> */}
                                </div>
                            </div>
                            <div className=" w-full">
                                <div className="flex flex-wrap gap-2 justify-between">
                                    {" "}
                                    <div className="flex items-center gap-5 mb-3 lg:mb-5">
                                        <StarRating rating={review?.star} totalStars={5} size={24}/>
                                        <p className="text-black font-inter text-base font-medium leading-normal">{review?.star}</p>
                                    </div>
                                    <p className="text-[#000000CC] font-inter text-sm font-medium leading-normal">{moment(review?.created_at).format("MMM DD, YYYY")}</p>
                                </div>
                                <div>
                                    <p className="text-black font-inter text-sm font-semibold leading-5 mb-1">{review?.title}</p>
                                    {/* <p className="text-[#000000A6] font-inter text-sm font-normal leading-5 mb-2 lg:mb-4">
                                        It feels light and weightless and has a matte finish that looks fabulous and has a matte finish that looks out. This one feels non-sticky and repairs flakiness repairs as is infused ...
                                        <span className="font-semibold">Read More</span>
                                    </p> */}
                                    <p className="text-[#000000A6] font-inter text-sm font-normal leading-5 mb-2 lg:mb-4">{review?.comment}</p>
                                    <div className="flex gap-2 mb-2 lg:mb-4">
                                        {review?.product_review_images?.map((image, i) => (
                                            <ImageURL key={i} image={image} className={"rounded-[2px] h-16 w-16 mb-2"}/>
                                        ))}
                                        {/* <img className="rounded-[2px] h-16 w-16 mb-2" src="https://i0.wp.com/www.theluxeminimalist.com/wp-content/uploads/2020/07/Rouge-Hermes-Lipstick-Review5.png?resize=945%2C800&ssl=1" alt="" />
                                        <img className="rounded-[2px] h-16 w-16 mb-2" src="https://image.harrods.com/bobbi-brown-luxe-matte-lip-color_15157169_25816759_600.jpg" alt="" /> */}
                                    </div>
                                    <Link to={`/product-details/${review?.product?.id}`}>
                                        <Button variant="bordered">View Product</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                {/* per order end */}
            </div>
        </div>
    );
};

export default MyRatingAndReviews;
