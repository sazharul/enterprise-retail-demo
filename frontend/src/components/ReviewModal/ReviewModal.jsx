import {Divider, Modal} from "antd";
import React, {useContext, useState} from "react";
import {IoMdClose} from "react-icons/io";
import ReviewSlider from "../ReviewSlider/ReviewSlider";
import {BsCheck, BsPersonCircle} from "react-icons/bs";
import {GoStarFill} from "react-icons/go";
import moment from "moment";
import ImageURL from "../ImageURL/ImageURL";
import Button from "../ui/Button";
import {FiThumbsUp} from "react-icons/fi";
import {LogicProviderContext} from "../../providers/LogicProvider";
import {useReviewHelpfulMutation} from "../../redux/features/review/reviewApi";
import useAuthUser from "../../hooks/useAuthUser";
import showToast from "../../utilities/showToast";
import {Link} from "react-router-dom";

const ReviewModal = () => {
    const {isReviewModalOpen, reviewModalData, handleCancelReviewModal, setIsHelpfulRefetch} = useContext(LogicProviderContext);
    // 
    const [helpful, {data: helpfulData}] = useReviewHelpfulMutation();
    const [isHelpfulUpdated, setIsHelpfulUpdated] = useState(false);
    const {userData} = useAuthUser();
    const handleHelpful = async (id) => {
        const res = await helpful({product_review_id: id, user_id: userData?.data?.id});
        if (res?.data?.status) {
            setIsHelpfulRefetch((prev) => !prev)
            setIsHelpfulUpdated(!isHelpfulUpdated);
            showToast(res?.data?.message);
        }
    };
    return (
        <Modal
            // title="Cancel Order"
            open={isReviewModalOpen}
            onCancel={handleCancelReviewModal}
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
                <div onClick={handleCancelReviewModal} className="absolute top-2 left-2 md:top-7 md:left-7 z-10 bg-[#00000080] rounded-full p-1 md:p-2 hover:cursor-pointer">
                    <IoMdClose className="text-white"/>
                </div>
                <div className="flex flex-col md:flex-row items-start gap-5">
                    {/* carousel start */}
                    <div className="md:w-6/12 w-full">{isReviewModalOpen && <ReviewSlider modalData={reviewModalData}/>}</div>
                    {/* carousel end */}
                    <div className="border-b-[1px] py-3 md:py-6 md:w-6/12 px-2 md:px-5">
                        <div className="flex flex-col items-start gap-3 md:gap-7 ">
                            <div className="flex items-center gap-2 w-full pb-3 border-b-[1px]">
                                <div>
                                    <BsPersonCircle size={35} className=" text-[#D9D9D9]"/>
                                </div>
                                <div>
                                    <p className="text-black font-bold text-sm leading-normal whitespace-nowrap">{reviewModalData?.user?.name}</p>
                                    <div className="flex items-center gap-1">
                                        <BsCheck size={12} className=" text-white bg-[#5dc9f4] rounded-full"/>
                                        <p className="text-[#000000A6] text-[10px] font-medium leading-normal whitespace-nowrap">Verified Buyers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full">
                                    <div className="flex flex-wrap gap-y-2 items-start justify-between w-full  mb-4">
                                        <div className="flex items-center">
                                            <div className="bg-[#5dc9f4] text-white rounded-md flex justify-center items-center gap-1 py-[6px] px-2">
                                                <p>{reviewModalData?.star}</p>
                                                <GoStarFill size={15} className="text-white"/>
                                            </div>
                                            {/* {reviewModalData?.size?.id ? (
                                                <>
                                                    <Divider className="h-6" type="vertical" />
                                                    <p className="text-[#000000A6] text-sm font-medium leading-normal ms-2">{reviewModalData?.size?.name}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <Divider className="h-6" type="vertical" />
                                                    <p className="text-[#000000A6] text-sm font-medium leading-normal ms-2">{reviewModalData?.shade?.name}</p>
                                                </>
                                            )} */}
                                            {/* <p className="text-[#000000A6] text-sm font-medium leading-normal ms-2">Nude Shade Color</p> */}
                                        </div>
                                        <p className="text-[#000000CC] text-xs font-normal leading-normal">{moment(reviewModalData?.created_at).format("MMM DD, YYYY")}</p>
                                    </div>
                                    <div>
                                        <p className="text-black text-sm font-semibold leading-normal"> {reviewModalData?.title}</p>
                                        <p className="text-[#000000A6] text-sm font-normal leading-normal mb-4">{reviewModalData?.comment}</p>
                                        <div className="flex items-center gap-4 mb-4">
                                            {reviewModalData?.product_review_images?.map((reviewImage, index) => (
                                                <div key={index} className="w-[40px] object-cover">
                                                    <ImageURL className={"h-full w-full object-cover"} image={reviewImage?.image}/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* {userData?.status == true ? (
                                        <Button
                                            onClick={() => {
                                                handleHelpful(reviewModalData?.id);
                                            }}
                                            className={`text-primary-color rounded-sm `}
                                            variant={reviewModalData?.review_helpful?.[0]?.helpful == "1" ? "" : "bordered"}
                                        >
                                            <span className={`flex items-center gap-1 ${reviewModalData?.review_helpful?.[0]?.helpful == "1" && "text-white"}`}>
                                                {" "}
                                                <FiThumbsUp size={18} />
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
                                                    <FiThumbsUp size={18} />
                                                    Helpful
                                                </span>
                                            </Button>
                                        </Link>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ReviewModal;
