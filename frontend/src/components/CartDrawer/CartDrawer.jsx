import {Icon} from "@iconify/react";
import {Drawer} from "antd";
import Lottie from "lottie-react";
import React, {useContext} from "react";
import {FaArrowLeftLong} from "react-icons/fa6";
import {GoArrowRight} from "react-icons/go";
import {Link} from "react-router-dom";
import cartLottie from "../../assets/LottieAnimations/emptyCart.json";
import {LogicProviderContext} from "../../providers/LogicProvider";
import {getCouponDiscountAmountFromStorage} from "../../utilities/couponHandler";
import MainButton from "../Buttons/MainButton/MainButton";
import CartCard from "../allCards/CartCard/CartCard";
import Button from "../ui/Button";

import useCartData from "../../hooks/useCartData";
import {useGetRewardPointsDataQuery} from "../../redux/features/rewardPoints/rewardPointsApi";
import {cartTotalDiscountPrice, cartTotalPrice} from "../../utilities/cartTotalPriceAndDiscount";
import {getRewardPointsFromStorage} from "../../utilities/rewardPointsHandler";
import {useGetContactQuery} from "../../redux/features/contact/contactApi";
import Swal from "sweetalert2";
import {useShippingChargeQuery} from "../../redux/features/shippingCharge/shippingChargeApi";

