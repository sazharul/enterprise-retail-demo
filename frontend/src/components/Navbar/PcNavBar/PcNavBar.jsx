/* eslint-disable react/prop-types */
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { MdOpenInNew, MdOutlineShoppingBag } from "react-icons/md";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import useAuthUser from "../../../hooks/useAuthUser";
import useCartData from "../../../hooks/useCartData";
import MyAccountSideMenu from "../../../pages/MyAccount/MyAccountSideMenu/MyAccountSideMenu";
import { LogicProviderContext } from "../../../providers/LogicProvider";
import { useCategoryListQuery } from "../../../redux/features/categoryList/categoryListApi";
import { useOffersQuery } from "../../../redux/features/offers/offersApi";
import { useSearchNameListMutation, useTrendingSearchMutation } from "../../../redux/features/productFilter/productFilterApi";
import { useGetWishListQuery } from "../../../redux/features/wishList/wishListApi";
import { cartTotalDiscountPrice, cartTotalPrice } from "../../../utilities/cartTotalPriceAndDiscount";
import { filterAndSortCategories } from "../../../utilities/filterAndSortCategories";
import DropDownWithMultilevelSideMenu from "../../DropDownWithMultilevelSideMenu/DropDownWithMultilevelSideMenu";
import DropDownWithSearchAndList from "../../DropDownWithSearchAndList/DropDownWithSearchAndList";
import CategoryTitle from "./CategoryTitle/CategoryTitle";
import CountUp from "react-countup";
import "./PcNavBar.scss";
import { IoClose } from "react-icons/io5";
import DropDownListAndSelect from "../../DropDownListAndSelect/DropDownListAndSelect";
import { Bars } from "react-loader-spinner";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SlimNavbarForTopArea from "../SlimNavbarForTopArea/SlimNavbarForTopArea";
import ImageURL from "../../ImageURL/ImageURL";
import axios from "axios";

