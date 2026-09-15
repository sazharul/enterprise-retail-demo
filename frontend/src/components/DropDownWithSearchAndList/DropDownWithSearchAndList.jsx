import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import searchIcon from "../../assets/DropDownWithSearchAndList/ion_search.svg";
import "./DropDownWithSearchAndList.css";
import ScrollButton from "../ScrollButton/ScrollButton";
import {useBrandListForFilterQuery, useTopBrandListForFilterQuery} from "../../redux/features/brandListForFilter/brandListForFilterApi";
import {usePopularBrandQuery} from "../../redux/features/popularBrand/popularBrandApi"; // Import the new hook
import {useBrandListQuery} from "../../redux/features/productFilter/productFilterApi";
import ImageURL from "../ImageURL/ImageURL";

const DropDownWithSearchAndList = ({title}) => {
    const {data: brandListForFilterQuery} = useBrandListForFilterQuery(undefined);
    const {data: topBrandListForFilterQuery, isLoading: topBrandListIsLoading} = useTopBrandListForFilterQuery(undefined);
    const {data: popularBrandData, isLoading: popularBrandLoading} = usePopularBrandQuery(undefined); // Use the new hook
    const {data: brandListWithImage, isLoading} = useBrandListQuery(undefined);
    const [brandList, setBrandList] = useState([]);
    const [topBrandListArr, setTopBrandListArr] = useState([]);
    const [FilteredBrandList, setFilteredBrandList] = useState(brandList);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const {register, handleSubmit, watch, setValue} = useForm();
    const onSubmit = (data) => {
    };

    const watchSearch = watch("search");

    let topBrandList = [{id: 999999, caption: "Top Brands", list: [...topBrandListArr]}];

    useEffect(() => {
        if (watchSearch?.length > 0) {
            const filteredList = [];
            brandList.forEach((brand) => {
                const filteredItems = brand.list.filter((item) => item.title.toLowerCase().includes(watchSearch.toLowerCase()));
                if (filteredItems.length > 0) {
                    filteredList.push({...brand, list: filteredItems});
                }
            });
            setFilteredBrandList(filteredList);
        } else {
            setFilteredBrandList(brandList);
        }
    }, [watchSearch, brandList]);

    useEffect(() => {
        if (brandListForFilterQuery?.status) {
            setBrandList([...brandListForFilterQuery?.data]);
        }
        if (topBrandListForFilterQuery?.status) {
            setTopBrandListArr([...topBrandListForFilterQuery?.data]);
        }
    }, [brandListForFilterQuery, topBrandListForFilterQuery]);

    const alphabetList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    return (
        <div className="relative bg-white" onMouseEnter={() => setIsBrandOpen(true)} onMouseLeave={() => setIsBrandOpen(false)}>
            <div className="hover:cursor-pointer relative">
                <h5 className="hover:cursor-pointer py-4">{title}</h5>
            </div>

            <div
                style={{boxShadow: "0px 4px 20px 0px rgba(36, 52, 58, 0.10)"}}
                className={`min-h-[412px] md:w-[746px] lg:w-[1000px] xl:w-[1202px] md:-left-[207px] lg:-left-[206px] xl:-left-[180px] 2xl:-left-14 absolute z-10 flex top-[52px] rounded overflow-hidden ${isBrandOpen ? "block" : "hidden"}  `}
            >
                {/* left side start */}
                <div className="bg-white w-5/12">
                    <div className="border-b-[1px] p-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative">
                                <input type="text" {...register("search")} placeholder="Search Brands" className="input w-full ps-9 py-[6px] bg-[#F5F5F5] rounded-sm"/>
                                <button className="absolute top-[10px] left-2" type="submit">
                                    <img src={searchIcon} alt=""/>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="relative">
                        <div className=" max-h-[330px] overflow-hidden overflow-y-auto slim-scroll">
                            <>
                                {watchSearch?.length > 0 || (
                                    <>
                                        {topBrandList?.map((items, i) => (
                                            <div key={i} id={items.caption} className="px-5 bg-white">
                                                <h5 className="mt-4 mb-2 text-black  text-lg font-medium leading-normal">{items.caption}</h5>
                                                <div className="mb-5">
                                                    {items.list.map((item, index) => (
                                                        <span
                                                            onClick={() => {
                                                                setValue("search", "");
                                                                setIsBrandOpen(false);
                                                            }}
                                                            key={index}
                                                        >
                                                            <Link to={`/product-filter?brand=${item?.slug}`}>
                                                                <p
                                                                    className={`text-sm font-normal leading-normal mb-2 hover:text-primary-color ${
                                                                        watchSearch?.length > 0 && item?.name.toLowerCase().includes(watchSearch.toLowerCase()) ? "text-[#00000080]" : "text-[#00000080]"
                                                                    }`}
                                                                >
                                                                    {item?.name}
                                                                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold text-white bg-primary-color rounded">
                                                                        {item?.products_count}
                                                                    </span>
                                                                </p>
                                                            </Link>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </>
                            {FilteredBrandList?.map((items, i) => (
                                <div key={i} id={items.caption} className="px-5 bg-white">
                                    <h5 className="mt-4 text-black  text-lg font-medium leading-normal">{items.caption}</h5>
                                    <div className="mb-5">
                                        {items.list.map((item, index) => (
                                            <span
                                                onClick={() => {
                                                    setValue("search", "");
                                                    setIsBrandOpen(false);
                                                }}
                                                key={index}
                                            >
                                                <Link to={`/product-filter?brand=${item?.slug}`}>
                                                    <p
                                                        className={`text-sm font-normal leading-normal mb-2 hover:text-primary-color ${
                                                            watchSearch?.length > 0 && item.title.toLowerCase().includes(watchSearch.toLowerCase()) ? "text-[#00000080]" : "text-[#00000080]"
                                                        }`}
                                                    >
                                                        {item.title}
                                                        <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold text-white bg-primary-color rounded">
                                                            {item?.product_count}
                                                        </span>
                                                    </p>
                                                </Link>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="flex flex-col absolute top-2 right-2 overflow-hidden slim-scroll">
                                {alphabetList.map((item, index) => (
                                    <ScrollButton key={index} to={item} name={item} isBrandOpen={isBrandOpen}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* left side end*/}
                {/* right side start */}
                <div className="bg-[#F5F5F5] w-full">
                    <div className="border-b-[1px] py-3">
                        <h4 className="text-center">Popular Brands</h4>
                    </div>
                    {/* brand images start */}
                    <div className="grid grid-cols-5 gap-5 p-8 h-[360px] overflow-hidden overflow-y-auto slim-scroll">
                        {popularBrandData?.status === true &&
                            popularBrandData?.data?.map((item, index) => (
                                <span onClick={() => setIsBrandOpen(false)} key={index}>
                                    <Link to={`/product-filter?brand=${item?.slug}`}>
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageURL image={item?.image} className="w-full max-w-full hover:cursor-pointer"/>
                                        </div>
                                    </Link>
                                </span>
                            ))}
                    </div>

                    {/* brand images end*/}
                </div>
                {/* right side end*/}
            </div>
        </div>
    );
};

export default DropDownWithSearchAndList;
