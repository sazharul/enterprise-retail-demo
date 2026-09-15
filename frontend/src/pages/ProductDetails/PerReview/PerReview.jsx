import {Divider} from "antd";
import React, {useContext, useState} from "react";
import {BsCheck, BsPersonCircle} from "react-icons/bs";
import {GoStarFill} from "react-icons/go";
import ImageURL from "../../../components/ImageURL/ImageURL";
import moment from "moment";
import {FiThumbsUp} from "react-icons/fi";
import {Link} from "react-router-dom";
import showToast from "../../../utilities/showToast";
import {LogicProviderContext} from "../../../providers/LogicProvider";
import {useReviewHelpfulMutation} from "../../../redux/features/review/reviewApi";
import useAuthUser from "../../../hooks/useAuthUser";
import Button from "../../../components/ui/Button";

const PerReview = ({review}) => {

    const {handleShowReviewModal, setIsHelpfulRefetch} = useContext(LogicProviderContext);
    const [helpful, {data: helpfulData}] = useReviewHelpfulMutation();
    const [isHelpfulUpdated, setIsHelpfulUpdated] = useState(false);
    const {userData} = useAuthUser();
    // 
    const handleHelpful = async (id) => {
        const res = await helpful({product_review_id: id, user_id: userData?.data?.id});
        if (res?.data?.status) {
            setIsHelpfulRefetch((prev) => !prev)
            setIsHelpfulUpdated(!isHelpfulUpdated);
            showToast(res?.data?.message);
        }
    };
    return (
        <div className="border-b-[1px] py-3 md:py-6 ">
            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-7 ">
                <div className="flex items-center gap-2 md:w-64">
                    <div>
                        <BsPersonCircle size={35} className=" text-[#D9D9D9]"/>
                    </div>
                    <div>
                        <p className="text-black font-bold text-sm leading-normal whitespace-nowrap">{review?.user?.name}</p>
                        <div className="flex items-center gap-1">
                            <BsCheck size={12} className=" text-white bg-[#5dc9f4] rounded-full"/>
                            <p className="text-[#000000A6] text-[10px] font-medium leading-normal whitespace-nowrap">Verified Buyers</p>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full">
                        <div className="flex items-start justify-between w-full mb-4">
                            <div className="flex items-center">
                                <div className="bg-[#5dc9f4] text-white rounded-md flex justify-center items-center gap-1 py-[6px] px-2">
                                    <p>{review?.star}</p>
                                    <GoStarFill size={15} className="text-white"/>
                                </div>
                                {/* {review?.size?.id ? (
                                    <>
                                    <Divider className="h-6" type="vertical" />
                                    <p className="text-[#000000A6] text-sm font-medium leading-normal ms-2">{review?.size?.name}</p>
                                    </>
                                ) : (
                                    <>
                                    <Divider className="h-6" type="vertical" />
                                        <p className="text-[#000000A6] text-sm font-medium leading-normal ms-2">{review?.shade?.name}</p>
                                    </>
                                )} */}
                            </div>
                            <p className="text-[#000000CC] text-xs font-normal leading-normal">{moment(review?.created_at).format("MMM DD, YYYY")}</p>
                        </div>
                        <div>
                            <p className="text-black text-sm font-semibold leading-normal">{review?.title}</p>
                            <p className="text-[#000000A6] text-sm font-normal leading-normal mb-4">
                                {review?.comment}
                                {/* <span className="text-[#000000CC] font-medium">Read More</span> */}
                            </p>
                            <div className="flex items-center flex-wrap gap-4 mb-4">
                                {review?.product_review_images?.map((reviewImage, index) => (
                                    <div onClick={() => handleShowReviewModal(review)} key={index} className="min-w-[55px] max-w-[40px]  md:max-w-[100px] hover:cursor-pointer">
                                        <ImageURL className={"h-full w-full object-cover"} image={reviewImage?.image}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {userData?.status == true ? (
                            <Button
                                onClick={() => {
                                    handleHelpful(review?.id);
                                }}
                                className={`text-primary-color rounded-sm `}
                                variant={review?.review_helpful?.[0]?.helpful == "1" ? "" : "bordered"}
                            >
                                <span className={`flex items-center gap-1 ${review?.review_helpful?.[0]?.helpful == "1" && "text-white"}`}>
                                    {" "}
                                    <FiThumbsUp size={18}/>
                                    Helpful
                                </span>
                            </Button>
                        ) : (
                            <Link to="/login-with-email">
                                <Button
                                    onClick={() => {
                                        showToast("Please login first to give Feedback");
                                    }}
                                    className={`text-primary-color rounded-sm`}
                                    variant="bordered"
                                >
                                    <span className="flex items-center gap-1">
                                        <FiThumbsUp size={18}/>
                                        Helpful
                                    </span>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerReview;
