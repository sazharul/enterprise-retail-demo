import { Divider, Dropdown, Menu, Space, Spin, Tooltip } from "antd";
import moment from "moment";
import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { BsCheck, BsFacebook, BsFillShareFill, BsLink45Deg, BsLinkedin, BsPersonCircle } from "react-icons/bs";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import { FaCheck, FaChevronDown, FaRegHeart } from "react-icons/fa6";
import { FiMinus, FiPlus, FiThumbsUp } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { TbMinus, TbPlus } from "react-icons/tb";
import { Bars } from "react-loader-spinner";
import { Link, ScrollRestoration, useLocation, useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import returnPolicyImage from "../../assets/productDetails/Return.png";
import genuineProductsImage from "../../assets/productDetails/products.png";
import soldByImage from "../../assets/productDetails/soldBy.png";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import ImageURL from "../../components/ImageURL/ImageURL";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import SingleProductsSlider from "../../components/SingleProductsSlider/SingleProductsSlider";
import StarRating from "../../components/StarRating/StarRating";
import CenterAlignCard from "../../components/allCards/CenterAlignCard/CenterAlignCard";
import Button from "../../components/ui/Button";
import useAuthUser from "../../hooks/useAuthUser";
import { LogicProviderContext } from "../../providers/LogicProvider";
import { useAddToCartMutation, useUpdateCartMutation } from "../../redux/features/cart/cartApi";
import { useProductDetailsMutation } from "../../redux/features/productDetails/productDetailsApi";
import { useGetReviewProductWiseMutation, useReviewHelpfulMutation, useReviewImagesMutation } from "../../redux/features/review/reviewApi";
import { useAddToWishListMutation, useGetWishListQuery } from "../../redux/features/wishList/wishListApi";
import { checkCart, checkWishList } from "../../utilities/checkCartIfExist";
import { removeRewardPointsFromStorage } from "../../utilities/rewardPointsHandler";
import showToast from "../../utilities/showToast";
import CreateReview from "./CreateReview/CreateReview";
import "./ProductDetails.scss";
import TabForProductDetails from "./TabForProductDetails/TabForProductDetails";
import PerReview from "./PerReview/PerReview";
import ShareSocial from "./ShareSocial/ShareSocial";
import useCartData from "../../hooks/useCartData";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import { useStockRequestMutation } from "../../redux/features/requestStock/requestStockApi";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton/ProductDetailsSkeleton";
import SwiperSlider from "../../components/SwiperSlider/SwiperSlider";
import { SwiperSlide } from "swiper/react";
import { IoIosArrowDown } from "react-icons/io";
import { useGetContactQuery } from "../../redux/features/contact/contactApi";
import Swal from "sweetalert2";
import CenterAlignCardFilter from "../../components/allCards/CenterAlignCard/CenterAlignCardFilter.jsx";
// import { ShareSocial } from "react-share-social";

const ProductDetails = () => {
    const location = useLocation();
    const [isCreateReview, setIsCreateReview] = useState(false);
    const [counter, setCounter] = useState(1);
    const [shadeName, setShadeName] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [selectedShadeIndex, setSelectedShadeIndex] = useState(0);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
    const [selectedShade, setSelectedShade] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [sliderImages, setSliderImages] = useState([]);
    const [mainPrice, setMainPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [isReviewMoreOffer, setIsReviewMoreOffer] = useState(false);
    const [productDetailsMutation, { data: singleProduct, isLoading }] = useProductDetailsMutation();
    const [getReviewMutation, { data: getReviewData, isLoading: reviewProductWiseIsLoading }] = useGetReviewProductWiseMutation();
    const [allReviewImages, { data: reviewImages }] = useReviewImagesMutation();
    const { isHelpfulRefetch } = useContext(LogicProviderContext);
    const { userData } = useAuthUser();
    const [addToCartMutation, { data, isLoading: addToCartIsLoading }] = useAddToCartMutation();
    const [stockRequestMutation, { isLoading: stockRequestIsLoading }] = useStockRequestMutation();
    const [addOrRemoveFromWishListMutation] = useAddToWishListMutation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { cartData, cartRefetch, isCartFetching } = useCartData();
    const { data: wishListItems } = useGetWishListQuery();
    const [updateCartMutation, { isLoading: updateCartIsLoading }] = useUpdateCartMutation();
    const [cartDataList, setCartDataList] = useState([]);
    const [wishListData, setWishListData] = useState([]);
    const { data: getContactQuery } = useGetContactQuery();

    let currentURL = window.location.href;
    //
    useEffect(() => {
        if (cartData?.status) {
            setCartDataList(cartData?.data?.cartData);
            setWishListData(wishListItems?.data);
        }
    }, [cartData, wishListItems]);

    let cartItemIsExist = checkCart(cartDataList, selectedProduct);
    let wishListItemIsExist = checkWishList(wishListData, selectedProduct);
    const handleSelectedShadeData = (id) => {
        // Assuming your product_shades array is stored in a variable called products
        const selectedShade = (typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades).find((shade) => shade.shade_id == id);
        if (selectedShade) {
            setSelectedShade(selectedShade);
            setSelectedProduct(selectedShade);
            setSelectedImage(selectedShade?.shade?.image);
            setMainPrice(selectedShade?.shade_price);
            setDiscountedPrice(selectedShade?.discounted_price);
            try {
                const sliderImages = selectedShade.product_shade_images.map((image) => image.product_shade_image);
                setSliderImages(sliderImages);
            } catch (error) {
                console.error(error);
            }
        }
    };
    const handleSelectedSizeData = (id) => {
        const selectedSize = (typeof singleProduct?.data?.product?.product_sizes === "string" ? JSON.parse(singleProduct.data.product.product_sizes) : singleProduct?.data?.product?.product_sizes).find((size) => size.size_id == id);
        if (selectedSize) {
            setSelectedSize(selectedSize);
            setSelectedProduct(selectedSize);
            setSelectedImage(selectedSize?.shade?.image);
            setMainPrice(selectedSize?.size_price);
            setDiscountedPrice(selectedSize?.discounted_price);
            try {
                const sliderImages = selectedSize.product_size_images.map((image) => image?.product_size_image);
                setSliderImages(sliderImages);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await productDetailsMutation({
                    id: id,
                    user_id: userData?.data?.id ? userData?.data?.id : null,
                });
                // You can do something with the response if needed
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [userData?.status == true, id]);

    useEffect(() => {
        const fetchReviewData = async () => {
            const reviewFilterData = {
                product_id: id,
                user_id: userData?.data?.id ? userData?.data?.id : null,
            };

            try {
                const response = await getReviewMutation(reviewFilterData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchReviewData();
        // fetchData();
    }, [isHelpfulRefetch]);

    useEffect(() => {
        if (!isLoading && (typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)?.length > 0) {
            const availableShadesOnStock = (typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)?.filter((shade) => shade?.stock !== null && shade?.stock != 0);
            //const sortedByStock = [...availableShadesOnStock].sort((a, b) => b.stock - a.stock);
            const initialSelectedShadeId = availableShadesOnStock?.[0]?.shade_id;
            if (initialSelectedShadeId) {
                handleSelectedShadeData(initialSelectedShadeId);
            } else {
                handleSelectedShadeData((typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)?.[0]?.shade_id);
            }
        } else if (!isLoading && (typeof singleProduct?.data?.product?.product_sizes === "string" ? JSON.parse(singleProduct.data.product.product_sizes) : singleProduct?.data?.product?.product_sizes)?.length > 0) {
            const availableSizesOnStock = (typeof singleProduct?.data?.product?.product_sizes === "string" ? JSON.parse(singleProduct.data.product.product_sizes) : singleProduct?.data?.product?.product_sizes)?.filter((size) => size?.stock !== null && size?.stock != 0);
            const sortedByStock = [...availableSizesOnStock].sort((a, b) => b.stock - a.stock);
            const initialSelectedSizeId = sortedByStock?.[0]?.size_id;
            if (initialSelectedSizeId) {
                handleSelectedSizeData(initialSelectedSizeId);
            } else {
                handleSelectedSizeData(singleProduct.data.product?.product_sizes?.[0]?.size_id);
            }
        }
    }, [isLoading, singleProduct]);

    useEffect(() => {
        if (singleProduct?.status === true) {
            const fetchReviewImages = async () => {
                try {
                    // Call the mutate function with the data you want to send
                    const result = await allReviewImages({
                        product_id: singleProduct?.data?.product?.id,
                    });
                    // Handle the result, if needed
                    //
                } catch (error) {
                    // Handle errors
                    console.error("Mutation Error:", error);
                }
            };
            fetchReviewImages();
        }
    }, [singleProduct]);

    useEffect(() => {
        // check arrow key press event
        const handleKeyDown = (e) => {
            // console.log(singleProduct, selectedProduct);

            if (e.key === "ArrowRight") {
                const selectedShadeIndex = (typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)?.findIndex((shade) => parseInt(shade.shade_id) === parseInt(selectedProduct?.shade?.id));
                if (selectedShadeIndex < (typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)?.length - 1) {
                    const nextIndex = selectedShadeIndex + 1;
                    setSelectedShadeIndex(nextIndex);
                    handleSelectedShadeData((typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)[nextIndex]?.shade?.id); // product?.shade?.id
                }
            } else if (e.key === "ArrowLeft") {
                const selectedShadeIndex = (typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)?.findIndex((shade) => parseInt(shade.shade_id) === parseInt(selectedProduct?.shade?.id));
                if (selectedShadeIndex > 0) {
                    const prevIndex = selectedShadeIndex - 1;
                    setSelectedShadeIndex(prevIndex);
                    handleSelectedShadeData((typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)[prevIndex]?.shade?.id);
                }
            }
        };

        // Attach the event listener
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [singleProduct, selectedProduct]);

    const handleIncrement = () => {
        setCounter((prevCounter) => prevCounter + 1);
    };

    const handleDecrement = () => {
        if (counter > 1) {
            setCounter((prevCounter) => prevCounter - 1);
        }
    };

    const handleAddedProductIncrement = async (item) => {
        // setCounter((prevCounter) => prevCounter + 1);
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

    const handleAddedProductDecrement = async (item) => {
        if (item?.quantity > 1) {
            // setCounter((prevCounter) => prevCounter - 1);
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

    const [wishListProductId, setWishListProductId] = useState([]);

    const useQueryParamState = (paramName, setStateFunction, isNumber) => {
        useEffect(() => {
            const searchParams = new URLSearchParams(location.search);
            const paramValues = searchParams.getAll(paramName.toLowerCase());
            setStateFunction(paramValues.map((value) => parseInt(value, 10)));

            if (isNumber) {
                setStateFunction(paramValues.map((value) => parseInt(value, 10)));
            } else {
                setStateFunction(paramValues.map((value) => value));
            }
        }, [location.search, paramName, setStateFunction]);
    };

    // Use the custom hook for each state variable
    useQueryParamState("wishlist_product_id", setWishListProductId);

    const handleBuyNow = async (item, cartItemIsExist) => {
        if (cartItemIsExist == null) {
            if (userData?.status === true) {
                const data = {
                    product_id: item?.product_id,
                    size_id: item?.size_id,
                    // color_id: 30,
                    shade_id: item?.shade_id,
                    quantity: counter,
                    // combo_product_id: 30,
                    // combo_info: 30,
                };
                try {
                    const response = await addToCartMutation(data);
                    if (response?.data?.status) {
                        cartRefetch();
                        navigate(`/buy-now/checkout/${item?.product_id}/${item?.shade_id ? item?.shade_id : item?.size_id}`);
                    } else {
                        showToast(response?.data?.message, "error", "top-end", 2000);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error.message);
                }
            } else {
                navigate("/login-with-email");
            }
        } else {
            //  update existing
            if (userData?.status === true) {
                const data = {
                    id: cartItemIsExist.id,
                    product_id: cartItemIsExist?.product_id,
                    quantity: cartItemIsExist?.quantity,
                };
                try {
                    const response = await updateCartMutation(data);
                    if (response?.data?.status) {
                        cartRefetch();
                        navigate(`/buy-now/checkout/${item?.product_id}/${item?.shade_id ? item?.shade_id : item?.size_id}`);
                    } else {
                        showToast(response?.data?.message, "error", "top-end", 2000);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error.message);
                }
                removeRewardPointsFromStorage();
            } else {
                navigate("/login-with-email");
            }
        }
    };

    const handleServiceOff = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${getContactQuery?.data?.buy_status_note}`,
        });
    };

    const handleAddToCart = async (item) => {
        if (userData?.status === true) {
            const data = {
                product_id: item?.product_id,
                size_id: item?.size_id,
                // color_id: 30,
                shade_id: item?.shade_id,
                quantity: counter,
                // combo_product_id: 30,
                // combo_info: 30,
            };
            try {
                const response = await addToCartMutation(data);
                //
                if (response?.data?.status) {
                    showToast(response?.data?.message, "success", "top-end", 2000);
                    cartRefetch();
                    if (wishListProductId?.length > 0) {
                        if (userData?.status === true) {
                            const data = {
                                product_id: wishListProductId?.[0],
                            };
                            try {
                                const response = await addOrRemoveFromWishListMutation(data);
                                //
                                if (response?.data?.data) {
                                    // setAddToBagAnimation(true);
                                    // showToast("Item removed from wishlist");
                                }
                            } catch (error) {
                                console.error("Error fetching data:", error.message);
                            }
                        } else {
                            navigate("/login-with-email");
                        }
                    }
                } else {
                    showToast(response?.data?.message, "error", "top-end", 2000);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        } else {
            navigate("/login-with-email");
        }
    };

    const handleWishList = async (item) => {
        //
        if (userData?.status) {
            const data = {
                product_id: item?.product_id,
            };
            try {
                const response = await addOrRemoveFromWishListMutation(data);
                //
                if (response?.data?.status) {
                    // setAddToBagAnimation(true);
                    showToast(response?.data?.message, "success", "top-end", 2000);
                } else {
                    showToast(response?.data?.message, "error", "top-end", 2000);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        } else {
            navigate("/login-with-email");
        }
    };

    const handleRequestStock = async (item) => {
        if (userData?.status === true) {
            const data = {
                product_id: item?.product_id,
                ...(item?.size_id && { size_id: item?.size_id }),
                ...(item?.shade_id && { shade_id: item?.shade_id }),
            };

            try {
                const response = await stockRequestMutation(data);

                if (response?.data?.status) {
                    showToast(response?.data?.message, "success", "top-end", 2000);
                } else {
                    showToast(response?.data?.message, "error", "top-end", 2000);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        } else {
            navigate("/login-with-email");
        }
    };

    const reviewsSectionRef = useRef(null);
    //scrollToReviews
    const scrollToReviews = () => {
        if (reviewsSectionRef.current) {
            const offset = 160;
            const elementPosition = reviewsSectionRef.current.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    const [dropDownItemsForShade, setDropDownItemsForShade] = useState(null);
    const [dropDownItemsForSize, setDropDownItemsForSize] = useState(null);

    useEffect(() => {
        if (Array.isArray(typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades) && (typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)?.length > 0) {
            const result = (typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)?.map((item) => ({
                label: item?.shade?.name,
                key: `${item?.shade?.id}`,
            }));

            setDropDownItemsForShade(result);
        } else if (Array.isArray(typeof singleProduct?.data?.product?.product_sizes === "string" ? JSON.parse(singleProduct.data.product.product_sizes) : singleProduct?.data?.product?.product_sizes) && (typeof singleProduct?.data?.product?.product_sizes === "string" ? JSON.parse(singleProduct.data.product.product_sizes) : singleProduct?.data?.product?.product_sizes)?.length > 0) {
            const result = (typeof singleProduct?.data?.product?.product_sizes === "string" ? JSON.parse(singleProduct.data.product.product_sizes) : singleProduct?.data?.product?.product_sizes)?.map((item) => ({
                label: item?.size?.name,
                key: `${item?.size?.id}`,
            }));

            setDropDownItemsForSize(result);
        }
    }, [singleProduct]);

    if (isLoading) {
        return <ProductDetailsSkeleton />;
    }

    return (
        <>
            {singleProduct?.status === true && (
                <>
                    <div className=" container mx-auto">
                        <Breadcrumbs className={"mt-2 mb-1 md:my-4 px-[10px]"} first={"Home"} second={singleProduct?.data?.product?.name} />
                        {/* Product slider and title start */}
                        <div className="rounded mx-[10px]" style={{ boxShadow: "0px 0px 6px 0px #E4EDF0" }}>
                            <div className="md:flex justify-between gap-x-4 xl:gap-x-0 my-3">
                                {/* product image start */}
                                <div className=" w-full md:w-4/12">
                                    <SingleProductsSlider sliderImages={sliderImages} />
                                </div>
                                {/* product image end */}
                                {/* title and details start */}
                                <div className=" w-full md:w-8/12 relative">
                                    <div className="md:border-s-[1px] h-full flex flex-col justify-between">
                                        <div className="px-1 md:ps-5 md:pt-5 md:pe-5 md:pb-3">
                                            <div>
                                                <h1 className=" sm:text-xl md:text-xl font-medium mb-[10px] md:mb-3 md:leading-[28px]">{singleProduct?.data?.product?.name}</h1>
                                                <div className="flex flex-wrap items-center gap-x-2 mb-2 md:mb-3">
                                                    {singleProduct?.data?.product?.brand_id && (typeof singleProduct?.data?.product?.brand === "string" ? JSON.parse(singleProduct.data.product.brand) : singleProduct?.data?.product?.brand)?.name && (
                                                        <>
                                                            <p className="whitespace-nowrap text-[#000000CC] font-inter text-xs md:text-sm font-normal leading-normal">
                                                                Brand:
                                                                <Link to={`/product-filter?brand=${(typeof singleProduct?.data?.product?.brand === "string" ? JSON.parse(singleProduct.data.product.brand)?.slug : singleProduct?.data?.product?.brand)?.slug}`}>
                                                                    <span className="text-black font-medium hover:cursor-pointer"> {(typeof singleProduct?.data?.product?.brand === "string" ? JSON.parse(singleProduct.data.product.brand)?.name : singleProduct?.data?.product?.brand)?.name}</span>
                                                                </Link>
                                                            </p>
                                                            <div className="border-[0.1px] h-4"></div>
                                                        </>
                                                    )}
                                                    {/*{singleProduct?.data?.product?.variation_type === "shade" && (*/}
                                                    {/*    <>*/}
                                                    {/*        <p className="whitespace-nowrap text-[#000000CC] font-inter text-xs md:text-sm font font-normal leading-normal">*/}
                                                    {/*            Shade: <span className="text-black font-medium">{selectedShade?.shade?.name}</span>*/}
                                                    {/*        </p>*/}
                                                    {/*    </>*/}
                                                    {/*)}*/}
                                                    {(typeof singleProduct?.data?.product?.country === "string" ? JSON.parse(singleProduct.data.product.country) : singleProduct?.data?.product?.country) !== null && (
                                                        <>
                                                            <div className="border-[0.1px] h-4"></div>

                                                            <p className="whitespace-nowrap text-[#000000CC] font-inter text-xs md:text-sm font font-normal leading-normal">
                                                                Country: <span className="text-black font-medium">{(typeof singleProduct?.data?.product?.country === "string" ? JSON.parse(singleProduct.data.product.country) : singleProduct?.data?.product?.country)?.name}</span>
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-2 mb-2 md:mb-3">
                                                    <StarRating rating={singleProduct?.data?.product?.reviews_avg_star} totalStars={5} scrollToReviews={scrollToReviews} />
                                                    <div className="border-[0.1px] h-4"></div>
                                                    <div className="text-black font-inter text-xs md:text-sm font-normal leading-normal flex items-center">
                                                        <span className="text-black font-medium text-lg">
                                                            {singleProduct?.data?.product?.reviews_avg_star == null ? "0.00" : parseFloat(singleProduct?.data?.product?.reviews_avg_star).toFixed(2)}
                                                            /5
                                                        </span>
                                                        <span className="ml-2 text-gray-600 text-base">
                                                            ({singleProduct?.data?.product?.reviews_count} ratings & {singleProduct?.data?.product?.reviews_count} reviews)
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* price area start */}
                                                {parseFloat(selectedProduct?.discount_percent) > 0 ? (
                                                    <div className={`flex flex-wrap items-center gap-x-2 mb-2 ${selectedProduct?.offers?.length > 0 ? "" : "md:mb-8"}`}>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h2 className="flex items-center text-[28px] font-semibold tracking-[-1.12px] leading-[42px]">৳{discountedPrice}</h2>
                                                            <span className="flex flex-wrap items-center gap-2 font-medium">
                                                                <h4 className="flex items-center text-base font-semibold text-[#999] line-through">৳{mainPrice}</h4>
                                                            </span>
                                                        </div>
                                                        <div className="border-[0.1px] h-4"></div>
                                                        <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                                                            <span className="text-[#02792A] font-semibold text-base">(-{parseInt(selectedProduct?.discount_percent)}% Off)</span>
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <h2 className="flex items-center text-[28px] font-semibold tracking-[-1.12px] leading-[42px]">৳{mainPrice}</h2>
                                                )}
                                                {/* price area end */}
                                            </div>

                                            {/* offer area start */}
                                            {selectedShade?.offers?.length > 0 && (
                                                <div className="bg-[#EDEFF0] py-3 ps-2 md:ps-4 mb-3 md:mb-4">
                                                    <ul className=" ps-4">
                                                        {isReviewMoreOffer ? (
                                                            <>
                                                                {selectedShade?.offers?.map((offer, i) => (
                                                                    <span key={i}>
                                                                        <Link to={`/campaign/${offer?.product_details?.offer_id}`}>
                                                                            <li className="list-disc text-[#000000CC] font-Inter text-xs xs:text-sm font-normal leading-normal hover:cursor-pointer">{offer?.title}</li>
                                                                        </Link>
                                                                    </span>
                                                                ))}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {selectedShade?.offers?.slice(0, 2)?.map((offer, i) => (
                                                                    <span key={i}>
                                                                        <Link to={`/campaign/${offer?.product_details?.offer_id}`}>
                                                                            <li className="list-disc text-[#000000CC] font-Inter text-xs xs:text-sm font-normal leading-normal hover:cursor-pointer">{offer?.title}</li>
                                                                        </Link>
                                                                    </span>
                                                                ))}
                                                            </>
                                                        )}

                                                        {selectedProduct?.offers?.length > 2 ? (
                                                            isReviewMoreOffer ? (
                                                                <li onClick={() => setIsReviewMoreOffer(false)} className=" text-[#0094CF] font-Inter text-xs xs:text-sm font-normal leading-normal hover:cursor-pointer">
                                                                    View Less
                                                                </li>
                                                            ) : (
                                                                <li onClick={() => setIsReviewMoreOffer(true)} className=" text-[#0094CF] font-Inter text-xs xs:text-sm font-normal leading-normal hover:cursor-pointer">
                                                                    View More Offers
                                                                </li>
                                                            )
                                                        ) : (
                                                            ""
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                            {selectedSize?.offers?.length > 0 && (
                                                <div className="bg-[#EDEFF0] py-3 ps-2 md:ps-4 mb-3 md:mb-4">
                                                    <ul className=" ps-4">
                                                        {isReviewMoreOffer ? (
                                                            <>
                                                                {selectedSize?.offers?.map((offer, i) => (
                                                                    <span key={i}>
                                                                        <Link to={`/campaign/${offer?.product_details?.offer_id}`}>
                                                                            <li className="list-disc text-[#000000CC] font-Inter text-xs xs:text-sm font-normal leading-normal hover:cursor-pointer">{offer?.title}</li>
                                                                        </Link>
                                                                    </span>
                                                                ))}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {selectedSize?.offers?.slice(0, 2)?.map((offer, i) => (
                                                                    <span key={i}>
                                                                        <Link to={`/campaign/${offer?.product_details?.offer_id}`}>
                                                                            <li className="list-disc text-[#000000CC] font-Inter text-xs xs:text-sm font-normal leading-normal hover:cursor-pointer">{offer?.title}</li>
                                                                        </Link>
                                                                    </span>
                                                                ))}
                                                            </>
                                                        )}

                                                        {selectedProduct?.offers?.length > 2 ? (
                                                            isReviewMoreOffer ? (
                                                                <li onClick={() => setIsReviewMoreOffer(false)} className=" text-[#0094CF] font-Inter text-xs xs:text-sm font-normal leading-normal hover:cursor-pointer">
                                                                    View Less
                                                                </li>
                                                            ) : (
                                                                <li onClick={() => setIsReviewMoreOffer(true)} className=" text-[#0094CF] font-Inter text-xs xs:text-sm font-normal leading-normal hover:cursor-pointer">
                                                                    View More Offers
                                                                </li>
                                                            )
                                                        ) : (
                                                            ""
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                            {/* offer area end */}
                                            <div className="mb-4">
                                                {/* Shade & Size start */}
                                                {singleProduct?.data?.product?.variation_type === "shade" ? (
                                                    <div className="mb-4">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <>
                                                                {Array?.isArray(dropDownItemsForShade) && dropDownItemsForShade?.length > 0 && (
                                                                    <Dropdown
                                                                        overlayStyle={{ minWidth: "200px" }}
                                                                        placement="bottomLeft"
                                                                        trigger={["click"]}
                                                                        overlay={
                                                                            <Menu>
                                                                                {dropDownItemsForShade.map((item) => (
                                                                                    <Menu.Item key={item.key} onClick={() => handleSelectedShadeData(item.key)}>
                                                                                        {item.label}
                                                                                    </Menu.Item>
                                                                                ))}
                                                                            </Menu>
                                                                        }
                                                                    >
                                                                        <a onClick={(e) => e.preventDefault()}>
                                                                            <Space>
                                                                                <span className="hover:cursor-pointer"> {selectedProduct?.shade?.name}</span>
                                                                                <IoIosArrowDown />
                                                                            </Space>
                                                                        </a>
                                                                    </Dropdown>
                                                                )}
                                                            </>
                                                            <p className="text-[#000000CC] text-sm font-medium leading-normal border-b-2 border-[#5DC9F4]">All Shades ({singleProduct?.data?.product?.all_shades_count})</p>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            {/* <div className="w-28 h-24 bg-[#021f5e] rounded-md"></div> */}
                                                            <div className="w-28 h-24 rounded-md overflow-hidden">
                                                                <ImageURL image={selectedImage} className={"w-28 h-24 object-fill"} />
                                                            </div>
                                                            <div className="border h-24 overflow-hidden overflow-y-auto slim-scroll p-2 w-full flex gap-2 flex-wrap">
                                                                {Array.isArray(typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades) &&
                                                                    [...(typeof singleProduct?.data?.product?.product_shades === "string" ? JSON.parse(singleProduct.data.product.product_shades) : singleProduct?.data?.product?.product_shades)]?.map((product, index) => (
                                                                        <Fragment key={index}>
                                                                            {product?.stock == null ? (
                                                                                <Tooltip placement="top" title={"Stock Out"}>
                                                                                    <div className={` rounded hover:cursor-pointer overflow-hidden relative ${product?.shade?.id == selectedShade?.shade_id ? "shadow-[rgba(0,0,15,0.5)_0px_0px_2px_2px] border-[2px] border-white w-[37px] h-[37px]" : "w-9 h-9"}`}>
                                                                                        <div
                                                                                            onClick={() => {
                                                                                                setSelectedShadeIndex(index);
                                                                                                handleSelectedShadeData(product?.shade?.id);
                                                                                            }}
                                                                                            className={`absolute top-0 left-0 w-full h-full flex justify-center items-center`}
                                                                                        >
                                                                                            <FaTimes className="text-white" />
                                                                                        </div>
                                                                                        <div className=" w-full h-full">
                                                                                            <ImageURL image={product?.shade?.image} className={"object-fill w-full h-full"} />
                                                                                        </div>
                                                                                    </div>
                                                                                </Tooltip>
                                                                            ) : product?.stock == 0 ? (
                                                                                <Tooltip placement="top" title={"Stock Out"}>
                                                                                    <div className={` rounded hover:cursor-pointer overflow-hidden relative ${product?.shade?.id == selectedShade?.shade_id ? "shadow-[rgba(0,0,15,0.5)_0px_0px_2px_2px] border-[2px] border-white w-[37px] h-[37px]" : "w-9 h-9"}`}>
                                                                                        <div
                                                                                            onClick={() => {
                                                                                                setSelectedShadeIndex(index);
                                                                                                handleSelectedShadeData(product?.shade?.id);
                                                                                            }}
                                                                                            className={`absolute top-0 left-0 w-full h-full flex justify-center items-center`}
                                                                                        >
                                                                                            <FaTimes className="text-white" />
                                                                                        </div>
                                                                                        <div className=" w-full h-full">
                                                                                            <ImageURL image={product?.shade?.image} className={"object-fill w-full h-full"} />
                                                                                        </div>
                                                                                    </div>
                                                                                </Tooltip>
                                                                            ) : (
                                                                                <div
                                                                                    // className={`w-9 h-9 rounded hover:cursor-pointer overflow-hidden relative ${
                                                                                    //   product?.shade?.id == selectedShade?.shade_id && "shadow-lg"
                                                                                    // }`}
                                                                                    className={` rounded hover:cursor-pointer overflow-hidden relative ${product?.shade?.id == selectedShade?.shade_id ? "shadow-[rgba(0,0,15,0.5)_0px_0px_2px_2px] border-[2px] border-white w-[37px] h-[37px]" : "w-9 h-9"}`}
                                                                                >
                                                                                    <div className={`${product?.shade?.id == selectedShade?.shade_id ? "block" : "hidden"} absolute top-0 left-0 w-full h-full flex justify-center items-center`}>
                                                                                        {/* bg-black bg-opacity-20 */}
                                                                                        <FaCheck className="text-white" />
                                                                                    </div>
                                                                                    <div
                                                                                        className=" w-full h-full"
                                                                                        onClick={() => {
                                                                                            setSelectedShadeIndex(index);
                                                                                            handleSelectedShadeData(product?.shade?.id);
                                                                                        }}
                                                                                    >
                                                                                        <ImageURL image={product?.shade?.image} className={"object-fill w-full h-full"} />
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </Fragment>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="mb-4">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="relative">
                                                                <div
                                                                    // onClick={() => setShadeName(!shadeName)}
                                                                    className="flex items-center gap-1 sm:gap-4 mb-2"
                                                                >
                                                                    {/* <p className="text-[#000000CC] text-sm font-medium leading-normal">{selectedProduct?.size?.name}</p> */}
                                                                    <>
                                                                        {Array?.isArray(dropDownItemsForSize) && dropDownItemsForSize?.length > 1 && (
                                                                            <Dropdown
                                                                                overlayStyle={{ minWidth: "200px" }}
                                                                                placement="bottomLeft"
                                                                                trigger={["click"]}
                                                                                overlay={
                                                                                    <Menu>
                                                                                        {dropDownItemsForSize.map((item) => (
                                                                                            <Menu.Item key={item.key} onClick={() => handleSelectedSizeData(item.key)}>
                                                                                                {item.label}
                                                                                            </Menu.Item>
                                                                                        ))}
                                                                                    </Menu>
                                                                                }
                                                                            >
                                                                                <a onClick={(e) => e.preventDefault()}>
                                                                                    <Space>
                                                                                        <span className="hover:cursor-pointer"> {selectedProduct?.size?.name}</span>
                                                                                        <IoIosArrowDown />
                                                                                    </Space>
                                                                                </a>
                                                                            </Dropdown>
                                                                        )}
                                                                    </>
                                                                    {/* <span className={`${shadeName ? "rotate-180" : ""}`}>
                                                                        <FaAngleDown />
                                                                    </span> */}
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        boxShadow: "0px 0px 6px 0px #E4EDF0",
                                                                    }}
                                                                    className={`absolute top-6 w-36  whitespace-nowrap bg-white rounded overflow-hidden z-20 ${shadeName ? "block" : "hidden"}`}
                                                                >
                                                                    {(typeof singleProduct?.data?.product?.product_sizes === "string" ? JSON.parse(singleProduct.data.product.product_sizes) : singleProduct?.data?.product?.product_sizes)?.map((item, index) => (
                                                                        <p key={index} className="text-[#000000A6]   text-sm font-medium leading-normal hover:bg-primary-color p-2 hover:cursor-pointer">
                                                                            {item?.size?.name}
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            {/* <p className="text-[#000000CC] text-sm font-medium leading-normal border-b-2 border-[#5DC9F4]">
                                                                              All Shades (32)
                                                                          </p> */}
                                                        </div>
                                                        <div className="flex items-start flex-wrap gap-2">
                                                            {/* {(typeof singleProduct?.data?.product?.product_sizes === "string" ? JSON.parse(singleProduct.data.product.product_sizes) : singleProduct?.data?.product?.product_sizes)?.map((item, index) => (
                                                                <Button
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setSelectedSizeIndex(index);
                                                                        handleSelectedSizeData(item?.size_id);
                                                                    }}
                                                                    className={`text-base font-medium px-2 py-1 rounded-md text-black tracking-[-0.16px] ${
                                                                        index == selectedSizeIndex ? "bg-primary-color text-white" : ""
                                                                    }`}
                                                                    variant="bordered"
                                                                >
                                                                    {item?.size?.name}
                                                                </Button>
                                                            ))} */}

                                                            {Array.isArray(typeof singleProduct?.data?.product?.product_sizes === "string" ? JSON.parse(singleProduct.data.product.product_sizes) : singleProduct?.data?.product?.product_sizes) &&
                                                                [...(typeof singleProduct?.data?.product?.product_sizes === "string" ? JSON.parse(singleProduct.data.product.product_sizes) : singleProduct?.data?.product?.product_sizes)]
                                                                    ?.sort((a, b) => b.stock - a.stock)
                                                                    ?.map((product, index) => (
                                                                        <Fragment key={index}>
                                                                            {product?.stock == null ? (
                                                                                <Tooltip placement="top" title={"Stock Out"}>
                                                                                    <Button
                                                                                        variant="bordered"
                                                                                        onClick={() => {
                                                                                            setSelectedSizeIndex(index);
                                                                                            handleSelectedSizeData(product?.size_id);
                                                                                        }}
                                                                                        className={`text-base font-medium px-2 py-1 rounded-md tracking-[-0.16px] bg-[#021f5e] text-white border-[#021f5e]`}
                                                                                        // className={`text-base font-medium px-2 py-1 rounded-md text-black tracking-[-0.16px] ${
                                                                                        //   product?.size?.id == selectedProduct?.size_id ? "bg-primary-color text-white" : ""
                                                                                        // }`}
                                                                                    >
                                                                                        {product?.size?.name}
                                                                                    </Button>
                                                                                </Tooltip>
                                                                            ) : product?.stock == 0 ? (
                                                                                <Tooltip placement="top" title={"Stock Out"}>
                                                                                    <Button
                                                                                        variant="bordered"
                                                                                        onClick={() => {
                                                                                            setSelectedSizeIndex(index);
                                                                                            handleSelectedSizeData(product?.size_id);
                                                                                        }}
                                                                                        className={`text-base font-medium px-2 py-1 rounded-md tracking-[-0.16px] bg-[#021f5e] text-white border-[#021f5e]`}
                                                                                        // className={`text-base font-medium px-2 py-1 rounded-md text-black tracking-[-0.16px] ${
                                                                                        //   product?.size?.id == selectedProduct?.size_id ? "bg-primary-color text-white" : ""
                                                                                        // }`}
                                                                                    >
                                                                                        {product?.size?.name}
                                                                                    </Button>
                                                                                </Tooltip>
                                                                            ) : (
                                                                                <Button
                                                                                    key={index}
                                                                                    onClick={() => {
                                                                                        setSelectedSizeIndex(index);
                                                                                        handleSelectedSizeData(product?.size_id);
                                                                                    }}
                                                                                    className={`text-base font-medium px-2 py-1 rounded-md text-black tracking-[-0.16px] ${product?.size?.id == selectedProduct?.size_id ? "bg-primary-color text-white" : ""}`}
                                                                                    variant="bordered"
                                                                                >
                                                                                    {product?.size?.name}
                                                                                </Button>
                                                                            )}
                                                                        </Fragment>
                                                                    ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Shade & Size end */}
                                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                                    <p className="text-sm font-semibold">Quantity</p>
                                                    {cartItemIsExist == null ? (
                                                        <div className="w-[104px] h-9 border rounded-md border-[#5DC9F4] flex items-center">
                                                            <button onClick={handleDecrement} className=" px-[9px]  text-[#5DC9F4] border-e-[1.2px] border-[#5DC9F4]">
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
                                                            <button onClick={handleIncrement} className="py-[0.8px] px-2 text-[#5DC9F4] border-s-[1.2px] border-[#5DC9F4]">
                                                                <FiPlus />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="w-[104px] h-9 border rounded-md border-[#5DC9F4] flex items-center">
                                                            <button
                                                                // onClick={() => handleAddedProductDecrement(cartItemIsExist)}
                                                                className=" px-[9px]  text-[#5DC9F4] border-e-[1.2px] border-[#5DC9F4]"
                                                            >
                                                                {/* <TbMinus /> */}
                                                                {updateCartIsLoading || isCartFetching ? <TbMinus className=" text-[#5dc9f4a6] hover:cursor-not-allowed" /> : <TbMinus onClick={() => handleAddedProductDecrement(cartItemIsExist)} className="hover:cursor-pointer" />}
                                                            </button>
                                                            <input
                                                                type="number"
                                                                value={cartItemIsExist?.quantity}
                                                                readOnly
                                                                // onChange={handleInputChange}
                                                                className={`text-center text-[#5DC9F4] h-7 w-8 
                                                                  ${isNaN(cartItemIsExist?.quantity) ? "border-[#5DC9F4] outline-none" : "border-[#5DC9F4] outline-none"}
                                                                  `}
                                                            />
                                                            <button
                                                                // onClick={() => handleAddedProductIncrement(cartItemIsExist)}
                                                                className="py-[0.8px] px-2 text-[#5DC9F4] border-s-[1.2px] border-[#5DC9F4]"
                                                            >
                                                                {/* <TbPlus /> */}
                                                                {updateCartIsLoading || isCartFetching ? <TbPlus className=" text-[#5dc9f4a6] hover:cursor-not-allowed" /> : <TbPlus onClick={() => handleAddedProductIncrement(cartItemIsExist)} className="hover:cursor-pointer" />}
                                                            </button>
                                                            {updateCartIsLoading || isCartFetching ? (
                                                                <span className="ms-2 mb-1">
                                                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} />}></Spin>
                                                                </span>
                                                            ) : (
                                                                ""
                                                            )}
                                                            {/* { isCartFetching && <span className="ms-2 mb-1"><Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} />}></Spin></span>} */}
                                                            {cartItemIsExist?.stock_status == 0 && <p className="whitespace-nowrap ms-3 text-[#021f5e]">Stock out</p>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between gap-1">
                                                    <div className="flex items-center gap-2 md:gap-5">
                                                        {selectedProduct?.stock !== 0 &&
                                                            selectedProduct?.stock !== null &&
                                                            (getContactQuery?.data?.buy_status === 0 ? (
                                                                <Button onClick={handleServiceOff} className="rounded text-black text-xs xs:text-base px-2 xs:px-5 py-[9px] font-semibold md:px-10 border-black" variant="bordered">
                                                                    Buy Now
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    onClick={() => {
                                                                        handleBuyNow(selectedProduct, cartItemIsExist);
                                                                    }}
                                                                    className="rounded text-black text-xs xs:text-base px-2 xs:px-5 py-[9px] font-semibold md:px-10 border-black"
                                                                    variant="bordered"
                                                                >
                                                                    Buy Now
                                                                </Button>
                                                            ))}

                                                        <>
                                                            {selectedProduct?.stock == 0 || selectedProduct?.stock === null ? (
                                                                <>
                                                                    {stockRequestIsLoading ? (
                                                                        <Button className=" rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10" variant="">
                                                                            Requesting...
                                                                        </Button>
                                                                    ) : (
                                                                        <Button
                                                                            onClick={() => {
                                                                                handleRequestStock(selectedProduct);
                                                                            }}
                                                                            className=" rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10"
                                                                            variant=""
                                                                        >
                                                                            Request Stock
                                                                        </Button>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {cartItemIsExist == null ? (
                                                                        <>
                                                                            {addToCartIsLoading ? (
                                                                                <Button className="rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10" variant="">
                                                                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 15 }} />}></Spin> <span className="ms-1">Add to Bag</span>
                                                                                </Button>
                                                                            ) : (
                                                                                <>
                                                                                    {getContactQuery?.data?.buy_status == 0 ? (
                                                                                        <Button onClick={handleServiceOff} className="rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10" variant="">
                                                                                            Add To Bag
                                                                                        </Button>
                                                                                    ) : (
                                                                                        <Button
                                                                                            onClick={() => {
                                                                                                handleAddToCart(selectedProduct);
                                                                                            }}
                                                                                            className="rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10"
                                                                                            variant=""
                                                                                        >
                                                                                            Add To Bag
                                                                                        </Button>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <Button
                                                                            // onClick={() => {
                                                                            //     handleAddToCart(selectedProduct);
                                                                            // }}
                                                                            className="rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10 hover:cursor-not-allowed"
                                                                            variant=""
                                                                        >
                                                                            Added To Bag
                                                                        </Button>
                                                                    )}
                                                                </>
                                                            )}
                                                        </>

                                                        <Button onClick={() => handleWishList(selectedProduct)} className={`rounded font-semibold  text-xs px-2 py-1 xs:py-2 xs:px-5 md:py-[8px] ${wishListItemIsExist == null || "bg-primary-color"}`} variant="bordered">
                                                            <FaRegHeart size={25} className={`${wishListItemIsExist == null || "text-white"}`} />
                                                        </Button>
                                                    </div>
                                                    {/* <BsFillShareFill className="text-[#999999] text-end md:me-2 lg:me-10 hover:cursor-pointer w-5 h-5 sm:w-7 sm:h-7" /> */}
                                                    <div onClick={() => setIsShare(!isShare)} className="relative">
                                                        <BsFillShareFill className="text-[#999999] text-end me-1 hover:cursor-pointer w-5 h-5 sm:w-7 sm:h-7" />
                                                        <div className={`bg-white absolute top-10 md:top-12 -right-5  filter drop-shadow-md ${isShare ? "block" : "hidden"} `}>
                                                            <div className="relative">
                                                                <div className=" w-6 h-6 rotate-45 -z-10 bg-white absolute right-5 sm:right-3 md:right-3 lg:right-5 -mt-3"></div>
                                                                <div className="">
                                                                    <ShareSocial />
                                                                    {/* <div className="flex items-center gap-6 "> */}
                                                                    {/* <ShareSocial style={socialStyle} url={currentURL} socialTypes={["facebook", "linkedin", "twitter", "whatsapp"]} /> */}
                                                                    {/* <span className="whitespace-nowrap me-1 text-[10px] font-medium">Share via:</span>
                                                                    <span className="whitespace-nowrap hover:cursor-pointer h-min flex flex-col justify-center">
                                                                        <BsLink45Deg className="mx-auto" />
                                                                        <span className="text-[8px] font-medium">Copy Link</span>
                                                                    </span>
                                                                    <span>
                                                                        <BsFacebook className="text-[#1255D9] h-5 w-5 sm:h-7 sm:w-7 hover:cursor-pointer" />
                                                                    </span>
                                                                    <span>
                                                                        <BsLinkedin className="text-[#3051C4] h-5 w-5 sm:h-7 sm:w-7 hover:cursor-pointer" />
                                                                    </span> */}
                                                                    {/* </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* applicable offers start */}
                                        {/* {productWithTypeId3?.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 ms-4 mb-4">
                                                {productWithTypeId3?.map((offer, index) => (
                                                    <div
                                                        key={index}
                                                        className="text-[12px] bg-[#021f5e] rounded  px-2 py-1 text-white whitespace-nowrap"
                                                    >
                                                        {offer?.title}
                                                    </div>
                                                ))}
                                            </div>
                                        )} */}
                                        {/* applicable offers end */}

                                        <div className="flex items-center justify-between bg-[#D4F3FF] w-full md:py-2 py-3 px-2 md:px-5">
                                            <div className="flex items-center flex-col md:flex-row gap-2">
                                                <img className="md:h-6  h-10" src={genuineProductsImage} alt="" />
                                                <p className="text-[#000000A6] font-inter  xs:text-sm text-center md:text-start text-xs font-medium leading-normal">100% Genuine Products</p>
                                            </div>
                                            <div className="flex items-center flex-col md:flex-row gap-2">
                                                <img className="md:h-6 h-10" src={returnPolicyImage} alt="" />
                                                <p className="text-[#000000A6] font-inter  xs:text-sm text-xs  text-center md:text-start font-medium leading-normal">Easy Return Policy</p>
                                            </div>
                                            <div className="flex items-center flex-col md:flex-row gap-2">
                                                <img className="md:h-6  h-10" src={soldByImage} alt="" />

                                                <p className="text-[#000000A6] font-inter  xs:text-sm text-xs  text-center md:text-start font-medium leading-normal">
                                                    Help Center:
                                                    <a href="https://wa.me/+8801775423477" target="_blank" rel="noopener noreferrer" className=" underline text-[#5dc9f4] md:pl-1">
                                                        (+8801775423477)
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* title and details end*/}
                            </div>
                        </div>

                        {/* Product slider and title end*/}
                        <h5 className="text-black font-Inter text-xl font-semibold px-[10px] mt-3 mb-2 md:mb-4 md:mt-6">Product Description</h5>
                        <div className="flex items-start gap-7 ">
                            <div className="w-full">
                                <div className="mb-6 px-[10px]">
                                    <TabForProductDetails productDetails={singleProduct?.data?.product} />
                                </div>
                                <div className="mb-6">
                                    <h5 className="text-black px-[10px] text-lg font-semibold mb-4">Customers also Viewed</h5>
                                    <SwiperSlider>
                                        {Array.isArray(singleProduct?.data?.customer_also_viewed) &&
                                            singleProduct?.data?.customer_also_viewed?.map((item, i) => (
                                                <SwiperSlide key={i}>
                                                    <CenterAlignCardFilter key={i} item={item} />
                                                </SwiperSlide>
                                            ))}
                                    </SwiperSlider>
                                </div>
                                <div>
                                    <h5 className="text-black px-[10px] text-lg font-semibold mb-4">Product Details</h5>
                                    {/* rating start */}
                                    <div className="rounded p-1 mb-10 md:mb-20 mx-[10px]" ref={reviewsSectionRef} id="reviews-section" style={{ boxShadow: "0px 0px 6px 0px #E4EDF0" }}>
                                        <div className="border-b-[1px] flex justify-between md:px-5 overflow-hidden overflow-x-auto slim-scroll">
                                            <p className={`text-[#000000A6] text-sm font-semibold leading-5 border-b-primary-color py-[15px] text-black`}>Ratings & Reviews</p>
                                            <div className="flex items-center md:hidden gap-5">
                                                {singleProduct?.data?.product?.review_eligible == true && (
                                                    <div>
                                                        <Button onClick={() => setIsCreateReview((prev) => !prev)} className="border-black text-black px-3 rounded-md" variant="bordered">
                                                            Write Review
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="py-2 md:px-5 md:pt-5">
                                            <div className={`flex  ${isCreateReview ? "items-start" : "items-center"} gap-4 pb-2 md:pb-4`}>
                                                <div className="flex items-center gap-2">
                                                    <h1 className="text-black font-inter text-2xl md:text-5xl font-bold leading-normal">
                                                        {singleProduct?.data?.product?.reviews_avg_star == null ? 0 : parseFloat(singleProduct?.data?.product?.reviews_avg_star).toFixed(2)}/<span className="font-medium">5</span>
                                                    </h1>
                                                    <div>
                                                        <p className="text-black  text-sm font-semibold leading-normal">Overall Ratings</p>
                                                        <p className="text-[#000000A6]  text-xs font-normal leading-normal">{singleProduct?.data?.product?.reviews_count == null ? 0 : parseFloat(singleProduct?.data?.product?.reviews_count).toFixed(0)} verified ratings</p>
                                                    </div>
                                                </div>

                                                {singleProduct?.data?.product?.review_eligible == true && (
                                                    <>
                                                        <Divider className={`h-10 hidden md:block ${isCreateReview && "h-56"}`} type="vertical" />
                                                        {isCreateReview ? (
                                                            <CreateReview className={"hidden md:block"} cancel={setIsCreateReview} myReview={singleProduct?.data?.product?.my_review} order_id={singleProduct?.data?.product?.order_id} />
                                                        ) : (
                                                            <div className="hidden md:flex items-center gap-5">
                                                                <div>
                                                                    <p className="text-[#000000A6]  text-sm font-semibold leading-normal">Add your Review</p>
                                                                </div>
                                                                <div>
                                                                    <Button onClick={() => setIsCreateReview((prev) => !prev)} className="border-black text-black px-7 rounded-md" variant="bordered">
                                                                        Write Review
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            {singleProduct?.data?.product?.review_eligible == true && <div>{isCreateReview && <CreateReview className={"block md:hidden"} cancel={setIsCreateReview} myReview={singleProduct?.data?.product?.my_review} order_id={singleProduct?.data?.product?.order_id} />}</div>}

                                            <div className="border-t-[1px] border-b-[1px] overflow-hidden py-5">
                                                <p className={`text-[#000000A6] text-sm font-semibold leading-5  pb-[15px] text-black mb-1`}>Photos From Customers</p>
                                                <Link to={`/all-review/${id}?selected_image=true&&product_name=${singleProduct?.data?.product?.name}&&reviews_avg_star=${singleProduct?.data?.product?.reviews_avg_star}&&eligible=${singleProduct?.data?.product?.review_eligible}`}>
                                                    <div className="flex items-center gap-4">
                                                        {reviewImages?.data?.slice(0, 5)?.map((item, index) => (
                                                            <div key={index} className="min-w-[55px] max-w-[40px]  md:max-w-[100px]">
                                                                <ImageURL className={"h-full w-full object-cover"} image={item?.image} />
                                                            </div>
                                                        ))}
                                                        <div className="min-w-[55px]  max-w-[40px] md:max-w-[100px] relative ">
                                                            <ImageURL className={"h-full w-full object-cover"} image={reviewImages?.data?.[6]?.image} />
                                                            {reviewImages?.data?.length > 6 && (
                                                                <div className="z-10 absolute top-0 left-0 w-full h-full bg-black opacity-50 flex justify-center items-center">
                                                                    <p>+{reviewImages?.data?.length - 6}more</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="">
                                                <p className={`text-[#000000A6] text-sm font-semibold leading-5 pt-3  md:pt-[15px] text-black mb-1`}>Most Useful Review</p>
                                                <div className="w-full">
                                                    {/* per comment start*/}
                                                    {reviewProductWiseIsLoading ? (
                                                        <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                                                            <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {getReviewData?.data?.data?.slice(0, 2)?.map((review, index) => (
                                                                <PerReview key={index} review={review} />
                                                            ))}
                                                        </>
                                                    )}
                                                    {/* per review end */}
                                                </div>
                                                <Link to={`/all-review/${id}?product_name=${singleProduct?.data?.product?.name}&&reviews_avg_star=${singleProduct?.data?.product?.reviews_avg_star}&&eligible=${singleProduct?.data?.product?.review_eligible}`}>
                                                    <div className="flex justify-center items-center gap-1 mt-4 mb-1 hover:cursor-pointer">
                                                        <p className="font-semibold text-sm">Read more reviews</p>
                                                        <FaChevronDown />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* rating end*/}
                                </div>
                            </div>
                            {/* <div className="md:w-3/12 lg:w-2/12">
                    <CenterAlignCard />
                </div> */}
                        </div>
                    </div>
                    {/* comment modal start */}
                    <ReviewModal />
                    {/* comment modal end*/}
                    {/* ScrollRestoration start */}
                    {location?.search ? (
                        ""
                    ) : (
                        <div>
                            <ScrollRestoration />
                        </div>
                    )}
                    {/* ScrollRestoration end */}
                </>
            )}
        </>
    );
};

export default ProductDetails;
