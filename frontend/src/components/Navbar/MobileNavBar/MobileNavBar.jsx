import {Drawer, Spin} from "antd";
import {useContext, useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {AiOutlineHeart} from "react-icons/ai";
import {BiSearchAlt2} from "react-icons/bi";
import {BsPerson} from "react-icons/bs";
import {FaArrowLeftLong} from "react-icons/fa6";
import {HiOutlineMenuAlt1} from "react-icons/hi";
import {IoClose} from "react-icons/io5";
import {MdOpenInNew, MdOutlineShoppingBag} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import logo from "../../../assets/logo/logo.png";
import useAuthUser from "../../../hooks/useAuthUser";
import {LogicProviderContext} from "../../../providers/LogicProvider";
import {useCategoryListQuery} from "../../../redux/features/categoryList/categoryListApi";
import {useOffersQuery} from "../../../redux/features/offers/offersApi";
import {useGetWishListQuery} from "../../../redux/features/wishList/wishListApi";
import {filterAndSortCategories} from "../../../utilities/filterAndSortCategories";
import MultiLayerMenu from "../../MultiLayerMenu/MultiLayerMenu";
import Button from "../../ui/Button";
import "./MobileNavBar.scss";
import CountUp from "react-countup";
import useCartData from "../../../hooks/useCartData";
import {cartTotalDiscountPrice, cartTotalPrice} from "../../../utilities/cartTotalPriceAndDiscount.js";
import {LoadingOutlined} from "@ant-design/icons";
import {Bars} from "react-loader-spinner";
import ImageURL from "../../ImageURL/ImageURL";
import {PiShoppingBagOpenFill} from "react-icons/pi";

const MobileNavBar = () => {
    const navigate = useNavigate();
    const {
        open,
        setOpen,
        wishListDrawerOpen,
        setWishListDrawerOpen,
        mobileTrendingRef,
        mobileShowTrendingSearch,
        setMobileShowTrendingSearch,
        mobileNavbarRelatedSearchRef,
        showSearchNameList,
        setShowSearchNameList,
    } = useContext(LogicProviderContext);

    const [menuOpen, setMenuOpen] = useState(false);

    const {register, handleSubmit, setValue, watch} = useForm();
    const searchInput = watch("search");

    const {data: wishListItems} = useGetWishListQuery();
    const {data: offerButtons} = useOffersQuery();
    const {data: categoryList} = useCategoryListQuery();
    const {cartData} = useCartData();
    const {userData} = useAuthUser();

    const filteredAndSortedCategories = filterAndSortCategories(categoryList?.data);

    const [trendingPagination, setTrendingPagination] = useState(5);
    const [trendingList, setTrendingList] = useState([]);

    const [searchNameList, setSearchNameList] = useState([]);
    const [categoryListArr, setCategoryListArr] = useState([]);
    const [brandListArr, setBrandListArr] = useState([]);

    // Loading spinner and request tracking
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const cancelTokenSource = useRef(null);
    const latestRequestId = useRef(0);

    const onClose = () => setMenuOpen(false);

    const cartDataArray = cartData?.data?.cartData;
    const subTotalPrice = cartTotalPrice(cartDataArray);
    const discountPrice = cartTotalDiscountPrice(cartDataArray);
    const totalPriceAfterDiscount = subTotalPrice - discountPrice;

    const [shakeCartFloatingButton, setShakeCartFloatingButton] = useState(false);
    useEffect(() => {
        if (cartData?.data?.cartData?.length > 0) {
            setShakeCartFloatingButton(true);
            setTimeout(() => setShakeCartFloatingButton(false), 5000);
        }
    }, [cartData]);

    // Trending search logic
    useEffect(() => {
        if (searchInput?.length > 0) {
            setShowSearchNameList(true);
            setMobileShowTrendingSearch(false);
            setTrendingPagination(1);
        } else {
            setTrendingPagination(5);
            setShowSearchNameList(false);
        }
    }, [searchInput, setShowSearchNameList, setMobileShowTrendingSearch]);

    useEffect(() => {
        const fetchTrendingSearches = async () => {
            if (mobileShowTrendingSearch) {
                try {
                    const response = await axios.post("/trending-search", {
                        pagination: trendingPagination,
                    });
                    setTrendingList(response?.data?.data?.data);
                } catch (error) {
                    console.error("Error fetching trending searches:", error.message);
                }
            }
        };
        fetchTrendingSearches();
    }, [mobileShowTrendingSearch, trendingPagination]);

    // Search results with cancel + loading spinner logic
    useEffect(() => {
        if (!searchInput) {
            setShowSearchNameList(false);
            setIsLoadingSearch(false);
            return;
        }

        // Cancel previous request if exists
        if (cancelTokenSource.current) {
            cancelTokenSource.current.cancel("Cancelled due to new request.");
        }
        cancelTokenSource.current = axios.CancelToken.source();

        // Increment request ID for latest request tracking
        const currentRequestId = ++latestRequestId.current;

        // Always show spinner as soon as a request starts
        setIsLoadingSearch(true);

        const fetchSearchResults = async () => {
            try {
                const response = await axios.post(
                    "/products-name",
                    {
                        pagination: 5,
                        search: searchInput,
                    },
                    {
                        cancelToken: cancelTokenSource.current.token,
                    }
                );

                // Only update results if this is the latest request
                if (currentRequestId === latestRequestId.current) {
                    setSearchNameList(response?.data?.data?.products?.data || []);
                    setCategoryListArr(response?.data?.data?.categories?.data || []);
                    setBrandListArr(response?.data?.data?.brands?.data || []);
                    setIsLoadingSearch(false); // hide spinner only after last request finishes
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    // Cancelled request - keep spinner ON because next request probably started
                    console.log("Previous request cancelled:", error.message);
                } else {
                    console.error("Error fetching search results:", error.message);
                    // If this is the last request, hide spinner even on error
                    if (currentRequestId === latestRequestId.current) {
                        setIsLoadingSearch(false);
                    }
                }
            }
        };

        fetchSearchResults();

        return () => {
            if (cancelTokenSource.current) {
                cancelTokenSource.current.cancel();
            }
        };
    }, [searchInput, setShowSearchNameList]);

    const handleFocus = () => {
        setMobileShowTrendingSearch(true);
    };

    const handleCloseSearch = () => {
        setValue("search", "");
    };

    // Extract last part of URL
    const url = window.location.pathname.split("/").pop();

    const onSubmit = (data) => {
        navigate(`/product-filter?search-value=${data?.search}`);
    };

    return (
        <div className="mobile-navbar pt-2 pb-3 px-2">
            <div className="first-row">
                <div onClick={() => setMenuOpen(true)}>
                    <HiOutlineMenuAlt1 size={20}/>
                </div>
                <Drawer
                    placement="left"
                    width="90%"
                    closable={false}
                    onClose={onClose}
                    open={menuOpen}
                    closeIcon={<FaArrowLeftLong style={{fontSize: "24px", color: "black"}}/>}
                >
                    <div>
                        {/* drawer header */}
                        <div className="flex items-center justify-between border-b-[1px] px-2 py-3">
                            <div className="h-5 w-28">
                                <img src={logo} className="max-h-full w-full object-cover" alt="Logo"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setWishListDrawerOpen(true);
                                    }}
                                    variant="ghost"
                                    className="relative"
                                >
                                    <AiOutlineHeart className="w-6 h-6 text-[#000000]"/>
                                    {wishListItems?.data?.length > 0 && (
                                        <p className="absolute -right-2 -top-[8px] text-[10px] rounded-full bg-primary-color h-[18px] w-[18px] text-white flex items-center justify-center">
                                            {wishListItems?.data?.length}
                                        </p>
                                    )}
                                </Button>
                                <div onClick={onClose}>
                                    <IoClose size={25}/>
                                </div>
                            </div>
                        </div>

                        {/* drawer body */}
                        {userData?.status === true ? (
                            <div className="mx-auto my-2">
                                <Link to={"/my-account/my-profile"}>
                                    <div onClick={onClose} className="mx-auto rounded-full border border-black p-1 w-min h-min">
                                        <BsPerson className="font-semibold text-black" size={18}/>
                                    </div>
                                    <p className="text-center text-black text-xs">Profile</p>
                                </Link>
                            </div>
                        ) : (
                            <div className="mx-auto my-2">
                                <div className="mx-auto rounded-full border border-black p-1 w-min h-min">
                                    <Link to={"/login-with-email"}>
                                        <BsPerson className="font-semibold text-black" size={18}/>
                                    </Link>
                                </div>
                                <p className="text-center text-black text-xs">Login</p>
                            </div>
                        )}

                        <div className="flex flex-col justify-start items-start px-2 py-3">
                            <div className="mb-3 flex flex-col justify-start items-start gap-1">
                                {offerButtons?.status === true &&
                                    Array.isArray(offerButtons?.data) &&
                                    offerButtons?.data.map((item, i) => {
                                        const offer = typeof item?.offer === "string" ? JSON.parse(item.offer) : item?.offer;
                                        return (
                                            <Link key={i} to={`/campaign/${offer.id}`}>
                                                <button
                                                    className="text-base font-semibold"
                                                    onClick={onClose}
                                                    style={{color: offer.color}}
                                                >
                                                    {offer.name}
                                                </button>
                                            </Link>
                                        );
                                    })}
                            </div>

                            <div onClick={onClose} className="border-t-[1px] w-full py-3 text-base font-semibold">
                                <Link to={"/brand-page-for-mobile"}>
                                    <p>Brands</p>
                                </Link>
                            </div>
                            <div className="border-t-[1px] w-full py-3 text-base font-semibold">
                                Category
                                <MultiLayerMenu menuData={filteredAndSortedCategories} onClose={onClose}/>
                            </div>
                            <div onClick={onClose} className="border-t-[1px] w-full py-3 text-base font-semibold">
                                <Link to={"/terms-and-condition"}>
                                    <span>Terms & Conditions</span>
                                </Link>
                            </div>
                            <div onClick={onClose} className="border-t-[1px] w-full py-3 text-base font-semibold">
                                <Link to={"/my-account/return-and-cancel"}>
                                    <span>Return & Refund Policy</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Drawer>

                <div className="h-8 w-44">
                    <Link to={"/"}>
                        <img src={logo} className="max-h-full w-full object-cover" alt="Logo"/>
                    </Link>
                </div>

                <div className="flex items-center gap-2 justify-center">
                    {userData?.status === true ? (
                        <Link to={"/my-account/my-profile"} className="p-1 border rounded-full border-black">
                            <BsPerson size={14} className="text-black"/>
                        </Link>
                    ) : (
                        <Link to={"/login-with-email"}>
                            <BsPerson size={20}/>
                        </Link>
                    )}
                    <div className="relative" onClick={() => setOpen(true)}>
                        <MdOutlineShoppingBag size={20}/>
                        {cartData?.data?.cartData?.length > 0 && (
                            <p className="absolute -right-[6px] text-[10px] -top-[8px] rounded-full bg-primary-color h-[18px] w-[18px] text-white flex items-center justify-center">
                                {cartData?.data?.cartData?.length}
                            </p>
                        )}
                    </div>
                </div>

                <div
                    onClick={() => setOpen(true)}
                    className={`${
                        shakeCartFloatingButton ? "add-to-bag-cart-shake" : ""
                    } absolute top-[200%] right-0 w-[60px] sm:w-[70px] md:w-[80px] lg:w-[90px] rounded-ss-lg rounded-es-lg overflow-hidden hover:cursor-pointer`}
                >
                    <div className="bg-[#192038] py-2 px-3 sm:py-3 sm:px-4 flex flex-col items-center">
                        <PiShoppingBagOpenFill size={28} className="text-white sm:size-35"/>
                        <p className="text-white font-Inter text-xs sm:text-sm font-medium leading-normal tracking-[-0.42px] whitespace-nowrap">
                            {cartData?.data?.cartData?.length} Items
                        </p>
                    </div>
                    <div className="bg-[#0094CF] py-2 px-3 sm:py-3 sm:px-4 flex flex-col items-center">
                        <p className="text-white font-Inter text-xs sm:text-sm font-medium leading-normal tracking-[-0.42px] whitespace-nowrap">
                            ৳
                            {totalPriceAfterDiscount > 0 ? (
                                <span className="ms-1">
                  <CountUp
                      enableScrollSpy={true}
                      duration={3}
                      start={100}
                      end={totalPriceAfterDiscount ? totalPriceAfterDiscount.toFixed(0) : 0}
                  />
                </span>
                            ) : (
                                <span className="ms-1">0</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {url !== "login-with-email" && (
                <div className="second-row">
                    <div ref={mobileTrendingRef} className="search-form w-full">
                        <div ref={mobileNavbarRelatedSearchRef}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    type="text"
                                    {...register("search")}
                                    autoComplete="off"
                                    placeholder="Search for products..."
                                    className="input text-black w-full"
                                    onFocus={handleFocus}
                                />
                                {isLoadingSearch && (
                                    <span className="absolute top-1 right-10">
                                    <Spin indicator={<LoadingOutlined style={{fontSize: 15}}/>}/>
                                  </span>
                                )}
                                <button className="submite-btn" type="submit">
                                    <BiSearchAlt2 className="text-[#00000099]" size={20}/>
                                </button>
                                <button className="close-search" type="button" onClick={handleCloseSearch}>
                                    <IoClose size={20}/>
                                </button>
                            </form>

                            {trendingPagination !== 1 && mobileShowTrendingSearch && (
                                <div
                                    style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}}
                                    className="absolute top-9 bg-white w-full shadow-md"
                                >
                                    <div className="w-full flex justify-between items-center">
                                        <p className="px-2 pt-2 font-bold">Trending Searches</p>
                                        <IoClose
                                            size={28}
                                            className="hover:scale-110 pt-2 pe-2 text-black cursor-pointer"
                                            onClick={() => setMobileShowTrendingSearch(false)}
                                        />
                                    </div>
                                    {trendingList?.length < 1 ? (
                                        <div className="flex justify-center items-center h-20">
                                            <Bars
                                                height="40"
                                                width="80"
                                                color="#5DC9F4"
                                                ariaLabel="bars-loading"
                                                visible={true}
                                            />
                                        </div>
                                    ) : (
                                        trendingList.map((item, i) => (
                                            <p
                                                key={i}
                                                className="ps-4 py-1 hover:cursor-pointer"
                                                onClick={() => setValue("search", item?.keyword)}
                                            >
                                                {item?.keyword}
                                            </p>
                                        ))
                                    )}
                                </div>
                            )}

                            {showSearchNameList && (
                                <div
                                    style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}}
                                    className="max-h-[calc(100vh-40vh)] absolute overflow-hidden overflow-y-auto slim-scroll top-9 bg-white w-full shadow-md"
                                >
                                    {searchNameList?.length > 0 && (
                                        <>
                                            <p className="px-2 py-2 font-bold">Products</p>
                                            {searchNameList.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center">
                                                    <Link to={`/product-filter?search-value=${item?.name}`}>
                                                        <div className="flex items-start gap-2 ms-2 mb-1 hover:text-primary-color">
                                                            <ImageURL image={item?.image} className={"h-10 w-10 rounded overflow-hidden border"}/>
                                                            <p
                                                                onClick={() => {
                                                                    setShowSearchNameList(false);
                                                                    setMobileShowTrendingSearch(false);
                                                                    setValue("search", item?.name);
                                                                    handleCloseSearch();
                                                                }}
                                                                className="ps-1 py-1 hover:cursor-pointer"
                                                            >
                                                                {item?.name}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                    <MdOpenInNew size={23} className="pt-2 pe-2 cursor-pointer" onClick={() => setValue("search", item?.name)}/>
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {categoryListArr?.length > 0 && (
                                        <>
                                            <p className="px-2 pt-2 font-bold">Category</p>
                                            {categoryListArr.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center">
                                                    <Link
                                                        to={
                                                            item.self_position === "category"
                                                                ? `/product-filter?category=${item?.slug}`
                                                                : item.self_position === "sub-category"
                                                                    ? `/product-filter/sub-category/${item?.slug}`
                                                                    : `/product-filter/child-category/${item?.slug}`
                                                        }
                                                    >
                                                        <p
                                                            onClick={() => {
                                                                setShowSearchNameList(false);
                                                                setMobileShowTrendingSearch(false);
                                                                setValue("search", item?.name);
                                                            }}
                                                            className="ps-4 py-1 hover:cursor-pointer hover:text-primary-color"
                                                        >
                                                            {item?.name}
                                                        </p>
                                                    </Link>
                                                    <MdOpenInNew size={23} className="pt-2 pe-2 cursor-pointer" onClick={() => setValue("search", item?.name)}/>
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {brandListArr?.length > 0 && (
                                        <>
                                            <p className="px-2 pt-2 font-bold">Brand</p>
                                            {brandListArr.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center">
                                                    <Link to={`/product-filter?brand=${item?.slug}`}>
                                                        <p
                                                            onClick={() => {
                                                                setShowSearchNameList(false);
                                                                setMobileShowTrendingSearch(false);
                                                                setValue("search", item?.name);
                                                            }}
                                                            className="ps-4 py-1 hover:cursor-pointer hover:text-primary-color"
                                                        >
                                                            {item?.name}
                                                        </p>
                                                    </Link>
                                                    <MdOpenInNew size={23} className="pt-2 pe-2 cursor-pointer" onClick={() => setValue("search", item?.name)}/>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileNavBar;
