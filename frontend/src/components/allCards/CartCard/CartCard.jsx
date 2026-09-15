/* eslint-disable react/prop-types */
import {useEffect, useState} from "react";
import {RiDeleteBin6Line} from "react-icons/ri";
import {TbMinus, TbPlus} from "react-icons/tb";
import {useDispatch} from "react-redux";
import {twMerge} from "tailwind-merge";
import {useRemoveFormCartMutation, useUpdateCartMutation} from "../../../redux/features/cart/cartApi";
import ImageURL from "../../ImageURL/ImageURL";
import {removeRewardPointsFromStorage} from "../../../utilities/rewardPointsHandler";
import useCartData from "../../../hooks/useCartData";
import showToast from "../../../utilities/showToast";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const CartCard = ({className, item}) => {
    const [removeFormCartMutation, {isLoading: removeFormCartIsLoading}] = useRemoveFormCartMutation();
    //
    const [updateCartMutation, {isLoading: updateCartIsLoading}] = useUpdateCartMutation();
    const {cartRefetch, isCartFetching} = useCartData();

    const [counter, setCounter] = useState(1);
    const dispatch = useDispatch();

    const handleIncrement = async (item) => {
        setCounter((prevCounter) => prevCounter + 1);
        //
        // dispatch(incrementQuantity(productId));
        const data = {
            id: item.id,
            product_id: item?.product_id,
            quantity: parseInt(item?.quantity) + 1,
        };

        try {
            const response = await updateCartMutation(data);
            if (response?.data?.status == true) {
                cartRefetch();
            } else {
                showToast(response?.data?.message, "error");
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
        removeRewardPointsFromStorage();
    };

    const handleDecrement = async (item) => {
        //
        if (item?.quantity > 1) {
            setCounter((prevCounter) => prevCounter - 1);
            removeRewardPointsFromStorage();
            // dispatch(decrementQuantity(productId));
            const data = {
                id: item.id,
                product_id: item?.product_id,
                quantity: parseInt(item?.quantity) - 1,
            };
            try {
                const response = await updateCartMutation(data);
                if (response?.data?.status == true) {
                    cartRefetch();
                } else {
                    showToast(response?.data?.message, "error");
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        }
    };

    const handleInputChange = (e) => {
        const inputValue = parseInt(e.target.value);
        setCounter(inputValue);
    };

    const handleDeleteItem = async (id) => {
        removeRewardPointsFromStorage();
        const response = await removeFormCartMutation(id);
        if (response?.data?.status == true) {
            cartRefetch();
        } else {
            showToast(response?.data?.message, "error");
        }
    };

    useEffect(() => {
        if (item?.stock_status == 0) {
            handleDeleteItem(item?.id);
        }
    }, [item?.stock_status == 0]);

    return (
        <div className={twMerge(`border-[0.5px] rounded p-3 ${item?.stock_status == 0 ? "bg-stone-200" : "bg-white"}`, className)}>
            <div className="flex border-b-[0.5px] pb-3 mb-3 w-full">
                <div className="relative me-3 rounded-md w-32 h-24 overflow-hidden">
                    <ImageURL
                        image={item?.product?.image ? item?.product?.image : item?.combo_product?.image ? item?.combo_product?.image : item?.buy_get_info?.product_for_buy?.image ? item?.buy_get_info?.product_for_buy?.image : ""}
                        className={"object-fill w-full h-full"}
                    />
                    {item?.buy_get_info?.id && (
                        <div className="absolute bottom-0 right-0">
                            <h4 className=" text-[#0094CF] text-[9px] font-medium bg-[#D4F3FF] px-[8px] py-[2px] rounded-ss-md">{item?.buy_get_info?.offer?.name}</h4>
                        </div>
                    )}
                    {item?.combo_product?.id && (
                        <div className="absolute bottom-0 right-0">
                            <h4 className=" text-[#0094CF] text-[9px] font-medium bg-[#D4F3FF] px-[8px] py-[2px] rounded-ss-md ">Combo Offer</h4>
                        </div>
                    )}
                </div>
                <div className="w-full">
                    <span className="flex items-start justify-between gap-1 w-full">
                        <p className="text-black font-inter text-base font-medium leading-5 mb-">
                            {/* {item?.product?.name &&
                                (item?.product?.name?.length > 35 ? `${item?.product?.name.slice(0, 35)}...` : item?.product?.name)} */}
                            {item?.buy_get_info?.product_for_buy?.name
                                ? item?.buy_get_info?.product_for_buy?.name?.length > 35
                                    ? `${item?.buy_get_info?.product_for_buy?.name.slice(0, 35)}...`
                                    : item?.buy_get_info?.product_for_buy?.name
                                : item?.product?.name && (item?.product?.name?.length > 35 ? `${item?.product?.name.slice(0, 35)}...` : item?.product?.name)}

                            {item?.combo_product?.name && (item?.combo_product?.name?.length > 35 ? `${item?.combo_product?.name.slice(0, 35)}...` : item?.combo_product?.name)}
                            {/* {item?.buy_get_info?.product_for_buy?.name &&
                                (item?.buy_get_info?.product_for_buy?.name?.length > 35
                                    ? `${item?.buy_get_info?.product_for_buy?.name.slice(0, 35)}...`
                                    : item?.buy_get_info?.product_for_buy?.name)} */}
                        </p>
                        {removeFormCartIsLoading || isCartFetching ? (
                            <Spin indicator={<LoadingOutlined style={{fontSize: 20}}/>}></Spin>
                        ) : (
                            <>
                                {item?.is_free_product == 1 || (
                                    <RiDeleteBin6Line
                                        // onClick={() => dispatch(removeItemFromCart(item?.productId))}
                                        onClick={() => handleDeleteItem(item?.id)}
                                        className=" w-10 xs:w-7 h-5 hover:cursor-pointer"
                                    />
                                )}
                            </>
                        )}
                    </span>
                    {item?.product?.brand?.name && (
                        <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                            Brand: <span className="text-[#000000CC] font-medium">{item?.product?.brand?.name}</span>
                        </p>
                    )}

                    {item?.shade?.id ? (
                        <div className="flex items-center gap-1">
                            <div className="h-4 w-4  rounded overflow-hidden">
                                <ImageURL image={item?.shade?.image} className={"object-fill w-full h-full"}/>
                            </div>
                            <p className="text-[#000000CC]  font-inter text-xs font-medium leading-normal">{item?.shade?.name}</p>
                        </div>
                    ) : item?.size?.id ? (
                        <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                            <span className="text-[#000000CC] font-medium">{item?.size?.name}</span>
                        </p>
                    ) : (
                        ""
                    )}
                    {/* buy_get_info, get product only start */}
                    <div className="mt-2">
                        {item?.buy_get_info?.shade_for_get?.name ? (
                            <div className="flex items-start gap-1">
                                <div className="h-4 w-4  rounded overflow-hidden mt-1">
                                    <ImageURL image={item?.buy_get_info?.product_for_get?.image} className={"object-fill w-full h-full "}/>
                                </div>
                                <div>
                                    <p className="text-[#000000CC]  font-inter text-xs font-medium leading-normal">
                                        {item?.buy_get_info?.product_for_get?.name?.length > 25 ? `${item?.buy_get_info?.product_for_get?.name?.slice(0, 25)}...` : item?.buy_get_info?.product_for_get?.name}
                                    </p>
                                    <p className="text-[#000000CC]  font-inter text-xs font-medium leading-normal">{item?.buy_get_info?.shade_for_get?.name}</p>
                                </div>
                            </div>
                        ) : item?.buy_get_info?.size_for_get?.name ? (
                            <div className="flex items-start gap-1">
                                <div className="h-4 w-4  rounded overflow-hidden mt-1">
                                    <ImageURL image={item?.buy_get_info?.product_for_get?.image} className={"object-fill w-full h-full "}/>
                                </div>
                                <div>
                                    <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                                        <span className="text-[#000000CC] font-medium">
                                            {item?.buy_get_info?.product_for_get?.name?.length > 25 ? `${item?.buy_get_info?.product_for_get?.name?.slice(0, 25)}...` : item?.buy_get_info?.product_for_get?.name}
                                        </span>
                                    </p>

                                    <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                                        <span className="text-[#000000CC] font-medium">{item?.buy_get_info?.size_for_get?.name}</span>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    {/* buy_get_info, get product only end */}

                    {item?.combo_info !== null &&
                        item?.combo_info?.map((item, i) => (
                            <div key={i} className="ms-1 mb-[2px]">
                                <p>{item?.product?.name}</p>
                                {item?.shade?.name ? <p> Shade: {item?.shade?.name} </p> : <p>Size: {item?.size?.name}</p>}
                            </div>
                        ))}
                    {item?.is_free_product == 1 && <p className=" py-1 px-2 bg-red-500 rounded-md w-min text-white text-sm">Free</p>}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="w-[104px] h-9 border rounded-md border-[#5DC9F4] flex items-center">
                    <button className="py-[0.8px] px-[10px]  text-[#5DC9F4] border-e-[1.2px] border-[#5DC9F4]">
                        {updateCartIsLoading || isCartFetching ? <TbMinus className=" text-[#5dc9f4a6] hover:cursor-not-allowed"/> :
                            <TbMinus onClick={() => handleDecrement(item)} className="hover:cursor-pointer"/>}
                    </button>
                    <input
                        type="number"
                        value={item?.quantity}
                        readOnly
                        onChange={handleInputChange}
                        className={`text-center text-[#5DC9F4] h-7 w-8 
                  ${isNaN(item?.quantity) ? "border-[#5DC9F4] outline-none" : "border-[#5DC9F4] outline-none"}
                  `}
                    />
                    <button className="py-[0.8px] px-2 text-[#5DC9F4] border-s-[1.2px] border-[#5DC9F4]">
                        {updateCartIsLoading || isCartFetching || item?.is_free_product == 1 ? <TbPlus className=" text-[#5dc9f4a6] hover:cursor-not-allowed"/> :
                            <TbPlus onClick={() => handleIncrement(item)} className="hover:cursor-pointer"/>}
                    </button>
                    {item?.stock_status == 0 && <p className="whitespace-nowrap ms-3 text-red-500">Stock out</p>}
                </div>
                {/* {item?.product && (
          <div className="flex gap-2 items-center">
            <p className="text-[#000000A6] text-sm  md:text-xs font-medium line-through">
              ৳
              {item?.shade?.product_shade?.shade_price
                ? (
                    item?.shade?.product_shade?.shade_price * item?.quantity
                  ).toFixed(0, 2)
                : (
                    item?.size?.product_size?.size_price * item?.quantity
                  ).toFixed(0, 2)}
            </p>
            <p className="text-black text-xs md:text-base font-bold leading-normal">
              ৳
              {item?.shade?.product_shade?.discounted_price
                ? (
                    item?.shade?.product_shade?.discounted_price *
                    item?.quantity
                  ).toFixed(0, 2)
                : (
                    item?.size?.product_size?.discounted_price * item?.quantity
                  ).toFixed(0, 2)}
            </p>
          </div>
        )} */}
                {item?.price && (
                    <div className="flex gap-2 items-center">
                        <p className="text-[#000000A6] text-sm  md:text-xs font-medium line-through">৳ {(parseFloat(item?.price) * parseFloat(item?.quantity)).toFixed(2)}</p>
                        <p className="text-black text-xs md:text-base font-bold leading-normal">৳{(parseFloat(item?.discounted_price) * parseFloat(item?.quantity)).toFixed(2)}</p>
                    </div>
                )}
                {item?.combo_product?.discounted_price &&
                    <p className="text-black text-xs md:text-base font-bold leading-normal">৳{item?.combo_product?.discounted_price * item?.quantity}</p>}
            </div>
        </div>
    );
};

export default CartCard;
