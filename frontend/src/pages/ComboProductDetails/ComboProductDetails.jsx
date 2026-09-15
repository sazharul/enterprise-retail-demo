import React, {useContext, useEffect, useState} from "react";
import {BsFacebook, BsFillShareFill, BsLink45Deg, BsLinkedin} from "react-icons/bs";
import {Bars} from "react-loader-spinner";
import {ScrollRestoration, useLocation, useNavigate, useParams} from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import returnPolicyImage from "../../assets/productDetails/Return.png";
import genuineProductsImage from "../../assets/productDetails/products.png";
import soldByImage from "../../assets/productDetails/soldBy.png";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ImageURL from "../../components/ImageURL/ImageURL";
import Button from "../../components/ui/Button";
import useAuthUser from "../../hooks/useAuthUser";
import useCartData from "../../hooks/useCartData";
import {LogicProviderContext} from "../../providers/LogicProvider";
import {useAddToCartMutation, useUpdateCartMutation} from "../../redux/features/cart/cartApi";
import {useGetComboProductDetailsQuery} from "../../redux/features/comboProductDetails/comboProductDetailsApi";
import {useAddToWishListMutation} from "../../redux/features/wishList/wishListApi";
import {checkComboCart} from "../../utilities/checkCartIfExist";
import showToast from "../../utilities/showToast";
import ComboProductVariantSelect from "./ComboProductVariantSelect/ComboProductVariantSelect";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import ProductDetailsSkeleton from "../ProductDetails/ProductDetailsSkeleton/ProductDetailsSkeleton";
import {useGetContactQuery} from "../../redux/features/contact/contactApi";
import Swal from "sweetalert2";

