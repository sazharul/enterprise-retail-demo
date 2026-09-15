import {Icon} from "@iconify/react";
import {Drawer} from "antd";
import React, {useContext, useState} from "react";
import {FaArrowLeftLong} from "react-icons/fa6";
import CartCard from "../allCards/CartCard/CartCard";
import MainButton from "../Buttons/MainButton/MainButton";
import {HiOutlineArrowSmRight} from "react-icons/hi";
import {GoArrowRight} from "react-icons/go";
import {LogicProviderContext} from "../../providers/LogicProvider";
import Lottie from "lottie-react";
import cartLottie from "../../assets/LottieAnimations/emptyCart.json";
import WishListCard from "../allCards/WishListCard/WishListCard";
import {twMerge} from "tailwind-merge";
import {RiDeleteBin6Line} from "react-icons/ri";
import Button from "../ui/Button";
import {useForm} from "react-hook-form";
import {useGetCouponCodeMutation} from "../../redux/features/couponCode/couponCodeApi";
import showToast from "../../utilities/showToast";
import {addCouponCodeToStorage, addCouponDiscountAmountToStorage} from "../../utilities/couponHandler";
import {removeRewardPointsFromStorage} from "../../utilities/rewardPointsHandler";

const ApplyCouponCart = () => {
    const [getCouponCodeMutation, {data: couponCodeData, isLoading: couponCodeLoading}] = useGetCouponCodeMutation();
    const {applyCouponOpen, setApplyCouponOpen} = useContext(LogicProviderContext);
    const onClose = () => {
        setApplyCouponOpen(false);
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async (code) => {
        try {
            const response = await getCouponCodeMutation(code);
            if (response?.data?.status) {
                addCouponDiscountAmountToStorage(response?.data?.data?.amount.toString());
                addCouponCodeToStorage(code?.coupon_code);
                showToast(response?.data?.message);
                removeRewardPointsFromStorage();
                onClose();
            } else {
                showToast(response?.error?.data?.message, "error");
                // showToast("Your message goes here", "success", "top-end", 3000);
            }
        } catch (error) {
            // console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <Drawer
                title={
                    <span className="text-black font-inter text-[24px] font-semibold leading-normal">
            Apply Coupons <span className="text-[#000000A6] font-inter text-base font-normal leading-normal"></span>
          </span>
                }
                placement={"right"}
                width={500}
                onClose={onClose}
                open={applyCouponOpen}
                closeIcon={<FaArrowLeftLong style={{fontSize: "24px", color: "black"}}/>} // Custom close icon
                className="relative"
            >
                <div>
                    <div className="flex flex-col justify-between h-[calc(100vh-195px)] overflow-y-auto slim-scroll p-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={twMerge("border-[0.5px] bg-white rounded p-3")}>
                                <div className="mb-[11px] ">
                                    <label>
                    <span className="flex text-sm font-medium mb-3">
                      Coupon Code
                        {/* <FaStarOfLife size={6} className="text-[#F40F6F]" /> */}
                    </span>
                                    </label>
                                    <span className="relative">
                    <input
                        {...register("coupon_code", {
                            required: true,
                            minLength: 2, // Minimum password length of 8 characters
                        })}
                        type="text"
                        placeholder="Enter Coupon Code"
                        className="p-3 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-[14px] font-normal leading-normal tracking-[-0.14px] mb-2"
                    />
                  </span>
                                    {errors?.coupon_code?.type === "minLength" && <p className="text-red-500">Field must be at least 2 characters long</p>}
                                    {errors?.coupon_code && errors?.coupon_code?.type === "required" && <span className="text-red-600">This field is required</span>}
                                </div>
                                <Button type="submit" className="w-full py-3 mb-2">
                                    Apply Coupon Code
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default ApplyCouponCart;
