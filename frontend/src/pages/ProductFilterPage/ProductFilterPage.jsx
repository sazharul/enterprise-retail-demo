import {Drawer, Pagination, Skeleton, Space} from "antd";
import React, {useContext, useEffect, useState, useRef} from "react";
import {HiOutlineMenuAlt2} from "react-icons/hi";
import {IoClose} from "react-icons/io5";
import {Bars} from "react-loader-spinner";
import {ScrollRestoration, useLocation, useNavigate, useParams} from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import SlimSlider from "../../components/SlimSlider/SlimSlider";
import CenterAlignCard from "../../components/allCards/CenterAlignCard/CenterAlignCard";
import {useProductListWithCategoryMutation, useProductListWithFilterMutation} from "../../redux/features/productFilter/productFilterApi";
import LeftSideFilterArea from "./LeftSideFilterArea/LeftSideFilterArea";
import {LogicProviderContext} from "../../providers/LogicProvider";
import CardSkeleton from "../../components/allCards/CardSkeleton/CardSkeleton";
import CardSkeletonLoading from "./CardSkeletonLoading/CardSkeletonLoading";
import {useCategoryListQuery} from "../../redux/features/categoryList/categoryListApi";
// useBrandListQuery
import {useBrandListQuery} from "../../redux/features/productFilter/productFilterApi";
import ImageURL from "../../components/ImageURL/ImageURL.jsx";
import CenterAlignCardFilter from "../../components/allCards/CenterAlignCard/CenterAlignCardFilter.jsx";
import axios from "axios";
import {FaFilter} from "react-icons/fa";
import InfiniteScroll from 'react-infinite-scroll-component';


