import {ClockCircleOutlined, SmileOutlined} from "@ant-design/icons";
import {Divider, Modal, Timeline} from "antd";
import React, {useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {SearchSelectLabelLess} from "../../../components/SearchSelectLabelLess/SearchSelectLabelLess";
import Button from "../../../components/ui/Button";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useCancelOrderMutation, useOrderDetailsQuery, useOrderEditQuery, useOrderHistoryListQuery} from "../../../redux/features/order/orderApi";
import {Bars} from "react-loader-spinner";
import moment from "moment";
import ImageURL from "../../../components/ImageURL/ImageURL";
import Swal from "sweetalert2";
import showToast from "../../../utilities/showToast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCartData from "../../../hooks/useCartData";

AOS.init();

const MyOrderDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: orderDetailsQuery, isLoading: orderDetailsQueryLoading} = useOrderDetailsQuery(id);
    const {cartRefetch} = useCartData();
    const {refetch: orderHistoryRefetch} = useOrderHistoryListQuery();
    const axiosSecure = useAxiosSecure();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const demoList = [
        {
            value: "jack",
            label: "Jack",
        },
        {
            value: "lucy",
            label: "Lucy",
        },
        {
            value: "Yiminghe",
            label: "yiminghe",
        },
        {
            value: "disabled",
            label: "Disabled",
        },
    ];

    const [cancellationSelectedValue, setCancellationSelectedValue] = useState({});
    const [cancelOrderMutation] = useCancelOrderMutation();

    const handleEditOrder = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Editing this order will add its products back to the user's cart. Proceed with caution as this action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Edit it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // const response = await cancelOrderMutation(id);
                    const response = await axiosSecure.get(`/order-edit/${id}`);
                    if (response?.data?.status) {
                        navigate(`/my-account/my-orders`);
                        cartRefetch();
                        orderHistoryRefetch();
                        Swal.fire({
                            // title: "Cancelled!",
                            text: "Please check your cart",
                            icon: "success",
                        });
                    } else {
                        showToast(response?.error?.data?.message, "error");
                    }
                } catch (error) {
                    console.error("Error fetching data:", error.message);
                }
            }
        });
    };
    const handleCancelOrder = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await cancelOrderMutation(id);
                    if (response?.data?.status) {
                        navigate(`/my-account/my-orders`);
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your order has been cancelled.",
                            icon: "success",
                        });
                    } else {
                        showToast(response?.error?.data?.message, "error");
                    }
                } catch (error) {
                    console.error("Error fetching data:", error.message);
                }
            }
        });
    };

    if (orderDetailsQueryLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }

    return (
        <>
            <div style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}} className="rounded-lg bg-white">
                <div className="py-3 px-3 md:py-2 lg:py-5 md:px-6 lg:px-8 flex flex-wrap justify-between border-b-[0.5px] border-[#ECECEC]">
                    <h3 className="text-black text-opacity-80 font-inter font-semibold leading-[33.5px]">Estimated
                        Delivery: {moment(orderDetailsQuery?.data?.created_at).add(2, "days").format("DD MMM, YYYY")}</h3>
                    <div className="flex items-center gap-5">
                        {orderDetailsQuery?.data?.status == 1 && (
                            <Button
                                //  onClick={showModal}
                                className="bg-transparent text-primary-color border-primary-color"
                                onClick={() => handleEditOrder(orderDetailsQuery?.data?.id)}
                            >
                                Edit
                            </Button>
                        )}
                        {orderDetailsQuery?.data?.status == 1 && (
                            <Button
                                className=" border-primary-color"
                                //  onClick={showModal}
                                onClick={() => handleCancelOrder(orderDetailsQuery?.data?.id)}
                            >
                                Cancel Order
                            </Button>
                        )}
                    </div>

                    <Modal
                        title="Cancel Order"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        okButtonProps={{
                            hidden: true,
                        }}
                        cancelButtonProps={{
                            hidden: true,
                        }}
                    >
                        <div className="w-full px-5">
                            <h5 className="text-black font-Inter text-base font-medium leading-normal mb-1">Order cancel request</h5>
                            <p className="text-[#000000CC] font-Inter text-sm font-normal leading-[20px] mb-5">We do our best to honor cancellation requests. We’ll send an email to let you
                                know if your order’s been cancelled.</p>
                            <p className="text-black text-sm font-medium mb-3">Reason for cancellation</p>
                            <SearchSelectLabelLess
                                placeholder={"Select reason"}
                                data={demoList}
                                required={true}
                                isClearable={false}
                                handleChange={(e) => {
                                    if (e) {
                                        setCancellationSelectedValue({
                                            cancel_id: e.value,
                                            cancel_reason: e.label,
                                        });
                                    }
                                }}
                                name="cancellationSelectedValue"
                            />
                            <Button className=" mt-2 mb-6">Confirm</Button>
                        </div>
                    </Modal>
                </div>
                {/* mobile horizontal time start */}
                <div className="flex items-center lg:hidden mt-2 mb-14 w-9/12 mx-auto text-xs ps-[1px]">
                    <div className="border-[3px] border-[#52c41a] p-[2px] h-2 w-2 rounded-full relative">
                        <div data-aos="zoom-out-up" data-aos-duration="1000" className="absolute top-2 -left-[1000%] text-center">
                            <>
                                <p className="text-[#000000CC] font-inter font-medium leading-normal tracking-tight">Ordered</p>
                                <p className="text-[#000000CC] font-inter font-normal leading-normal whitespace-nowrap"> {moment(orderDetailsQuery?.data?.created_at).format("DD MMM, YYYY")}</p>
                            </>
                        </div>
                    </div>
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        className={`border  h-0 w-full  ${orderDetailsQuery?.data?.status == 2 && "border-[#52c41a]"} 
                        ${orderDetailsQuery?.data?.status == 3 && "border-[#52c41a]"} 
                        ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                       ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                    ></div>
                    <div
                        className={`border-[3px] p-[2px] h-2 w-2 rounded-full relative  ${orderDetailsQuery?.data?.status == 2 && "border-[#52c41a]"} 
                        ${orderDetailsQuery?.data?.status == 3 && "border-[#52c41a]"} 
                        ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                       ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                    >
                        <div data-aos="zoom-out-up" data-aos-duration="1300" className="absolute top-2 -left-[750%] text-center">
                            <>
                                <p className="text-[#000000CC] font-inter font-medium leading-normal tracking-tight">Processing</p>
                            </>
                        </div>
                    </div>
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        className={`border h-0 w-full  
                        ${orderDetailsQuery?.data?.status == 3 && "border-[#52c41a]"} 
                        ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                       ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                    ></div>
                    <div
                        className={`border-[3px] p-[2px] h-2 w-2 rounded-full relative  
                        ${orderDetailsQuery?.data?.status == 3 && "border-[#52c41a]"} 
                        ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                       ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                    >
                        <div data-aos="zoom-out-up" data-aos-duration="1800" className="absolute top-2 -left-[600%] text-center">
                            <>
                                <p>Shipped</p>
                            </>
                        </div>
                    </div>
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        className={`border h-0 w-full  
                        ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                       ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                    ></div>
                    <div
                        className={`border-[3px] p-[2px] h-2 w-2 rounded-full relative  
                        ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                       ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                    >
                        <div data-aos="zoom-out-up" data-aos-duration="2200"
                             className={`absolute top-2 text-center ${orderDetailsQuery?.data?.status == 5 ? "-left-[600%]" : "-left-[1100%]"}`}>
                            {orderDetailsQuery?.data?.status == 5 ? (
                                <p className="text-[#000000CC] font-inter font-medium leading-normal tracking-tight whitespace-nowrap">Cancelled</p>
                            ) : orderDetailsQuery?.data?.status == 4 ? (
                                <>
                                    <p className="text-[#000000CC] font-inter font-medium leading-normal tracking-tight">Delivered</p>
                                    <p className="text-[#000000CC] font-inter font-normal leading-normal whitespace-nowrap">{moment(orderDetailsQuery?.data?.updated_at).format("DD MMM, YYYY")}</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-[#000000CC] font-inter font-medium leading-normal tracking-tight whitespace-nowrap">Estimated Delivery</p>
                                    <p className="text-[#000000CC] font-inter text-sm  font-normal leading-normal whitespace-nowrap">{moment(orderDetailsQuery?.data?.created_at).add(2, "days").format("DD MMM, YYYY")}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* mobile horizontal time end */}
                <div className="py-3 px-1 xs:px-3 md:mb-3 md:py-3 lg:py-6 md:px-6 lg:px-8">
                    {/* order details start  */}
                    <div className="flex flex-col-reverse lg:flex-row gap-10">
                        <div className="lg:w-6/12">
                            <div>
                                {/* vertical timeline for pc start */}
                                <div className="hidden lg:block mt-5 mb-12">
                                    <div className="flex flex-col items-center ps-[1px] w-min h-64">
                                        <div className="border-[3px] border-[#52c41a] p-[2px] h-2 w-2 rounded-full relative">
                                            <div data-aos="fade-left" data-aos-duration="1000" className="absolute -top-5 left-6">
                                                <>
                                                    <p className="text-[#000000CC] font-inter font-medium leading-normal tracking-tight">Ordered</p>
                                                    <p className="text-[#000000CC] font-inter text-sm font-normal leading-normal whitespace-nowrap">{moment(orderDetailsQuery?.data?.created_at).format("DD MMM, YYYY")}</p>
                                                </>
                                            </div>
                                        </div>
                                        <div
                                            data-aos="zoom-in"
                                            data-aos-duration="1000"
                                            className={`border  h-full w-[1px] 
                                             ${orderDetailsQuery?.data?.status == 2 && "border-[#52c41a]"} 
                                             ${orderDetailsQuery?.data?.status == 3 && "border-[#52c41a]"} 
                                             ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                                            ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                                        ></div>
                                        <div
                                            className={`border-[3px]  p-[2px] h-2 w-2 rounded-full relative         
                                            ${orderDetailsQuery?.data?.status == 2 && "border-[#52c41a]"} 
                                            ${orderDetailsQuery?.data?.status == 3 && "border-[#52c41a]"} 
                                            ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                                           ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                                        >
                                            <div data-aos="fade-left" data-aos-duration="1300" className="absolute -top-3 left-6 text-center">
                                                <>
                                                    <p className="text-[#000000CC] font-inter font-medium leading-normal tracking-tight">Processing</p>
                                                </>
                                            </div>
                                        </div>
                                        <div
                                            data-aos="zoom-in"
                                            data-aos-duration="1000"
                                            className={`border h-full w-[1px]  
                                            ${orderDetailsQuery?.data?.status == 3 && "border-[#52c41a]"} 
                                            ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                                           ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                                        ></div>
                                        <div
                                            className={`border-[3px] p-[2px] h-2 w-2 rounded-full relative  
                                            ${orderDetailsQuery?.data?.status == 3 && "border-[#52c41a]"} 
                                            ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                                           ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                                        >
                                            <div data-aos="fade-left" data-aos-duration="1800" className="absolute -top-3 left-6 text-center">
                                                <>
                                                    <p>Shipped</p>
                                                </>
                                            </div>
                                        </div>
                                        <div
                                            data-aos="zoom-in"
                                            data-aos-duration="1000"
                                            className={`border h-full w-[1px] 
                                            ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                                           ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                                        ></div>
                                        <div
                                            className={`border-[3px] p-[2px] h-2 w-2 rounded-full relative  
                                            ${orderDetailsQuery?.data?.status == 4 && "border-[#52c41a]"} 
                                           ${orderDetailsQuery?.data?.status == 5 && "border-red-500"}`}
                                        >
                                            <div data-aos="fade-left" data-aos-duration="2200" className="absolute -top-3 left-6">
                                                {orderDetailsQuery?.data?.status == 5 ? (
                                                    <>
                                                        <p className="text-[#000000CC] font-inter font-medium leading-normal tracking-tight whitespace-nowrap">Order Cancelled</p>
                                                    </>
                                                ) : orderDetailsQuery?.data?.status == 4 ? (
                                                    <>
                                                        <p className="text-[#000000CC] font-inter font-medium leading-normal tracking-tight whitespace-nowrap">Delivered</p>
                                                        <p className="text-[#000000CC] font-inter text-sm  font-normal leading-normal whitespace-nowrap">{moment(orderDetailsQuery?.data?.updated_at).format("DD MMM, YYYY")}</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-[#000000CC] font-inter font-medium leading-normal tracking-tight whitespace-nowrap">Estimated Delivery</p>
                                                        <p className="text-[#000000CC] font-inter text-sm  font-normal leading-normal whitespace-nowrap">{moment(orderDetailsQuery?.data?.created_at).add(2, "days").format("DD MMM, YYYY")}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* vertical timeline for pc end*/}
                            </div>
                            <Divider className="hidden lg:block -mt-2"/>
                            <div className="-mt-7 lg:-mt-2">
                                <h5 className="text-black  text-base font-semibold leading-normal tracking-[-0.16px] mb-2">Shipping Address</h5>
                                <p className="text-[#000000A6] font-inter text-sm font-medium leading-[22px]">
                                    City: <span className="text-[#000000CC] ">{orderDetailsQuery?.data?.shipping?.city_name}</span>{" "}
                                </p>
                                <p className="text-[#000000A6] font-inter text-sm font-medium leading-[22px]">
                                    Zone: <span className="text-[#000000CC] ">{orderDetailsQuery?.data?.shipping?.zone_name}</span>{" "}
                                </p>
                                <p className="text-[#000000A6] font-inter text-sm font-medium leading-[22px]">
                                    Address: <span className="text-[#000000CC] ">{orderDetailsQuery?.data?.shipping?.address}</span>{" "}
                                </p>
                            </div>
                            <div className="-mt-2">
                                <Divider/>
                            </div>
                            <div className="-mt-2">
                                <h5 className="text-black  text-base font-semibold leading-normal tracking-[-0.16px] mb-2">Payment Method</h5>
                                <p className="text-[#000000A6] font-inter text-sm font-medium leading-[22px]">{orderDetailsQuery?.data?.payment_method}</p>
                            </div>
                        </div>
                        {/* right side start */}
                        <div className="lg:w-6/12 border-[1px] rounded-lg pt-5">
                            <div className="border-b-[1px] px-4">
                                <h5 className="text-black font-inter text-base font-semibold leading-normal tracking-[-0.16px] mb-1">Order {orderDetailsQuery?.data?.order_no}</h5>
                                <p className="text-[#000000A6] font-inter text-sm font-medium leading-normal tracking-tighter mb-4">Ordered: {moment(orderDetailsQuery?.data?.created_at).format("DD MMM, YYYY")}</p>
                            </div>
                            <div className="px-2 md:px-4 max-h-[330px] overflow-hidden overflow-y-auto slim-scroll">
                                {/* per order start */}
                                {orderDetailsQuery?.data?.order_details?.map((product, i) => (
                                    <div key={i} className="flex gap-2 sm:gap-4 w-full border-b py-2 sm:py-3 md:py-4">
                                        <ImageURL image={product?.[0]?.combo?.image ? product?.[0]?.combo?.image : product?.[0]?.product_image}
                                                  className="rounded-[4px] border-[0.2px]  h-16 md:h-24 w-16 md:w-24"/>
                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-col w-full">
                                                {product?.[0]?.buy_get_offer_name &&
                                                    <h4 className="w-min  whitespace-nowrap text-[#0094CF] text-[9px] font-medium bg-[#D4F3FF] px-[8px] py-[2px] rounded-md">{product?.[0]?.buy_get_offer_name}</h4>}
                                                {product?.[0]?.combo_offer_name &&
                                                    <h4 className="w-min whitespace-nowrap text-[#0094CF] text-[9px] font-medium bg-[#D4F3FF] px-[8px] py-[2px] rounded-md ">Combo Offer</h4>}
                                                {product?.[0]?.combo?.name && <p className=" text-black text-xs md:text-base font-bold leading-normal flex">{product?.[0]?.combo?.name}</p>}
                                                {product?.map((element, i) => (
                                                    <div key={i} className="w-full h-full flex flex-col xl:flex-row gap-1 justify-between">
                                                        <div className="flex flex-col justify-between ">
                                                            <p className="text-black text-sm xs:text-base tracking-tighter font-medium leading-[14px]">
                                                                {element?.product_name && element?.product_name?.length > 40 ? `${element?.product_name.slice(0, 40)}...` : element?.product_name}
                                                            </p>
                                                            <div className="flex flex-wrap gap-x-2">
                                                                {" "}
                                                                {element?.shade_id ? (
                                                                    <div className="flex items-center gap-1">
                                                                        <p className="text-[#000000CC]  font-inter text-xs font-medium leading-normal">
                                                                            <span className="font-semibold pe-1">Shade:</span> {element?.shade}
                                                                        </p>{" "}
                                                                        <div className="border-[0.1px] h-4"></div>
                                                                    </div>
                                                                ) : element?.size_id ? (
                                                                    <>
                                                                        <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                                                                            <span className="text-[#000000CC] font-medium">
                                                                                <span className="font-semibold pe-1">Size:</span>
                                                                                {element?.size}
                                                                            </span>
                                                                        </p>{" "}
                                                                        <div className="border-[0.1px] h-4"></div>
                                                                    </>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {/* <div className="border-[0.1px] h-4"></div> */}
                                                                <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                                                                    Qty: <span className="text-[#000000CC] font-medium">{element?.quantity}</span>
                                                                </p>
                                                            </div>
                                                            {element?.combo == null && (
                                                                <>
                                                                    {element?.discounted_price > 0 && (
                                                                        <div className="flex gap-2 items-center mb-1">
                                                                            <p className="text-[#000000A6] text-[10px]  md:text-xs font-medium line-through">৳ {element?.price}</p>
                                                                            <p className="text-black text-xs md:text-base font-bold leading-normal">৳ {element?.discounted_price}</p>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                        {orderDetailsQuery?.data?.status == 4 && (
                                                            <Link
                                                                to={`/all-review/${element?.product?.id}?product_name=${element?.product?.name}&&reviews_avg_star=${element?.product?.reviews_avg_star}&&eligible=${element?.product?.review_eligible}&from-order=true`}>
                                                                <Button className="border-black text-black text-xs px-3 py-2 rounded-md h-min w-min" variant="bordered">
                                                                    Write Review
                                                                </Button>
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {product?.[0]?.combo?.discounted_price > 0 && (
                                                <p className="text-black text-xs md:text-base font-bold leading-normal flex">
                                                    ৳ <span className="text-black text-xs md:text-base font-bold leading-normal ps-1">{product?.[0]?.combo?.discounted_price}</span>{" "}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* per order end */}
                                {/* per order start */}
                                {/* <div className="flex gap-2 sm:gap-4 w-full border-b py-2 sm:py-3 md:py-4">
                                    <img
                                        className="rounded-[4px] border-[0.2px]  h-16 md:h-24 w-16 md:w-24"
                                        src="https://off.com.ph/-/media/images/off/ph/products-en/update-983/plp/kids-group-pdp.png"
                                        alt=""
                                    />
                                    <div className="w-full h-full">
                                        <div className="flex flex-col justify-between ">
                                            <p className="text-black mb-1 text-sm xs:text-base tracking-tighter font-medium leading-[14px]">
                                                Lakme Absolute Skin Dew Color Sensational
                                            </p>
                                            <div className="flex flex-wrap gap-x-2">
                                                {" "}
                                                <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                                                    Size: <span className="text-[#000000CC] font-medium">3.4ml</span>
                                                </p>
                                                <div className="border-[0.1px] h-4"></div>
                                                <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                                                    Qty: <span className="text-[#000000CC] font-medium">3</span>
                                                </p>
                                            </div>

                                            <div className="flex gap-2 items-center md:mb-1">
                                                <p className="text-black text-xs md:text-base font-bold leading-normal">৳550</p>
                                                <p className="text-[#000000A6] text-[10px]  md:text-xs font-medium line-through">৳550</p>
                                                <div className="border-[0.1px] h-4"></div>
                                                <p className="text-[#02792A]  text-[10px] md:text-xs font-semibold leading-normal ">(-25% Off)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* per order end */}
                            </div>
                            <div className="p-2 md:p-3 border-b mx-2 md:mx-4">
                                <div className="flex justify-between md:mb-2">
                                    <p className="text-[#000000CC] font-inter text-sm md:text-base font-medium leading-normal">Items Subtotal</p>
                                    <p className="text-[#000000CC] text-right font-inter text-sm md:text-base font-semibold leading-normal">৳ {orderDetailsQuery?.data?.sub_total - parseFloat(orderDetailsQuery?.data?.total_discount_amount)}</p>
                                </div>
                                {/* <div className="flex justify-between md:mb-2">
                                    <p className="text-[#000000CC] font-inter text-sm md:text-base font-medium leading-normal">Discount</p>
                                    <p className="text-[#000000CC] text-right font-inter text-sm md:text-base font-semibold leading-normal">
                                        -৳{" "}
                                        {(
                                            parseFloat(orderDetailsQuery?.data?.total_discount_amount) +
                                            parseFloat(orderDetailsQuery?.data?.total_offer_discount_amount)
                                        ).toFixed(2)}
                                    </p>
                                </div> */}
                                {orderDetailsQuery?.data?.total_offer_discount_amount > 0 && (
                                    <div className="flex justify-between md:mb-2">
                                        <p className="text-[#000000CC] font-inter text-sm md:text-base font-medium leading-normal">Discount (UpTo Sale)</p>
                                        <p className="text-[#000000CC] text-right font-inter text-sm md:text-base font-semibold leading-normal">-৳ {parseFloat(orderDetailsQuery?.data?.total_offer_discount_amount).toFixed(2)}</p>
                                    </div>
                                )}
                                {orderDetailsQuery?.data?.coupon_discount > 0 && (
                                    <div className="flex justify-between md:mb-2">
                                        <p className="text-[#000000CC] font-inter text-sm md:text-base font-medium leading-normal">Coupon Discount</p>
                                        <p className="text-[#000000CC] text-right font-inter text-sm md:text-base font-semibold leading-normal">-৳ {parseFloat(orderDetailsQuery?.data?.coupon_discount).toFixed(2)}</p>
                                    </div>
                                )}
                                {orderDetailsQuery?.data?.reward_discount_amount > 0 && (
                                    <div className="flex justify-between md:mb-2">
                                        <p className="text-[#000000CC] font-inter text-sm md:text-base font-medium leading-normal">Reward Points Discount</p>
                                        <p className="text-[#000000CC] text-right font-inter text-sm md:text-base font-semibold leading-normal">-৳ {parseFloat(orderDetailsQuery?.data?.reward_discount_amount).toFixed(2)}</p>
                                    </div>
                                )}
                                <div className="flex justify-between ">
                                    <p className="text-[#000000CC] font-inter text-sm md:text-base font-medium leading-normal">Shipping Fee</p>
                                    <p className="text-[#000000CC] text-right font-inter text-sm md:text-base font-semibold leading-normal">৳ {orderDetailsQuery?.data?.delivery_charge}</p>
                                </div>
                            </div>
                            <div className="p-2 md:p-4 mx-2 md:mx-4">
                                <div className="flex justify-between mb-2">
                                    <p className="text-[#000000CC] font-inter text-base md:text-lg font-semibold leading-[-0.18px]">Grand Total</p>
                                    <p className="text-black text-right font-inter text-base md:text-lg font-bold leading-normal">৳ {parseFloat(orderDetailsQuery?.data?.grand_total).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        {/* right side end*/}
                    </div>
                    {/* order details end */}
                </div>
            </div>
        </>
    );
};

export default MyOrderDetails;
