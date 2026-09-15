import {Drawer} from "antd";
import Lottie from "lottie-react";
import React, {useContext} from "react";
import {FaArrowLeftLong} from "react-icons/fa6";
import {Link} from "react-router-dom";
import cartLottie from "../../assets/LottieAnimations/emptyCart.json";
import {LogicProviderContext} from "../../providers/LogicProvider";
import {useGetWishListQuery} from "../../redux/features/wishList/wishListApi";
import WishListCard from "../allCards/WishListCard/WishListCard";
import Button from "../ui/Button";

const WishListDrawer = () => {
    const {wishListDrawerOpen, setWishListDrawerOpen} =
        useContext(LogicProviderContext);
    const onClose = () => {
        setWishListDrawerOpen(false);
    };

    // const wishListItems = useSelector((state) => state?.wishList?.items);
    const {data: wishListItems} = useGetWishListQuery();
    //

    const hasCartItem = wishListItems?.data?.length > 0;
    return (
        <div>
            <Drawer
                title={
                    <span className="text-black font-inter text-[24px] font-semibold leading-normal">
            Wishlist{" "}
                        <span className="text-[#000000A6] font-inter text-base font-normal leading-normal">
              ({wishListItems?.data?.length} Items)
            </span>
          </span>
                }
                placement={"right"}
                width={500}
                onClose={onClose}
                open={wishListDrawerOpen}
                closeIcon={
                    <FaArrowLeftLong style={{fontSize: "24px", color: "black"}}/>
                } // Custom close icon
                className="relative"
            >
                <div className="h-full">
                    {hasCartItem ? (
                        // if any item is added to cart start
                        <div className="flex flex-col justify-between  overflow-y-auto slim-scroll p-3">
                            <div>
                                {/* <WishListCard className={"mb-3"} />
                                <WishListCard className={"mb-3"} /> */}
                                {wishListItems?.data?.map((item, index) => (
                                    <WishListCard
                                        key={index}
                                        className={"mb-3"}
                                        item={item}
                                        onClose={onClose}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        // if any item is added to cart end

                        <div className="flex justify-center items-center h-full md:-mt-14">
                            <div>
                                <Lottie
                                    className="h-36 "
                                    animationData={cartLottie}
                                    loop={true}
                                />
                                <h4 className="text-black font-inter text-2xl font-semibold leading-normal mb-4 text-center">
                                    Your Wish List is Empty
                                </h4>
                                <p className="text-center mb-8">
                                    Looks like you haven’t made your choice yet, <br/> add all
                                    your favorite products
                                </p>
                                <div className="flex justify-center">
                                    <div className="w-10/12">
                                        <Link to="/">
                                            <Button onClick={onClose} className={"w-full"}>
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

export default WishListDrawer;
