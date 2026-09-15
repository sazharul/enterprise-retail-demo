/* eslint-disable react/prop-types */
import React from "react";
import {Link} from "react-router-dom";
import Button from "../../../../components/ui/Button";
import {FaAngleRight} from "react-icons/fa6";
import moment from "moment";
import ImageURL from "../../../../components/ImageURL/ImageURL";

const PerOrder = ({item}) => {
    // let orderListOuter = [];
    // let orderList = [];
    // if (item?.order_details !== null && item?.order_details?.length > 0) {
    //     item?.order_details?.forEach((element) => {
    //         if (element?.combo_id === null && element?.buy_get_id === null) {
    //             orderList.push([element]);
    //         } else {
    //             if (element?.combo_id !== null) {
    //                 if (orderList?.filter((el) => el?.filter((e) => e?.combo_id === element?.combo_id)?.length > 0)?.length === 0) {
    //                     orderList.push(item?.order_details?.filter((el) => el?.combo_id === element?.combo_id));
    //                 }
    //             } else if (element?.buy_get_id !== null) {
    //                 if (orderList?.filter((el) => el?.filter((e) => e?.buy_get_id === element?.buy_get_id)?.length > 0).length === 0) {
    //                     orderList?.push(item?.order_details?.filter((el) => el?.buy_get_id === element?.buy_get_id));
    //                 }
    //             }
    //         }
    //     });
    // }

    // orderListOuter.push(...orderList);
    //

    return (
        <div className="border rounded-lg border-[#E2E8F0] mb-3">
            <div className="border-b-[0.5px] border-[#ECECEC] py-2 md:oy-2 lg:py-4 px-2 xs:px-4 lg:px-8">
                <div className="flex justify-between items-center ">
                    <div>
                        <p className="text-[#000000A6] font-inter text-[10px] xs:text-xs md:text-sm font-medium leading-normal">Status</p>
                        <p className="text-black font-inter text-[10px] xs:text-sm md:text-base font-semibold leading-normal tracking-[-0.16px]">
                            {item?.status == 1 && "Pending"}
                            {item?.status == 2 && "Accepted"}
                            {item?.status == 3 && "Shipped"}
                            {item?.status == 4 && "Delivered"}
                            {item?.status == 5 && item?.cancel_from}
                            {item?.status == 6 && "Hold"}
                            {/* 1=pending, 2accepted, 3shipped, 4 delivered, 5cancelled */}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#000000A6] font-inter text-[10px] xs:text-xs md:text-sm font-medium leading-normal">Order Number</p>
                        <p className="text-black font-inter text-[10px] xs:text-sm md:text-base font-semibold leading-normal tracking-[-0.16px]">{item?.order_no}</p>
                    </div>
                    <div>
                        <p className="text-[#000000A6] font-inter text-[10px] xs:text-xs md:text-sm font-medium leading-normal">Total Amount</p>
                        <p className="text-black font-inter text-[10px] xs:text-sm md:text-base font-semibold leading-normal tracking-[-0.16px]">৳ {parseFloat(item?.grand_total).toFixed(2)}</p>
                    </div>
                    <div>
                        <Link to={`/my-account/my-orders/order-details/${item?.id}`}>
                            <Button className={""}>
                                <span className="hidden xs:block">See Details</span>
                                <span className="block xs:hidden">
                                    <FaAngleRight/>
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="py-2 md:py-4 px-2 xs:px-4 lg:px-8">
                <>
                    {item?.status == 4 ? (
                        <p className="mb-3 md:mb-6 text-black font-inter text-sm md:text-base font-medium leading-normal">Delivered
                            on: {moment(item?.updated_at).add(2, "days").format("DD MMM, YYYY")}</p>
                    ) : item?.status == 5 ? (
                        <p className="mb-3 md:mb-6 text-black font-inter text-sm md:text-base font-medium leading-normal">Cancelled
                            at: {moment(item?.updated_at).add(2, "days").format("DD MMM, YYYY")}</p>
                    ) : (
                        <p className="mb-3 md:mb-6 text-black font-inter text-sm md:text-base font-medium leading-normal">Estimated
                            Delivery: {moment(item?.created_at).add(2, "days").format("DD MMM, YYYY")}</p>
                    )}
                </>

                {item?.order_details?.map((product, i) => (
                    <div key={i} className="flex justify-between mb-3 pb-3 border-b-[0.5px]">
                        <div className="flex gap-4 w-full">
                            <ImageURL image={product?.[0]?.combo?.image ? product?.[0]?.combo?.image : product?.[0]?.product_image}
                                      className="rounded-[4px] border-[0.2px] border-[#CECECE] h-16 md:h-24 w-16 md:w-24"/>

                            <div className="flex flex-col md:flex-row justify-between gap-1 w-full">
                                <div className=" w-full">
                                    {product?.[0]?.buy_get_offer_name &&
                                        <h4 className="w-min  whitespace-nowrap text-[#0094CF] text-[9px] font-medium bg-[#D4F3FF] px-[8px] py-[2px] rounded-md">{product?.[0]?.buy_get_offer_name}</h4>}
                                    {product?.[0]?.combo_offer_name &&
                                        <h4 className="w-min whitespace-nowrap text-[#0094CF] text-[9px] font-medium bg-[#D4F3FF] px-[8px] py-[2px] rounded-md ">Combo Offer</h4>}
                                    {product?.[0]?.combo?.name && <p className=" text-black text-xs md:text-base font-bold leading-normal flex">{product?.[0]?.combo?.name}</p>}
                                    {product?.map((element, i) => (
                                        <div key={i} className="flex flex-col">
                                            <p className="text-black text-sm xs:text-base font-medium leading-5">{element?.product_name && element?.product_name?.length > 40 ? `${element?.product_name.slice(0, 40)}...` : element?.product_name}</p>
                                            <div className="flex flex-wrap gap-x-2 justify-between items-center">
                                                <div className="text-[#000000A6] flex items-center gap-5 text-opacity-65 font-inter text-xs font-normal leading-normal">
                                                    {element?.shade_id ? (
                                                        <div className="flex items-center gap-1">
                                                            <p className="text-[#000000CC]  font-inter text-xs font-medium leading-normal">
                                                                <span className="font-semibold">Shade:</span> {element?.shade}
                                                            </p>
                                                        </div>
                                                    ) : element?.size_id ? (
                                                        <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                                                            <span className="text-[#000000CC] font-medium">
                                                                <span className="font-semibold">Size:</span>
                                                                {element?.size}
                                                            </span>
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                    <p>
                                                        Qty: <span className="text-[#000000CC] font-medium">{element?.quantity}</span>
                                                    </p>
                                                </div>
                                                {element?.combo == null && (
                                                    <>
                                                        {" "}
                                                        {element?.discounted_price > 0 && (
                                                            <div className="text-[#000000A6] flex items-center gap-5 text-opacity-65 font-inter text-xs font-normal leading-normal">
                                                                <div className="flex gap-2 items-center md:mb-1">
                                                                    <p className="text-[#000000A6] text-[10px]  md:text-xs font-medium line-through">৳ {element?.price}</p>
                                                                    <p className="text-black text-xs md:text-base font-bold leading-normal">৳ {element?.discounted_price}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                </div>
                                {product?.[0]?.combo?.discounted_price > 0 && (
                                    <p className="text-black text-xs md:text-base font-bold leading-normal flex">
                                        ৳ <span className="text-black text-xs md:text-base font-bold leading-normal ps-1">{product?.[0]?.combo?.discounted_price}</span>{" "}
                                    </p>
                                )}

                                {/* <p className="text-[#02792A]  text-[10px] md:text-xs font-semibold leading-normal ">
                                    (-25% Off)
                                </p> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerOrder;