const ComboProductDetails = () => {
    const [addToCartMutation, {data, isLoading: addToCartIsLoading}] = useAddToCartMutation();
    const [addToWishListMutation] = useAddToWishListMutation();
    const [isCreateReview, setIsCreateReview] = useState(false);
    const [counter, setCounter] = useState(1);
    const [isShare, setIsShare] = useState(false);
    const [selectedShade, setSelectedShade] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [sliderImages, setSliderImages] = useState([]);
    const [mainPrice, setMainPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const {handleShowReviewModal} = useContext(LogicProviderContext);
    const {userData} = useAuthUser();
    const [comboArray, setComboArray] = useState([]);
    const {data: getContactQuery} = useGetContactQuery();
    const {cartData, cartRefetch} = useCartData();
    const [updateCartMutation] = useUpdateCartMutation();

    const [cartDataList, setCartDataList] = useState([]);
    useEffect(() => {
        if (cartData?.status) {
            setCartDataList(cartData?.data?.cartData);
        }
    }, [cartData]);

    //

    const navigate = useNavigate();

    const updatedComboArray = comboArray.filter((item) => item.product_id !== undefined);
    //
    const {id} = useParams();
    const {data: getComboProductDetailsQuery, isLoading} = useGetComboProductDetailsQuery(id);
    const productWithTypeId3 = getComboProductDetailsQuery?.data?.product?.offers?.offer_details?.filter((element) => element?.product_details?.offer?.offer_type_id == "3");

    const comboData = {
        combo_product_id: id,
        combo_info: updatedComboArray,
    };

    let cartItemIsExist = checkComboCart(cartDataList, comboData);
    //

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await productDetailsMutation({ id: 1, user_id: userData?.data?.id ? userData?.data?.id : null });
    //             // You can do something with the response if needed
    //
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     fetchData();
    // }, [userData?.status == true]);

    const location = useLocation();

    const handleAddToCart = async () => {
        if (userData?.status === true) {
            const data = {
                quantity: 1,
                combo_product_id: id,
                combo_info: JSON.stringify(updatedComboArray),
            };

            try {
                const response = await addToCartMutation(data);

                if (response?.data?.status) {
                    showToast(response?.data?.message, "success");
                    cartRefetch();
                } else {
                    showToast(response?.data?.message, "error");
                    // showToast("Your message goes here", "success", "top-end", 3000);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        } else {
            navigate("/login-with-email");
        }
    };
    const handleAlreadyAddedToCart = async () => {
        showToast("Already added to cart", "success", "top-end", 1500);
    };
    // const handleWishList = async () => {
    //     if (userData?.status === true) {
    //         const data = {
    //             product_id: id,
    //         };
    //
    //         try {
    //             const response = await addToWishListMutation(data);
    //             //
    //             if (response?.data?.data) {
    //                 // setAddToBagAnimation(true);
    //                 showToast("Added to wishlist");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching data:", error.message);
    //         }
    //     } else {
    //         navigate("/login-with-email");
    //     }
    // };
    const handleServiceOff = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${getContactQuery?.data?.buy_status_note}`,
        });
    };

    if (isLoading) {
        return (
            // <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
            //   <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
            // </div>
            <ProductDetailsSkeleton/>
        );
    }

    return (
        <>
            {getComboProductDetailsQuery?.status === true && (
                <>
                    <div className=" container mx-auto">
                        <Breadcrumbs className={"mt-2 mb-1 md:my-4 px-[10px]"} first={"Home"} second={"Combo Offer"}/>
                        {/* Product slider and title start */}
                        <div className="rounded mx-[10px]" style={{boxShadow: "0px 0px 6px 0px #E4EDF0"}}>
                            <div className="md:flex justify-between gap-x-4 xl:gap-x-0 my-3">
                                <div className="w-full md:w-4/12">
                                    {/* product image start */}

                                    <div className="rounded overflow-hidden md:p-2 w-full  md:h-[250px] lg:h-[300px] xl:h-[350px] 2xl:h-[450px]">
                                        <ImageURL image={getComboProductDetailsQuery?.data?.image} className="w-full h-full object-fill"/>
                                    </div>

                                    {/* product image end */}
                                </div>
                                <div className=" w-full md:w-8/12 relative">
                                    {/* title and details start */}
                                    <div className="md:border-s-[1px] h-full flex flex-col justify-between">
                                        <div className="px-1 md:p-5">
                                            <div>
                                                <h1 className=" sm:text-xl md:text-2xl font-medium mb-[10px] md:mb-3 md:leading-[28px]">{getComboProductDetailsQuery?.data?.name}</h1>
                                                {/* <div className="flex flex-wrap items-center gap-x-2 mb-2 md:mb-3">
                                                    <p className="whitespace-nowrap text-[#000000CC] font-inter text-xs md:text-sm font-normal leading-normal">
                                                        Brand:
                                                        <span className="text-black font-medium"> {getComboProductDetailsQuery?.data?.product?.brand?.name}</span>
                                                    </p>
                                                    {getComboProductDetailsQuery?.data?.product?.variation_type === "shade" && (
                                                        <>
                                                            <div className="border-[0.1px] h-4"></div>
                                                            <p className="whitespace-nowrap text-[#000000CC] font-inter text-xs md:text-sm font font-normal leading-normal">
                                                                Shade: <span className="text-black font-medium">{selectedShade?.shade?.name}</span>
                                                            </p>
                                                        </>
                                                    )}
                                                </div> */}
                                                {/* <div className="flex flex-wrap items-center gap-x-2 mb-2 md:mb-3">
                                                    <StarRating rating={getComboProductDetailsQuery?.data?.product?.reviews_avg_star} totalStars={5} />
                                                    <div className="border-[0.1px] h-4"></div>
                                                    <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs md:text-sm font font-normal leading-normal">
                                                        <span className="text-black font-medium">
                                                         ({getComboProductDetailsQuery?.data?.product?.reviews_count})
                                                        </span>
                                                    </p>
                                                </div> */}
                                                {/* price area start */}
                                                <h2 className="mb-4 text-[28px] font-semibold tracking-[-1.12px] leading-[42px]">৳{getComboProductDetailsQuery?.data?.discounted_price}</h2>
                                                {/* price area start */}
                                            </div>
                                            <div className="flex flex-col justify-between">
                                                <div className="mb-5">
                                                    {/* Shade & Size start */}

                                                    {getComboProductDetailsQuery?.data?.combo_product_details?.map((itemList, i) => (
                                                        <ComboProductVariantSelect key={i} itemList={itemList} index={i} setComboArray={setComboArray}/>
                                                    ))}

                                                    {/* Shade & Size end */}
                                                    {/* <div className="flex flex-wrap items-center gap-4 mb-6">
                                                        <p className="text-sm font-semibold">Quantity</p>

                                                        <div className="w-[104px] h-9 border rounded-md border-[#5DC9F4] flex items-center">
                                                            <button
                                                                onClick={handleDecrement}
                                                                className=" px-[9px]  text-[#5DC9F4] border-e-[1.2px] border-[#5DC9F4]"
                                                            >
                                                                <FiMinus />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                value={counter}
                                                                readOnly
                                                                // onChange={handleInputChange}
                                                                className={`text-center bg-white text-[#5DC9F4] h-7 w-8 
                                            ${isNaN(counter) ? "border-[#5DC9F4] outline-none" : "border-[#5DC9F4] outline-none"}
                                            `}
                                                            />
                                                            <button
                                                                onClick={handleIncrement}
                                                                className="py-[0.8px] px-2 text-[#5DC9F4] border-s-[1.2px] border-[#5DC9F4]"
                                                            >
                                                                <FiPlus />
                                                            </button>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="flex items-center justify-between gap-1 mb-5 md:mb-0">
                                                    <div className="flex items-center gap-2 md:gap-5">
                                                        {/* <Button
                              className="rounded text-black text-xs xs:text-base px-2 xs:px-5 py-[9px] font-semibold md:px-10 border-black"
                              variant="bordered"
                            >
                              Buy Now
                            </Button> */}
                                                        {cartItemIsExist == null ? (
                                                            <>
                                                                {addToCartIsLoading ? (
                                                                    <Button
                                                                        className="rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10"
                                                                        variant="">
                                                                        <Spin indicator={<LoadingOutlined style={{fontSize: 15}}/>}></Spin> <span className="ms-1">Add to Bag</span>
                                                                    </Button>
                                                                ) : (
                                                                    <>
                                                                        {getContactQuery?.data?.buy_status == 0 ? (
                                                                            <Button onClick={handleServiceOff}
                                                                                    className="rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10"
                                                                                    variant="">
                                                                                Add To Bag
                                                                            </Button>
                                                                        ) : (
                                                                            <Button
                                                                                className="rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10"
                                                                                variant=""
                                                                                onClick={() => {
                                                                                    handleAddToCart();
                                                                                }}
                                                                            >
                                                                                Add To Bag
                                                                            </Button>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <Button
                                                                className="rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10"
                                                                variant=""
                                                                onClick={() => {
                                                                    handleAlreadyAddedToCart();
                                                                }}
                                                            >
                                                                Added To Bag
                                                            </Button>
                                                        )}

                                                        {/* <Button
                                                            className="rounded font-semibold  text-xs px-2 py-1 xs:py-2 xs:px-5   md:py-[8px]"
                                                            variant="bordered"
                                                            onClick={() => {
                                                                handleWishList();
                                                            }}
                                                        >
                                                            <FaRegHeart size={25} />
                                                        </Button> */}
                                                    </div>
                                                    {/* <BsFillShareFill className="text-[#999999] text-end md:me-2 lg:me-10 hover:cursor-pointer w-5 h-5 sm:w-7 sm:h-7" /> */}
                                                    <button onClick={() => setIsShare(!isShare)} className="relative">
                                                        <BsFillShareFill className="text-[#999999] text-end me-1 hover:cursor-pointer w-5 h-5 sm:w-7 sm:h-7"/>
                                                        <div className={`bg-white absolute top-10 md:top-12 -right-5  filter drop-shadow-md ${isShare ? "block" : "hidden"} `}>
                                                            <div className="relative">
                                                                <div className=" w-6 h-6 rotate-45 bg-white absolute right-5 sm:right-3 md:right-3 lg:right-5 -mt-3"></div>
                                                                <div className="flex items-center px-4 py-5 gap-6">
                                                                    <span className="whitespace-nowrap me-1 text-[10px] font-medium">Share via:</span>
                                                                    <span className="whitespace-nowrap hover:cursor-pointer h-min flex flex-col justify-center">
                                                                        <BsLink45Deg className="mx-auto"/>
                                                                        <span className="text-[8px] font-medium">Copy Link</span>
                                                                    </span>
                                                                    <span>
                                                                        <BsFacebook className="text-[#1255D9] h-5 w-5 sm:h-7 sm:w-7 hover:cursor-pointer"/>
                                                                    </span>
                                                                    <span>
                                                                        <BsLinkedin className="text-[#3051C4] h-5 w-5 sm:h-7 sm:w-7 hover:cursor-pointer"/>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* applicable offers start */}
                                        {productWithTypeId3?.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 ms-4 mb-4">
                                                {productWithTypeId3?.map((offer, index) => (
                                                    <div key={index} className="text-[12px] bg-red-500 rounded  px-2 py-1 text-white whitespace-nowrap">
                                                        {offer?.title}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {/* applicable offers end */}

                                        <div className="flex items-center justify-between bg-[#D4F3FF] w-full py-2 px-2 md:px-5">
                                            <div className="flex items-center gap-1 xs:gap-2">
                                                <img className="h-6" src={genuineProductsImage} alt=""/>
                                                <p className="text-[#000000A6] font-inter text-[8px] xs:text-sm font-medium leading-normal">100% Genuine Products</p>
                                            </div>
                                            <div className="flex items-center gap-1 xs:gap-2">
                                                <img className="h-6" src={returnPolicyImage} alt=""/>
                                                <p className="text-[#000000A6] font-inter text-[8px] xs:text-sm font-medium leading-normal">Easy Return Policy</p>
                                            </div>
                                            <div className="flex items-center gap-1 xs:gap-2">
                                                <img className="h-6" src={soldByImage} alt=""/>
                                                <p className="text-[#000000A6] font-inter text-[8px] xs:text-sm font-medium leading-normal">Sold By: GlowCart</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* title and details end*/}
                                </div>
                            </div>
                        </div>
                        {/* Product slider and title end*/}
                    </div>
                    {/* ScrollRestoration start */}
                    {location?.search ? (
                        ""
                    ) : (
                        <div>
                            <ScrollRestoration/>
                        </div>
                    )}
                    {/* ScrollRestoration end */}
                </>
            )}
        </>
    );
};

export default ComboProductDetails;