const CartDrawer = () => {
    const {open, setOpen, setApplyCouponOpen, setApplyRewardPointOpen} = useContext(LogicProviderContext);
    const onClose = () => {
        setOpen(false);
    };
    const {data: getRewardPointsDataQuery} = useGetRewardPointsDataQuery();
    const storedCouponDiscountAmount = getCouponDiscountAmountFromStorage();
    const savedRewardPoints = getRewardPointsFromStorage();
    const {cartData, cartIsLoading} = useCartData();
    const {data: getContactQuery} = useGetContactQuery();
    const {data: shippingChargeQuery} = useShippingChargeQuery(undefined);
    const cartDataArray = cartData?.data?.cartData;
    const discountTotalPrice = cartTotalDiscountPrice(cartDataArray);
    const subTotalPrice = cartTotalPrice(cartDataArray);
    const hasCartItem = cartData?.data?.cartData?.length > 0; // Check if there are items in the cart

    const handleServiceOff = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${getContactQuery?.data?.buy_status_note}`,
        });
    };

    return (
        <div>
            <Drawer
                title={
                    <span className="text-black font-inter text-[24px] font-semibold leading-normal">
                        My Bag
                        <span className="text-[#000000A6] font-inter text-base font-normal leading-normal">({cartData?.data?.cartData?.length} Items)</span>
                    </span>
                }
                placement={"right"}
                width={500}
                onClose={onClose}
                open={open}
                closeIcon={<FaArrowLeftLong style={{fontSize: "24px", color: "black"}}/>} // Custom close icon
                className="relative"
            >
                <div className="h-full">
                    {hasCartItem ? (
                        // if any item is added to cart start
                        <div className="flex flex-col justify-between h-[calc(100vh-195px)] overflow-y-auto slim-scroll p-3">
                            <div>
                                {cartData?.data?.cartData?.map((item, index) => (
                                    <CartCard key={index} className={"mb-3"} item={item}/>
                                ))}

                                <div onClick={() => setApplyCouponOpen(true)}
                                     className="border-[0.5px] bg-white rounded flex items-center justify-between w-full mb-3 p-3 hover:cursor-pointer">
                                    <div className="flex items-center  gap-3 ">
                                        {" "}
                                        <div className="bg-[#d4f3ff] rounded-full p-2 h-min">
                                            <Icon icon="mdi:coupon-outline" width="24" height="24" className="text-[#0094CF]"/>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex flex-wrap gap-x-2 justify-between ">
                                                <p className="text-black font-inter text-sm font-medium leading-normal">Coupons</p>
                                            </div>
                                            {storedCouponDiscountAmount > 0 ? (
                                                <p className="text-[#02792a] font-inter text-sm font-medium leading-normal">Coupon applied</p>
                                            ) : (
                                                <p className="text-[#0094CF] font-inter text-sm font-medium leading-normal">Apply coupon</p>
                                            )}
                                        </div>
                                    </div>
                                    {storedCouponDiscountAmount > 0 &&
                                        <p className="text-black text-right font-inter text-sm font-semibold leading-normal">-৳ {storedCouponDiscountAmount}</p>}
                                </div>
                                <div onClick={() => setApplyRewardPointOpen(true)}
                                     className="border-[0.5px] bg-white rounded flex items-center justify-between w-full mb-3 p-3 hover:cursor-pointer">
                                    <div className="flex items-center  gap-3">
                                        <div className="bg-[#d4f3ff] rounded-full p-[6px] h-min">
                                            <Icon icon="mdi:star-circle-outline" width="28" height="28" className="text-[#0094CF]"/>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex flex-wrap gap-x-2 justify-between ">
                                                <span className="text-black font-inter text-sm font-medium leading-normal flex items-center gap-[6px]">
                                                    <p>Reward Points</p>
                                                    <Icon icon="zondicons:exclamation-outline" className="text-[#00000080]" width="15" height="15" rotate={2}/>
                                                </span>
                                            </div>
                                            {savedRewardPoints > 0 ? (
                                                <p className="text-[#02792a] font-inter text-sm font-medium leading-normal">Reward points applied</p>
                                            ) : (
                                                <p className="text-[#0094CF] font-inter text-sm font-medium leading-normal">Redeem your reward points!</p>
                                            )}
                                        </div>
                                    </div>
                                    {savedRewardPoints &&
                                        <p className="text-black text-right font-inter text-sm font-semibold leading-normal whitespace-nowrap">-৳ {savedRewardPoints * getRewardPointsDataQuery?.data?.reward_point_value}</p>}
                                </div>
                                <div className="border-[0.5px] bg-white rounded   w-full mb-3 p-3">
                                    <h4 className="text-black font-inter text-base font-semibold leading-normal mb-3">Order Summary</h4>
                                    <div className="border-b-[0.5px] mb-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-black font-inter text-sm font-medium leading-normal">
                                                Items Subtotal
                                                <span className="text-[#000000A6] font-inter text-sm font-normal leading-normal">({cartData?.data?.cartData?.length} Items)</span>
                                            </p>
                                            <p className="text-black text-right font-inter text-sm font-medium leading-normal">৳ {(subTotalPrice - discountTotalPrice).toFixed(2)}</p>
                                        </div>
                                        {/* <div className="flex justify-between items-center mb-2">
                      <p className="text-black font-inter text-sm font-medium leading-normal">Discount</p>
                      <p className="text-black text-right font-inter text-sm font-medium leading-normal">-৳ {discountTotalPrice.toFixed(2)}</p>
                    </div> */}

                                        {cartData?.data?.uptoSaleDiscount > 0 && (
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-black font-inter text-sm font-medium leading-normal">Discount (Upto sale offer)</p>
                                                <p className="text-black text-right font-inter text-sm font-medium leading-normal">-৳ {cartData?.data?.uptoSaleDiscount}</p>
                                            </div>
                                        )}

                                        {storedCouponDiscountAmount > 0 && (
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-black font-inter text-sm font-medium leading-normal">Coupon Discount</p>
                                                <p className="text-black text-right font-inter text-sm font-medium leading-normal">-৳ {storedCouponDiscountAmount}</p>
                                            </div>
                                        )}
                                        {savedRewardPoints > 0 && (
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-black font-inter text-sm font-medium leading-normal">Reward points discount</p>
                                                <p className="text-black text-right font-inter text-sm font-medium leading-normal">-৳ {savedRewardPoints * getRewardPointsDataQuery?.data?.reward_point_value}</p>
                                            </div>
                                        )}

                                        {/* <div className="flex justify-between items-center mb-3">
                                            <p className="text-black font-inter text-sm font-medium leading-normal">Shipping Fee</p>
                                            <p className="text-black text-right font-inter text-sm font-medium leading-normal">৳ 100</p>
                                        </div> */}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-black font-inter text-base font-semibold leading-normal">Total</p>
                                        <p className="text-black text-right font-inter text-base font-semibold leading-normal">
                                            ৳ {(subTotalPrice - discountTotalPrice - cartData?.data?.uptoSaleDiscount - storedCouponDiscountAmount - savedRewardPoints * getRewardPointsDataQuery?.data?.reward_point_value).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white absolute bottom-0 left-0 w-full p-4" style={{boxShadow: "0px 0px 24px 0px rgba(228, 237, 240, 0.65)"}}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="text-[#000000CC] font-inter text-base font-normal leading-normal">Grand total</h5>
                                        <h4 className="text-black font-inter text-[20px] xs:text-[26px] font-bold leading-normal">
                                            ৳ {(subTotalPrice - discountTotalPrice - cartData?.data?.uptoSaleDiscount - storedCouponDiscountAmount - savedRewardPoints * getRewardPointsDataQuery?.data?.reward_point_value).toFixed(2)}
                                        </h4>
                                    </div>
                                    <>
                                        {getContactQuery?.data?.buy_status == 0 ? (
                                            <MainButton title={"Proceed"} handleSubmit={handleServiceOff} icon={<GoArrowRight size={20}/>} className={"py-3 px-8 xs:px-12"}/>
                                        ) : (
                                            <MainButton title={"Proceed"} handleSubmit={onClose} icon={<GoArrowRight size={20}/>} to={"/checkout"} className={"py-3 px-8 xs:px-12"}/>
                                        )}
                                    </>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // if any item is added to cart end
                        <div className="flex justify-center items-center h-full md:-mt-14">
                            <div>
                                <Lottie className="h-36 " animationData={cartLottie} loop={true}/>
                                <h4 className="text-black font-inter text-2xl font-semibold leading-normal mb-4 text-center">Your Shopping Bag is Empty</h4>
                                <p className="text-center mb-8">
                                    Looks like you haven’t made your choice yet, <br/> add all your favorite products
                                </p>
                                <div className="flex justify-center">
                                    <div className="w-10/12">
                                        <Link to="/">
                                            <Button onClick={onClose} title={"Start Shopping"} className={"w-full"}>
                                                Start Shopping
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Drawer>
        </div>
    );
};

export default CartDrawer;
