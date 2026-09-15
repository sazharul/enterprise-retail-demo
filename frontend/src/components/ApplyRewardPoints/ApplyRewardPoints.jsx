import {Drawer} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {FaArrowLeftLong} from "react-icons/fa6";
import {twMerge} from "tailwind-merge";
import useAuthUser from "../../hooks/useAuthUser";
import useCartData from "../../hooks/useCartData";
import {LogicProviderContext} from "../../providers/LogicProvider";
import {useGetRewardPointsDataQuery} from "../../redux/features/rewardPoints/rewardPointsApi";
import {getCouponDiscountAmountFromStorage} from "../../utilities/couponHandler";
import {addRewardPointsToStorage} from "../../utilities/rewardPointsHandler";
import Button from "../ui/Button";

const ApplyRewardPoints = () => {
    const {applyRewardPointOpen, setApplyRewardPointOpen} = useContext(LogicProviderContext);
    const onClose = () => {
        setApplyRewardPointOpen(false);
    };
    const [rewardPoint, setRewardPoint] = useState(0);
    const {userData} = useAuthUser();
    const {cartData, cartIsLoading} = useCartData();
    const {data: getRewardPointsDataQuery} = useGetRewardPointsDataQuery();

    function cartTotalPrice(cartData) {
        let totalPrice = 0;
        for (let i = 0; i < cartData?.data?.cartData?.length; i++) {
            const currentItem = cartData?.data?.cartData?.[i];
            if (currentItem?.combo_product === null) {
                totalPrice +=
                    parseFloat(
                        currentItem?.shade !== null
                            ? parseFloat(currentItem?.shade?.product_shade?.shade_price) * parseInt(currentItem?.quantity)
                            : parseFloat(currentItem?.size?.product_size?.size_price)
                    ) * parseInt(currentItem?.quantity);
            } else {
                totalPrice += parseFloat(currentItem?.combo_product?.discounted_price) * parseInt(currentItem?.quantity);
            }
        }

        return totalPrice;
    }

    function cartTotalDiscountPrice(cartData) {
        let totalPrice = 0;

        for (let i = 0; i < cartData?.data?.cartData?.length; i++) {
            const currentItem = cartData?.data?.cartData?.[i];
            if (currentItem?.combo_product === null) {
                totalPrice +=
                    parseFloat(
                        currentItem?.shade !== null
                            ? parseFloat(currentItem?.shade?.product_shade?.flat_discount) * parseInt(currentItem?.quantity)
                            : parseFloat(currentItem?.size?.product_size?.flat_discount)
                    ) * parseInt(currentItem?.quantity);
            }
        }
        return totalPrice;
    }

    const subTotalPrice = cartTotalPrice(cartData);
    const discountTotalPrice = cartTotalDiscountPrice(cartData);
    const storedCouponDiscountAmount = getCouponDiscountAmountFromStorage();

    //

    function calculateRewardPointsValue(subTotalPrice, discountTotalPrice, storedCouponDiscountAmount, rewardPointValue, rewardPoint) {
        return ((subTotalPrice - discountTotalPrice - cartData?.data?.uptoSaleDiscount - storedCouponDiscountAmount) / rewardPointValue) * rewardPoint;
    }

    //
    //   const reducedPointValue  = calculateRewardPointsValue(subTotalPrice, discountTotalPrice, storedCouponDiscountAmount, getRewardPointsDataQuery?.data?.reward_point_value, getRewardPointsDataQuery?.data?.reward_point)
    //

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm();
    const inputValue = watch("rewardPoint");

    useEffect(() => {
        const rewardPointValue = (inputValue / getRewardPointsDataQuery?.data?.reward_point) * getRewardPointsDataQuery?.data?.reward_point_value;
        let userReward = parseFloat(userData?.data?.reward_points);
        if (rewardPointValue <= subTotalPrice - discountTotalPrice - cartData?.data?.uptoSaleDiscount - storedCouponDiscountAmount) {
            if (userReward >= rewardPointValue) {
                setRewardPoint(rewardPointValue);
            } else {
                setRewardPoint(userReward);
            }
        } else {
            let reducedPointValue = calculateRewardPointsValue(
                subTotalPrice,
                discountTotalPrice,
                storedCouponDiscountAmount,
                getRewardPointsDataQuery?.data?.reward_point_value,
                getRewardPointsDataQuery?.data?.reward_point
            );

            if (userReward >= reducedPointValue) {
                setRewardPoint(reducedPointValue);
            } else {
                setRewardPoint(userReward);
                reducedPointValue = userReward;
            }
            // setRewardPoint(Math.floor(reducedPointValue));
            setValue("rewardPoint", Math.floor(reducedPointValue) || "");
            // toast.success('Reward points updated', { duration: 3000 });
            // showToast("Reward points updated");
        }
    }, [inputValue]);

    const onSubmit = (data) => {
        //
        addRewardPointsToStorage(data?.rewardPoint);
        onClose();
        // showToast(response?.data?.message);
        setValue("rewardPoint", "");
    };

    return (
        <div>
            <Drawer
                title={
                    <span className="text-black font-inter text-[24px] font-semibold leading-normal">
            Reward Points
            <span className="text-[#000000A6] font-inter text-base font-normal leading-normal"></span>
          </span>
                }
                placement={"right"}
                width={500}
                onClose={onClose}
                open={applyRewardPointOpen}
                closeIcon={<FaArrowLeftLong style={{fontSize: "24px", color: "black"}}/>} // Custom close icon
                className="relative"
            >
                <div>
                    <div className="flex flex-col justify-between h-[calc(100vh-195px)] overflow-y-auto slim-scroll p-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={twMerge("border-[0.5px] bg-white rounded p-3")}>
                                <div className="mb-[11px] ">
                                    <p className="text-black text-base font-medium">
                                        You have total <span className="font-bold">{userData?.data?.reward_points}</span> reward points to redeem
                                        {/* <FaStarOfLife size={6} className="text-[#F40F6F]" /> */}
                                    </p>
                                    <p className="text-black text-xs font-medium">
                                        The value of <span className="font-bold">{getRewardPointsDataQuery?.data?.reward_point}</span> reward point is{" "}
                                        <span className="font-bold">{getRewardPointsDataQuery?.data?.reward_point_value}</span> BDT.
                                    </p>
                                    <label>
                    <span className="flex text-sm font-medium my-3">
                      Reward Points
                        {/* <FaStarOfLife size={6} className="text-[#F40F6F]" /> */}
                    </span>
                                    </label>
                                    <span className="relative">
                    <input
                        {...register("rewardPoint", {
                            // required: true,
                            minLength: 1, // Minimum password length of 8 characters
                            pattern: /^[0-9]*$/,
                        })}
                        type="number"
                        placeholder="Enter redeemable points"
                        className="p-3 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black text-opacity-50 text-[14px] font-normal leading-normal tracking-[-0.14px] mb-2"
                    />
                  </span>

                                    {errors.rewardPoint && errors.rewardPoint.type === "minLength" && (
                                        <p className="text-red-500">Field must be at least 1 characters long</p>
                                    )}
                                    {errors.rewardPoint && errors.rewardPoint.type === "required" && <span className="text-red-600">This field is required</span>}
                                    {errors.rewardPoint && errors.rewardPoint.type === "pattern" && <span className="text-red-600">Please enter a valid number</span>}
                                    {/* {Math.floor(inputValue) == Math.floor(rewardPoint) && (
                                        <p className="text-black text-xs font-medium">
                                            (For this order, you can redeem the highest reward with{" "}
                                            <span className="font-bold">{Math.floor(rewardPoint)}</span> points.)
                                        </p>
                                    )} */}
                                </div>
                                <Button className="w-full py-3 mb-2">Redeem Points</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default ApplyRewardPoints;
