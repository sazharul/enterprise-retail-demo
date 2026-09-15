import React, {useState} from "react";
import {RiDeleteBin6Line} from "react-icons/ri";
import {TbMinus, TbPlus} from "react-icons/tb";
import {twMerge} from "tailwind-merge";
import Button from "../../ui/Button";
import ImageURL from "../../ImageURL/ImageURL";
import {useDispatch} from "react-redux";
import {
    addItemToCart,
    removeItemFromCart,
} from "../../../redux/features/cart/cartSlice";
import {
    addItemToWishList,
    removeItemFromWishList,
} from "../../../redux/features/wishList/wishListSlice";
import showToast from "../../../utilities/showToast";
import {useNavigate} from "react-router-dom";
import {useAddToWishListMutation} from "../../../redux/features/wishList/wishListApi";
import useAuthUser from "../../../hooks/useAuthUser";

const WishListCard = ({className, item, onClose}) => {
    const [removeFromWishListMutation] = useAddToWishListMutation();
    const {userData} = useAuthUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveFromWishList = async (item) => {
        if (userData?.status === true) {
            const data = {
                product_id: item?.product_id,
            };
            try {
                const response = await removeFromWishListMutation(data);
                //
                if (response?.data?.data) {
                    // setAddToBagAnimation(true);
                    showToast("Item removed from wishlist");
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        } else {
            navigate("/login-with-email");
        }
    };

    const handleMoveToCart = (item) => {
        onClose();
        navigate(
            `/product/${item?.product?.id}?wishlist_product_id=${item?.product_id}`
        );
        showToast("Select Product size or shade to first", "info", "top-end", 2000);
    };

    return (
        <div className={twMerge("border-[0.5px] bg-white rounded p-3", className)}>
            <div className="flex border-b-[0.5px] pb-3 mb-3 w-full">
                <div className="me-3 rounded-md w-32 h-24 overflow-hidden">
                    <ImageURL
                        image={item?.product?.image}
                        className={"object-fill w-full h-full"}
                    />
                </div>
                <div className="w-full">
          <span className="flex items-start justify-between gap-1 w-full">
            <p className="text-black font-inter text-base font-medium leading-5 mb-1">
              {item?.product?.name &&
                  (item?.product?.name?.length > 35
                      ? `${item?.product?.name.slice(0, 35)}...`
                      : item?.product?.name)}
            </p>
            <RiDeleteBin6Line
                // onClick={() => dispatch(removeItemFromCart(item?.productId))}
                onClick={() => handleRemoveFromWishList(item)}
                className=" w-10 xs:w-7 h-5 hover:cursor-pointer"
            />
          </span>
                    <div className="flex flex-wrap gap-x-2 mb-1">
                        <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                            Brand: <span className="text-[#000000CC] font-medium">Lakme</span>
                        </p>
                        {/* <div className="border-[0.1px] h-4"></div> */}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                {item?.product?.product_shades?.length > 0 ? (
                    <div className="flex gap-2 items-center">
                        <p className="text-black text-sm md:text-base font-bold leading-normal">
                            ৳
                            {parseFloat(
                                item?.product?.product_shades?.[0]?.discounted_price
                            ).toFixed(2)}
                        </p>
                        <p className="text-[#000000A6] text-xs  md:text-xs font-medium line-through">
                            ৳
                            {parseFloat(
                                item?.product?.product_shades?.[0]?.shade_price
                            ).toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <div className="flex gap-2 items-center">
                        <p className="text-black text-sm md:text-base font-bold leading-normal">
                            ৳
                            {parseFloat(
                                item?.product?.product_sizes?.[0]?.discounted_price
                            ).toFixed(2)}
                        </p>
                        <p className="text-[#000000A6] text-xs  md:text-xs font-medium line-through">
                            ৳
                            {parseFloat(
                                item?.product?.product_sizes?.[0]?.size_price
                            ).toFixed(2)}
                        </p>
                    </div>
                )}

                <Button
                    onClick={() => {
                        handleMoveToCart(item);
                        dispatch(
                            addItemToCart({
                                ...item,
                            })
                        );
                        dispatch(removeItemFromWishList(item?.productId));
                    }}
                >
                    Move to Cart
                </Button>
            </div>
        </div>
    );
};

export default WishListCard;