const PcNavBar = ({ menuData }) => {
    const URL = useLocation();
    const navigate = useNavigate();
    const { open, setOpen, setWishListDrawerOpen, trendingRef, showTrendingSearch, setShowTrendingSearch, navbarRelatedSearchRef, showSearchNameList, setShowSearchNameList } = useContext(LogicProviderContext);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState("");
    const [selectedCategoryItems, setSelectedCategoryItems] = useState({});
    const [accountDropDown, setAccountDropDown] = useState(false);
    const { data: offerButtons } = useOffersQuery();
    const { data: categoryList, error, isLoading } = useCategoryListQuery();
    const { userData } = useAuthUser();
    const { cartData, cartIsLoading } = useCartData();
    const cartDataArray = cartData?.data?.cartData;
    const subTotalPrice = cartTotalPrice(cartDataArray);
    const discountPrice = cartTotalDiscountPrice(cartDataArray);
    const { register, handleSubmit, setValue, watch, reset } = useForm();
    const searchInput = watch("search");
    const [trendingSearchMutation, { data: trendingSearchData, isLoading: trendingSearchIsLoading }] = useTrendingSearchMutation();
    const [searchNameListMutation, { data: searchNameListData, isLoading: searchNameListIsLoading }] = useSearchNameListMutation();
    const totalPriceAfterDiscount = subTotalPrice - discountPrice;

    const { data: wishListItems } = useGetWishListQuery();

    const [trendingPagination, setTrendingPagination] = useState(5);

    const [trendingList, setTrendingList] = useState([]);
    const [searchNameList, setSearchNameList] = useState([]);
    const [categoryListArr, setCategoryListArr] = useState([]);
    const [brandListArr, setBrandListArr] = useState([]);

    useEffect(() => {
        if (searchInput?.length > 0) {
            setShowSearchNameList(true);
            setShowTrendingSearch(false);
            setTrendingPagination(1);
        } else {
            setTrendingPagination(5);
            setShowSearchNameList(false);
        }
    }, [searchInput]);

    // useEffect(() => {
    //       setShowSearchNameList(false)
    //       setShowTrendingSearch(false)
    // }, [URL?.pathname]);

    useEffect(() => {
        const fetchData = async () => {
            if (showTrendingSearch) {
                const trendingSearchInput = {
                    pagination: trendingPagination,
                    // keyword: searchInput,
                };
                try {
                    const response = await trendingSearchMutation(trendingSearchInput);
                    setTrendingList(response?.data?.data?.data);
                    // Do something with the response if needed
                } catch (error) {
                    console.error("Error fetching data:", error.message);
                }
            }
        };

        fetchData(); // Call the async function immediately
    }, [showTrendingSearch, trendingSearchMutation]);

    const [so_showSearchNameList, setSo_showSearchNameList] = useState(true);
    const [so_isLoading, setSo_isLoading] = useState(false);
    // To track the cancel token
    const so_cancelTokenSource = useRef(null);

    useEffect(() => {
        const so_fetchData = async () => {
            if (so_showSearchNameList) {
                // Cancel the previous request if still pending
                if (so_cancelTokenSource.current) {
                    so_cancelTokenSource.current.cancel("Request canceled due to new request");
                }

                // Create a new cancel token for the current request
                so_cancelTokenSource.current = axios.CancelToken.source();

                const so_listOfSearchInput = {
                    pagination: 5,
                    search: searchInput,
                };

                setSo_isLoading(true); // Set loading state

                try {
                    const response = await axios.post("/products-name", so_listOfSearchInput, {
                        cancelToken: so_cancelTokenSource.current.token, // Attach cancel token to request
                    });

                    // Handle the response, keeping the original state update functions
                    setSearchNameList(response?.data?.data?.products?.data);
                    setCategoryListArr(response?.data?.data?.categories?.data);
                    setBrandListArr(response?.data?.data?.brands?.data);
                } catch (so_error) {
                    if (axios.isCancel(so_error)) {
                        console.log("Request canceled:", so_error.message); // Log cancellation
                    } else {
                        console.error("Error fetching data:", so_error.message);
                    }
                } finally {
                    setSo_isLoading(false); // Reset loading state
                }
            }
        };

        so_fetchData(); // Call the async function immediately
    }, [showSearchNameList, searchInput, searchNameListMutation]);

    const onSubmit = (data) => {
        setShowSearchNameList(false);
        setShowTrendingSearch(false);
        setValue("search", "");
        navigate(`/product-filter?search-value=${data?.search}`);
    };

    useEffect(() => {
        if (offerButtons?.status === true) {
            const hoveredCategoryListArr = categoryList?.data?.find((category) => category?.name === hoveredCategory);
            const hoveredBrandListArr = categoryList?.data?.find((category) => category?.name === hoveredCategory);
            // Your logic using hoveredCategoryList here
            setSelectedCategoryItems(hoveredCategoryListArr);
        }
    }, [hoveredCategory]);

    const filteredAndSortedCategories = filterAndSortCategories(categoryList?.data);
    const [shakeCartFloatingButton, setShakeCartFloatingButton] = useState(false);
    useEffect(() => {
        if (cartData?.data?.cartData?.length > 0) {
            setShakeCartFloatingButton(true);
            setTimeout(() => {
                setShakeCartFloatingButton(false);
            }, 5000);
        }
    }, [cartData]);

    const handleFocus = () => {
        setShowTrendingSearch(true);
    };

    const handleBlur = () => {
        setShowTrendingSearch(false);
    };

    // const trendingRef = useRef(null)
    // const handleTrendingClose = (e)=> {
    //   if(!trendingRef.current?.contains(e.target)) {
    //     setShowTrendingSearch(false);
    //   }
    // }

    useEffect(() => {
        // Reset the search and trending states on URL change
        setShowSearchNameList(false);
        setShowTrendingSearch(false);
    }, [URL]); // Dependency on location.pathname to trigger on URL change

    const handleCloseSearch = () => {
        setValue("search", "");
    };

    return (
        <>
            {/* <SlimNavbarForTopArea/> */}
            <div className="pc-navbar relative">
                {/* navbar-first-row start */}
                <div className="navbar-first-row px-[10px]  container mx-auto">
                    <div className="logo gap-3 lg:gap-8">
                        <Link to={"/"}>
                            <div className="h-10 w-44">
                                <img src={logo} className="max-h-full w-full" alt="" />
                            </div>
                        </Link>
                        <DropDownWithSearchAndList title={"Brands"} />
                        <Link to={"/beauty-advice"}>
                            <h5 className="whitespace-nowrap">Beauty Advice</h5>
                        </Link>
                        {/* hover brand list start */}
                        {/* <div className="hover:cursor-pointer"  onMouseEnter={() => setIsBrandOpen(true)} onMouseLeave={() => setIsBrandOpen(false)}>
                        <h5 className="hover:cursor-pointer bg-red-500 py-10">Brands</h5>
                        <div  className={`border absolute z-10 right-20 top-20 ${isBrandOpen ? "block" : "hidden"} w-full container `}>asdas</div>
                    </div> */}
                        {/* hover brand list end*/}
                    </div>

                    <div className="right-side lg:w-8/12">
                        <div ref={trendingRef} className="search-form w-full">
                            <div ref={navbarRelatedSearchRef}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        // onFocus={()=>setShowTrendingSearch(true)}
                                        type="text"
                                        onFocus={handleFocus}
                                        // onBlur={handleBlur}
                                        {...register("search")}
                                        // autoComplete="false"
                                        autoComplete="off"
                                        placeholder="Search for products..."
                                        className="input text-black w-full"
                                    />
                                    {searchNameListIsLoading && (
                                        <span className="absolute top-1 right-3">
                                            <Spin indicator={<LoadingOutlined style={{ fontSize: 15 }} />}></Spin>
                                        </span>
                                    )}
                                    <button className=" submite-btn" type="submit">
                                        <BiSearchAlt2 className="text-[#00000099]" size={20} />
                                    </button>
                                    <button className="close-search" type="button" onClick={handleCloseSearch}>
                                        <IoClose size={20} />
                                    </button>
                                </form>
                                {trendingPagination !== 1 && (
                                    <>
                                        {showTrendingSearch && (
                                            <div style={{ boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)" }} className="absolute top-9 bg-white w-full shadow-md">
                                                <div className="w-full flex justify-between items-center">
                                                    <p className="px-2 pt-2 font-bold">Trending Searches</p>
                                                    <IoClose size={28} className="hover:scale-110 pt-2 pe-2 text-black cursor-pointer" onClick={() => setShowTrendingSearch(false)} />
                                                </div>
                                                <>
                                                    {trendingList?.length < 1 ? (
                                                        <div className="flex justify-center items-center h-20">
                                                            <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {trendingList.map((item, i) => (
                                                                <p key={i} className="ps-4 py-1 hover:cursor-pointer" onClick={() => setValue("search", item?.keyword)}>
                                                                    {item?.keyword}
                                                                </p>
                                                            ))}
                                                        </>
                                                    )}
                                                </>
                                            </div>
                                        )}
                                    </>
                                )}

                                {showSearchNameList && (
                                    <div style={{ boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)" }} className="absolute top-9 p bg-white w-full shadow-md">
                                        {searchNameList?.length > 0 && (
                                            <>
                                                <p className="px-2 py-2 font-bold">Products</p>
                                                {searchNameList?.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center">
                                                        <Link to={`/product-filter?search-value=${item?.name}`}>
                                                            <div className="flex items-start gap-2 ms-2 mb-1 hover:text-primary-color">
                                                                <ImageURL image={item?.image} className={"h-10 w-10 rounded overflow-hidden border"} />
                                                                <p
                                                                    onClick={() => {
                                                                        setShowSearchNameList(false);
                                                                        setShowTrendingSearch(false);
                                                                        setValue("search", item?.name);
                                                                    }}
                                                                    className="ps-1 py-1 hover:cursor-pointer"
                                                                >
                                                                    {item?.name}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                        <MdOpenInNew size={23} className="pt-2 pe-2 cursor-pointer" onClick={() => setValue("search", item?.name)} />
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {categoryListArr?.length > 0 && (
                                            <>
                                                <p className="px-2 pt-2 font-bold">Category</p>
                                                {categoryListArr?.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center">
                                                        <Link to={item.self_position === "category" ? `/product-filter?category=${item?.slug}` : item.self_position === "sub-category" ? `/product-filter/sub-category/${item?.slug}` : `/product-filter/child-category/${item?.slug}`}>
                                                            <p
                                                                onClick={() => {
                                                                    setShowSearchNameList(false);
                                                                    setShowTrendingSearch(false);
                                                                    setValue("search", item?.name);
                                                                }}
                                                                className="ps-4 py-1 hover:cursor-pointer hover:text-primary-color"
                                                            >
                                                                {item?.name}
                                                            </p>
                                                        </Link>
                                                        <MdOpenInNew size={23} className="pt-2 pe-2 cursor-pointer" onClick={() => setValue("search", item?.name)} />
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {brandListArr?.length > 0 && (
                                            <>
                                                <p className="px-2 pt-2 font-bold">Brand</p>
                                                {brandListArr?.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center">
                                                        <Link to={`/product-filter?brand=${item?.slug}`}>
                                                            <p
                                                                onClick={() => {
                                                                    setShowSearchNameList(false);
                                                                    setShowTrendingSearch(false);
                                                                    setValue("search", item?.name);
                                                                }}
                                                                className="ps-4 py-1 hover:cursor-pointer hover:text-primary-color"
                                                            >
                                                                {item?.name}
                                                            </p>
                                                        </Link>
                                                        <MdOpenInNew size={23} className="pt-2 pe-2 cursor-pointer" onClick={() => setValue("search", item?.name)} />
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="right-side-options ">
                            {userData?.status === true ? (
                                <div className="relative pb-2" onMouseEnter={() => setAccountDropDown(true)} onMouseLeave={() => setAccountDropDown(false)}>
                                    <Link to={"/my-account/my-profile"}>
                                        <button>
                                            <BsPerson className="w-6 h-6 text-[#000000]" />
                                            Account
                                        </button>
                                    </Link>
                                    <div className={`absolute -left-10 top-11 bg-white z-10 ${accountDropDown ? "block" : "hidden"} `} style={{ boxShadow: "0px 0px 6px 0px #E4EDF0" }}>
                                        <div className="relative">
                                            <div style={{ boxShadow: "0px 0px 6px 0px #E4EDF0" }} className={` ms-10 bg-white h-10 w-10  rotate-45`}></div>
                                            <div className="absolute bg-white top-0 w-56 rounded-ss-md rounded-se-md " style={{ boxShadow: "0px 0px 6px 0px #E4EDF0" }}>
                                                <MyAccountSideMenu />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className=" pb-2">
                                    <Link to={"/login-with-email"}>
                                        <button>
                                            <BsPerson className="w-6 h-6 text-[#000000]" />
                                            Login
                                        </button>
                                    </Link>
                                </div>
                            )}

                            <button className="pb-2 relative" onClick={() => setWishListDrawerOpen(true)}>
                                <AiOutlineHeart className="w-6 h-6 text-[#000000]" />
                                Wishlist
                                {wishListItems?.data?.length > 0 && <p className="absolute -top- -right-1 -top-[6px] rounded-full bg-primary-color h-[18px] w-[18px] text-white flex items-center justify-center">{wishListItems?.data?.length}</p>}
                            </button>

                            <button onClick={() => setOpen(true)} className="pb-2 relative text-[#000000D9] text-[10px] font-medium leading-normal tracking-tighter  text-center">
                                <MdOutlineShoppingBag className="w-6 h-6 container text-[#000000D9]" />
                                My Bag
                                {cartData?.data?.cartData?.length > 0 && <p className="absolute -top- -right-1 -top-[6px] rounded-full bg-primary-color h-[18px] w-[18px] text-white flex items-center justify-center">{cartData?.data?.cartData?.length}</p>}
                            </button>

                            {/* cart floating button start */}
                            <div onClick={() => setOpen(true)} className={`${shakeCartFloatingButton ? "add-to-bag-cart-shake" : ""} absolute top-[200%] w-[80px] right-0 rounded-ss-lg rounded-es-lg overflow-hidden hover:cursor-pointer`}>
                                <div className="bg-[#192038]  py-3 px-4 flex flex-col items-center">
                                    <PiShoppingBagOpenFill size={35} className="text-white" />
                                    <p className="text-white font-Inter text-sm font-medium leading-normal tracking-[-0.42px] whitespace-nowrap">{cartData?.data?.cartData?.length} Items</p>
                                </div>
                                <div className="bg-[#0094CF]  py-3 px-4 flex flex-col items-center">
                                    {/* <p className="text-white font-Inter text-sm font-medium leading-normal tracking-[-0.42px]">৳ {subTotalPrice.toFixed(0)}</p> */}
                                    <p className="text-white font-Inter text-sm font-medium leading-normal tracking-[-0.42px] whitespace-nowrap">
                                        ৳
                                        {totalPriceAfterDiscount > 0 ? (
                                            <span className="ms-1">
                                                <CountUp enableScrollSpy={true} duration={3} start={100} end={totalPriceAfterDiscount ? totalPriceAfterDiscount.toFixed(0) : 0} />{" "}
                                            </span>
                                        ) : (
                                            <span className="ms-1">0</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                            {/* floating button end*/}
                            {/* <div className="bg-red-500 ">
                            <FloatButton
                                shape="square"
                                style={{
                                    right: 0,
                                    top: 20
                                    
                                }}
                                tooltip={<div>Documents</div>}
                            />
                        </div> */}
                        </div>
                    </div>
                </div>
                {/* navbar-first-row end */}
                {/* border */}
                <div className="border-t-[0.2px] border-b-[0.2px] ">
                    {/* navbar-second-row start */}
                    <div className="navbar-second-row  container mx-auto">
                        {/* left side start */}
                        <div
                            className="left-side relative "
                            onMouseEnter={() => setIsBrandOpen(true)}
                            onMouseLeave={() => {
                                setIsBrandOpen(false);
                                setHoveredCategory("");
                            }}
                        >
                            {/* <div className={`absolute  w-full flex justify-center ${isBrandOpen ? "block" : "hidden"}`}>
                            <img src={NavbarHoverIcon} alt="" />
                        </div> */}

                            <div className=" flex items-center">
                                {categoryList?.status === true &&
                                    filteredAndSortedCategories?.length > 0 &&
                                    filteredAndSortedCategories?.map((category, i) => (
                                        <Fragment key={i}>
                                            <Link to={`/product-filter?category=${category?.slug}`}>
                                                <CategoryTitle title={category?.name} hoveredCategory={hoveredCategory} setHoveredCategory={setHoveredCategory} />
                                            </Link>
                                            <DropDownWithMultilevelSideMenu categories={selectedCategoryItems} isBrandOpen={isBrandOpen} setIsBrandOpen={setIsBrandOpen} />
                                        </Fragment>
                                    ))}
                                {/* <CategoryTitle title={"Skin"} />
                            <CategoryTitle title={"Hair"} />
                            <CategoryTitle title={"Personal Care"} />
                            <CategoryTitle title={"Mom & Baby"} />
                            <CategoryTitle title={"Natural"} /> */}
                            </div>
                        </div>
                        {/* left side end */}
                        {/* right side start */}
                        <div className="right-side">
                            {offerButtons?.status == true &&
                                Array.isArray(offerButtons?.data) &&
                                offerButtons?.data?.map((item, i) => (
                                    <Link key={i} to={`/campaign/${(typeof item?.offer === "string" ? JSON.parse(item.offer) : item?.offer).id}`}>
                                        <button
                                            className={`my-2`}
                                            style={{
                                                backgroundColor: (typeof item?.offer === "string" ? JSON.parse(item.offer) : item?.offer).color,
                                            }}
                                        >
                                            {(typeof item?.offer === "string" ? JSON.parse(item.offer) : item?.offer).name}
                                        </button>
                                    </Link>
                                ))}

                            {/* <Link to={"/campaign"}>
                            <button className="bg-[#3734E2]">Puja Sale</button>
                        </Link>
                        <Link to={"/campaign"}>
                            <button className="bg-[#D90068]">Buy 1 Get 1</button>
                        </Link>
                        <Link to={"/campaign"}>
                            <button className="bg-[#9747FF]">Clearance Sale</button>
                        </Link> */}
                        </div>
                        {/* right side end */}
                    </div>
                    {/* navbar-second-row end */}
                </div>
            </div>
        </>
    );
};

export default PcNavBar;