const ProductFilterPage = ({link, topArea = true}) => {

    const location = useLocation();
    const [productCount, setProductCount] = useState(0);
    const [productData, setProductData] = useState([]);
    const [starRatingList, setStarRatingList] = useState([]);

    const [loading, setLoading] = useState(false);
    const hasMoreRef = useRef(true);
    const currentPage = useRef(1);
    const [page, setPage] = useState(1);

    const {data: categoryList, error, isLoading: isCategoryListLoading} = useCategoryListQuery();
    const {data: brandList, error: brandError, isLoading: isBrandListLoading} = useBrandListQuery();
    const [bannerType, setBannerType] = useState("");
    const [topBannerForBrand, setTopBannerForBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const {categoryId, subCategoryId, childCategoryId, brandId} = useParams();
    const [topBannerForCategory, setTopBannerForCategory] = useState([]);


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

    useQueryParamState("Category", setCategory);


    function findById(arr, id) {

        for (let obj of arr) {
            if (obj?.id == id) {
                return obj;
            }
            if (obj?.subcategory?.length) {
                const result = findById(obj?.subcategory, id);

                if (result) {
                    return result;
                }
            }
        }
        return null;
    }

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    // Function to fetch products based on the URL search parameters
    const fetchProducts = (pageNumber) => {
        const searchParams = new URLSearchParams(window.location.search);

        const keys = [
            'benefit', 'brand', 'category', 'subcategory', 'child_category',
            'color', 'concern', 'country', 'coverage', 'finish', 'formulation',
            'gender', 'ingredient', 'max_min', 'preference', 'size', 'skin_type', 'sort_by'
        ];

        const updatedPostData = {};

        keys.forEach(key => {
            updatedPostData[key] = JSON.stringify(searchParams.getAll(key));
        });

        const priceRange = searchParams.getAll('price'); // Example: ['1', '2', '3']
        let max_min = null;
        if (priceRange && priceRange.length > 0) {
            const priceList = [
                {id: 1, min: 0, max: 499},
                {id: 2, min: 500, max: 999},
                {id: 3, min: 1000, max: 1499},
                {id: 4, min: 1500, max: 1999},
                {id: 5, min: 2000, max: 2001},
            ];

            max_min = priceRange
                .map(id => priceList.find(price => price.id === parseInt(id))) // Find the price range
                .filter(Boolean)  // Remove any undefined values
                .reduce(
                    (acc, range) => [
                        Math.min(acc[0], range.min), // Calculate min
                        Math.max(acc[1], range.max), // Calculate max
                    ],
                    [2001, -2001] // Start with extreme values
                );
        } else {
            max_min = null;
        }


        const postFormteData = {
            ...updatedPostData,
            pack_size: JSON.stringify(searchParams.getAll('pack size')),
            subcategory: JSON.stringify(subCategoryId == undefined ? [] : [subCategoryId]),
            child_category: JSON.stringify(childCategoryId == undefined ? [] : [childCategoryId]),
            search: searchParams.get('search-value'),
            max_min: max_min ? JSON.stringify(max_min) : null,
            pageNumber: pageNumber,
            pagination: 12,
        }

        setLoading(true);

        axios.post(`${import.meta.env.VITE_NODE_API_URL || "http://localhost:4001/api/node"}/products`, postFormteData).then(function (response) {
            const newProducts = response.data.data.products.data;
            if (response.data.data.products.current_page === 1) {
                setProductData(newProducts);
            } else {
                // Check for duplicates by comparing existing products and new ones
                setProductData(prevData => {
                    const allProducts = [...prevData, ...newProducts];
                    const uniqueProducts = [];
                    const seenProductIds = new Set();

                    // Keep only unique products by ID
                    allProducts.forEach(product => {
                        if (!seenProductIds.has(product.id)) {
                            uniqueProducts.push(product);
                            seenProductIds.add(product.id);
                        }
                    });

                    return uniqueProducts;
                });
            }

            setProductCount(response.data.data.products.total);
            currentPage.current = response.data.data.products.current_page;

            if (response.data.data.products.next_page_url === null) {
                hasMoreRef.current = false;
            } else {
                hasMoreRef.current = true;
            }
            setLoading(false);
        }).catch(function (error) {
            console.log(error);
            setLoading(false);
        });
    };

    const [scrollThreshold, setScrollThreshold] = useState("600px");


    useEffect(() => {
        const updateThreshold = () => {
            if (window.innerWidth <= 768) {
                // Mobile
                setScrollThreshold("500px"); // or whatever fits your footer height on mobile
            } else {
                // Desktop
                setScrollThreshold("600px");
            }
        };

        updateThreshold();

        window.addEventListener("resize", updateThreshold);
        return () => window.removeEventListener("resize", updateThreshold);
    }, []);

    useEffect(() => {
        if (categoryList?.status) {
            const result = findById(categoryList?.data, category?.[0] ? category?.[0] : subCategoryId ? subCategoryId : childCategoryId);
            setTopBannerForCategory(result);
        }
    }, [categoryList, category?.[0], subCategoryId, childCategoryId]);


    // useEffect for initial loading
    useEffect(() => {
        fetchProducts(1); // Load the first page when the component mounts

        const searchParams = new URLSearchParams(location.search);
        const firstEntry = searchParams.entries().next().value;
        if (firstEntry) {
            const [firstKey, firstValue] = firstEntry;
            if (firstKey === 'category') {
                setBannerType('category');
            } else if (firstKey === 'brand') {
                console.log('brand', firstValue);
                setBannerType('brand');
                const result = brandList?.data?.find((item) => item?.id == firstValue);
                setTopBannerForBrand(result);
            }
        } else {
            setBannerType('category');
        }
    }, [location]);

    return (
        <div className="px-[10px] container mx-auto">
            {topArea && (
                <>
                    <Breadcrumbs className={"mt-2 mb-1 md:my-4"} first={"Home"} second={"Product Search"}/>
                    {/*<h3 className="text-black text-center font-inter text-base md:text-[20px] font-semibold leading-normal mb-1 md:mb-4">Buy Skincare Products Online</h3>*/}
                    <SlimSlider dots={true}/>
                </>
            )}
            {
                bannerType === 'category' && topBannerForCategory?.banner?.length > 0 && (
                    <div className=" md:mb-4 container mx-auto">
                        <SlimSlider dots={false} item={topBannerForCategory?.banner}/>
                    </div>
                )

            }

            {
                bannerType === 'brand' && brandList?.data?.length > 0 && (
                    <div className=" md:mb-4 container mx-auto">
                        <ImageURL className="w-full h-full object-fill" image={topBannerForBrand?.banner}/>
                    </div>
                )
            }

            {/* left side for mobile menu start */}
            <div className="block md:hidden">
                <Drawer
                    title="Product Filter"
                    placement={"bottom"}
                    // width={500}
                    height={"75%"}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    extra={
                        <Space>
                            <button className="mt-2" onClick={onClose}>
                                <IoClose size={22}/>
                            </button>
                        </Space>
                    }
                >
                    {/* left side menu start */}
                    <div className="md:w-[47%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%] p-2 rounded bg-[#F3F3F3]" style={{boxShadow: "0px 0px 6px 0px #E4EDF0"}}>
                        <LeftSideFilterArea starRatingList={starRatingList}/>
                    </div>
                    {/* left side menu end*/}
                </Drawer>
                <div className="z-10">
                    <MainButton title={<FaFilter/>} handleSubmit={showDrawer} className={"px-4 py-2 mt-3 mb-2 z-20"}/>
                </div>
                {/* <Button type="primary" onClick={showDrawer}>
          Open
        </Button> */}
            </div>
            {/* left side for mobile menu end */}
            {/* filter and products start */}
            <div className="flex gap-3 mt-2 md:mt-8">
                {/* left side menu start */}
                <div className="hidden md:block md:w-[47%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%] p-2 rounded bg-[#F3F3F3]" style={{boxShadow: "0px 0px 6px 0px #E4EDF0"}}>
                    <LeftSideFilterArea starRatingList={starRatingList}/>
                </div>
                {/* left side menu end*/}

                {/* right side products start*/}
                <div className="w-full">
                    <div className="rounded bg-white py-3 ps-5 w-full mb-3" style={{boxShadow: "0px 0px 6px 0px #E4EDF0"}}>
                        <p>{productCount} Products Found</p>
                    </div>

                    <InfiniteScroll
                        dataLength={productData.length} // This is important field to render the next data
                        next={() => fetchProducts(currentPage.current + 1)} // fetch next page
                        hasMore={hasMoreRef.current} // boolean to control load more
                        loader={
                            <div className="flex justify-center items-center space-x-3 p-6 bg-white rounded-lg shadow-lg">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                                <p className="text-lg font-semibold text-gray-700">Loading...</p>
                            </div>
                        }
                        endMessage={
                            <p className="mt-5" style={{textAlign: 'center', color: 'gray'}}>
                                <b>No more products to show</b>
                            </p>
                        }
                        scrollThreshold={scrollThreshold}
                    >
                        {productData.length > 0 ? (
                            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-5 min-h-[calc(100vh-90vh)]">
                                {productData.map((item, i) => (
                                    <CenterAlignCardFilter key={i} item={item}/>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center flex justify-center items-center text-red-400 text-xl"></p>
                        )}
                    </InfiniteScroll>

                    {/*<div className="min-h-[calc(100vh-70vh)] mb-8">*/}
                    {/*    {productData?.length > 0 ? (*/}
                    {/*        <div*/}
                    {/*            className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-5 min-h-[calc(100vh-90vh)]">*/}
                    {/*            {productData?.map((item, i) => (*/}
                    {/*                <CenterAlignCardFilter key={i} item={item}/>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*    ) : (*/}
                    {/*        <p className="text-center flex justify-center items-center text-red-400 text-xl">No product found</p>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/*{loading && (*/}
                    {/*    <div className="flex justify-center items-center space-x-3 p-6 bg-white rounded-lg shadow-lg">*/}
                    {/*        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>*/}
                    {/*        <p className="text-lg font-semibold text-gray-700">Loading...</p>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
                {/* right side products end*/}
            </div>
        </div>
    );
};

export default ProductFilterPage;
