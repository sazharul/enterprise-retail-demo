import {Fragment, useEffect, useState} from "react";
import {Link, ScrollRestoration} from "react-router-dom";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import ImageURL from "../../components/ImageURL/ImageURL";
import SlimSlider from "../../components/SlimSlider/SlimSlider";
import BrandCard from "../../components/allCards/BrandCard/BrandCard";
import CenterAlignCard from "../../components/allCards/CenterAlignCard/CenterAlignCard";
import DiscountCardForSlider from "../../components/allCards/DiscountCardForSlider/DiscountCardForSlider";
import EggCard from "../../components/allCards/EggCard/EggCard";
// import useHomeData from "../../hooks/useHomeData";
import Carousel from "./Carousel/Carousel";
import HomeSkeleton from "./HomeSkeleton/HomeSkeleton";
import SwiperSlider from "../../components/SwiperSlider/SwiperSlider";
import {SwiperSlide} from "swiper/react";
import axios from "axios";
// import {
//     useBenefitListQuery,
//     useBrandListQuery,
//     useCategoryListQuery,
//     useColorListQuery,
//     useConcernListQuery,
//     useCountryListQuery,
//     useCoverageListQuery,
//     useFinishListQuery,
//     useFormulationListQuery,
//     useGenderListQuery,
//     useIngredientListQuery,
//     usePackSizeListQuery,
//     usePreferenceListQuery,
//     useSkinTypeListQuery
// } from "../../redux/features/productFilter/productFilterApi";

const Home = () => {
    //   const { data: homeData, isLoading, isError } = useHomeQuery();
    //const {homeData, isLoading, isError} = useHomeData();


// caching data for filter page start
//     const {data: brandList} = useBrandListQuery(undefined, {skip: isLoading});
//     const {data: colorList} = useColorListQuery(undefined, {skip: isLoading});
//     const {data: categoryList} = useCategoryListQuery(undefined, {skip: isLoading});
//     const {data: preferenceList} = usePreferenceListQuery(undefined, {skip: isLoading});
//     const {data: formulationList} = useFormulationListQuery(undefined, {skip: isLoading});
//     const {data: finishList} = useFinishListQuery(undefined, {skip: isLoading});
//     const {data: countryList} = useCountryListQuery(undefined, {skip: isLoading});
//     const {data: genderList} = useGenderListQuery(undefined, {skip: isLoading});
//     const {data: coverageList} = useCoverageListQuery(undefined, {skip: isLoading});
//     const {data: skinTypeList} = useSkinTypeListQuery(undefined, {skip: isLoading});
//     const {data: benefitList} = useBenefitListQuery(undefined, {skip: isLoading});
//     const {data: concernList} = useConcernListQuery(undefined, {skip: isLoading});
//     const {data: ingredientList} = useIngredientListQuery(undefined, {skip: isLoading});
//     const {data: packSizeList} = usePackSizeListQuery(undefined, {skip: isLoading});
// caching data for filter page end


    // if (isLoading) {
    //     return (
    //         // <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
    //         //   <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
    //         // </div>
    //         <HomeSkeleton/>
    //     );
    // }
    // if (isError) {
    //     return (
    //         <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
    //             <p className="text-center text-red-500">Something went wrong</p>
    //         </div>
    //     );
    // }

    const [homeData, setHomeData] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchSliderData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_NODE_API_URL || "http://localhost:4001/api/node"}/get-home-web`);
            setHomeData(response.data); // Assuming the API response has a `data` object
            setLoading(false);
        } catch (err) {
            setError("Failed to load slider data.");
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSliderData();
    }, []);


    return (
        <div className="my-container md:pt-5">
            {homeData?.data?.map((item, index) => (
                <Fragment key={index}>
                    {item?.id == 1 && item?.section_data?.length > 0 && (
                        <div className=" mb-4 px-[10px] container mx-auto">
                            <Carousel items={item}/>
                        </div>
                    )}
                    {item?.id == 2 && item?.section_data?.length > 0 && (
                        <div className="mb-4 md:mb-10 container mx-auto">
                            <CardCarousel
                                defaultSlidesToShow={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                                slidesToShowFor540={item?.section_data?.length >= 1 ? 1 : item?.section_data?.length}
                                slidesToShowFor640={item?.section_data?.length >= 2 ? 2 : item?.section_data?.length}
                                slidesToShowFor768={item?.section_data?.length >= 2 ? 2 : item?.section_data?.length}
                                slidesToShowFor1024={item?.section_data?.length >= 2 ? 2 : item?.section_data?.length}
                                slidesToShowFor1280={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                                slidesToShowFor1536={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                            >
                                {item?.section_data?.map((product, i) => (
                                    <div key={i} className="min-w-min px-[10px]">
                                        <DiscountCardForSlider key={i} item={product}/>
                                    </div>
                                ))}
                            </CardCarousel>
                        </div>
                    )}
                    {item?.id == 3 && item?.section_data?.length > 0 && (
                        <div className="mb-4 md:mb-10  px-[10px] container mx-auto">
                            <h4 className="text-black font-inter text-[20px] font-semibold leading-normal mb-2 md:mb-4">{item.title} 3</h4>
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-3">
                                {item?.section_data?.slice(0, 6).map((item, i) => (
                                    <div key={i} className="min-w-min">
                                        <BrandCard item={item}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {item?.id == 9 && item?.section_data?.length > 0 && (
                        <div className="mb-4 md:mb-10 px-[10px] bg-[#FFF2F7]">
                            <div className="container mx-auto py-5">
                                <h4 className="text-black px-[10px] font-inter text-[20px] font-semibold leading-normal mb-2 md:mb-4">{item.title}</h4>
                                <CardCarousel
                                    defaultSlidesToShow={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                                    slidesToShowFor540={item?.section_data?.length >= 1 ? 1 : item?.section_data?.length}
                                    slidesToShowFor640={item?.section_data?.length >= 2 ? 2 : item?.section_data?.length}
                                    slidesToShowFor768={item?.section_data?.length >= 2 ? 2 : item?.section_data?.length}
                                    slidesToShowFor1024={item?.section_data?.length >= 2 ? 2 : item?.section_data?.length}
                                    slidesToShowFor1280={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                                    slidesToShowFor1536={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                                >
                                    {item?.section_data?.map((item, i) => (
                                        <div key={i} className="min-w-min px-[10px] min-h-[140px]">
                                            <Link
                                                to={
                                                    item?.type === 'Category'
                                                        ? `/product-filter?category=${item?.category?.slug}`
                                                        : item?.type === 'Brand'
                                                            ? `/product-filter?brand=${item?.brand?.id}`
                                                            : item?.type === 'Offer'
                                                                ? `/campaign/${item?.offers?.id}`
                                                                : item?.type === 'SubCategory'
                                                                    ? `/product-filter/sub-category/${item?.sub_category?.slug}`
                                                                    : item?.type === 'ChildCategory'
                                                                        ? `/product-filter/child-category/${item?.child_category?.slug}`
                                                                        : '#'
                                                }
                                            >
                                                <ImageURL className={"h-full w-full object-fill"} image={item?.image}/>
                                            </Link>
                                        </div>
                                    ))}
                                </CardCarousel>
                            </div>
                        </div>
                    )}
                    {item?.id == 6 && item?.section_data?.length > 0 && (
                        <div className="mb-4 md:mb-10  container mx-auto">
                            <h4 className="text-black px-[10px] font-inter text-[20px] font-semibold leading-normal mb-2 md:mb-4">{item.title}</h4>
                            {/* <CardCarousel
                                defaultSlidesToShow={item?.section_data?.length >= 5 ? 5 : item?.section_data?.length}
                                slidesToShowFor540={item?.section_data?.length >= 1 ? 1 : item?.section_data?.length}
                                slidesToShowFor640={item?.section_data?.length >= 2 ? 2 : item?.section_data?.length}
                                slidesToShowFor768={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                                slidesToShowFor1024={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                                slidesToShowFor1280={item?.section_data?.length >= 4 ? 4 : item?.section_data?.length}
                                slidesToShowFor1536={item?.section_data?.length >= 5 ? 5 : item?.section_data?.length}
                            >
                                {item?.section_data?.map((item, i) => (
                                    <div key={i} className="min-w-min px-[10px]">
                                        <CenterAlignCard key={i} item={item} />
                                    </div>
                                ))}
                            </CardCarousel> */}
                            <SwiperSlider>
                                {item?.section_data?.map((item, i) => (

                                    <SwiperSlide key={item?.id}>
                                        <CenterAlignCard item={item}/>
                                    </SwiperSlide>

                                ))}
                            </SwiperSlider>
                        </div>
                    )}
                    {item?.id == 7 && item?.section_data?.length > 0 && (
                        <div className="mb-4 md:mb-10  container mx-auto">
                            <h4 className="text-black px-[10px] font-inter text-[20px] font-semibold leading-normal mb-2 md:mb-4">{item.title} </h4>
                            <SwiperSlider>
                                {item?.section_data?.map((item, i) => (
                                    <SwiperSlide key={item?.id}>
                                        <BrandCard item={item}/>
                                    </SwiperSlide>
                                ))}
                            </SwiperSlider>

                            {/*<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-3">*/}
                            {/*    {item?.section_data?.map((item, i) => (*/}
                            {/*        <div key={i} className="min-w-min px-[10px] pb-3">*/}
                            {/*            <BrandCard item={item}/>*/}
                            {/*        </div>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                        </div>
                    )}

                    {item?.id == 8 && item?.section_data?.length > 0 && (
                        <div className="mb-4 md:mb-10  px-[10px] container mx-auto">
                            <h4 className="text-black font-inter text-[20px] font-semibold leading-normal mb-2 md:mb-4">{item.title}</h4>
                            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-x-5 gap-y-3">
                                {item?.section_data?.map((item, i) => (
                                    <div key={i} className="min-w-min">
                                        <BrandCard item={item}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {item?.id == 12 && item?.section_data?.length > 0 && (
                        <div className="mb-4 md:mb-10  px-[10px] container mx-auto">
                            <h4 className="text-black font-inter text-[20px] font-semibold leading-normal mb-2 md:mb-4">{item.title}</h4>
                            {item?.banner && (
                                <div className="mb-4 md:mb-10 h-[200px] lg:h-[250px]">
                                    <ImageURL className={"h-full w-full object-fill"} image={item?.banner}/>
                                </div>
                            )}
                            <div className="mb-4 md:mb-10  container mx-auto">
                                {/* <h4 className="text-black font-inter text-[20px] font-semibold leading-normal mb-4">Explore Our Top Brands </h4> */}
                                <CardCarousel
                                    defaultSlidesToShow={item?.section_data?.length >= 6 ? 6 : item?.section_data?.length}
                                    slidesToShowFor540={item?.section_data?.length >= 1 ? 1 : item?.section_data?.length}
                                    slidesToShowFor640={item?.section_data?.length >= 2 ? 2 : item?.section_data?.length}
                                    slidesToShowFor768={item?.section_data?.length >= 2 ? 2 : item?.section_data?.length}
                                    slidesToShowFor1024={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                                    slidesToShowFor1280={item?.section_data?.length >= 4 ? 4 : item?.section_data?.length}
                                    slidesToShowFor1536={item?.section_data?.length >= 5 ? 5 : item?.section_data?.length}
                                >
                                    {item?.section_data?.map((item, i) => (
                                        <div key={i} className="min-w-min px-[10px] pb-3">
                                            <EggCard item={item}/>
                                        </div>
                                    ))}
                                </CardCarousel>
                            </div>
                        </div>
                    )}
                    {item?.id == 5 && item?.section_data?.length > 0 && (
                        <div className="mb-4 md:mb-10  px-[10px] container mx-auto">
                            <h4 className="text-black font-inter text-[20px] font-semibold leading-normal mb-2 md:mb-4">{item.title} </h4>
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-x-5 gap-y-3">
                                {item?.section_data?.slice(0, 2).map((item, i) => (
                                    <div key={i} className="min-w-min">
                                        <BrandCard item={item}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {item?.id == 15 && item?.section_data?.length > 0 && (
                        <div className="mb-4 md:mb-10 container mx-auto">
                            <h4 className="text-black px-[10px] font-inter text-[20px] font-semibold leading-normal mb-2 md:mb-4">{item.title}</h4>
                            {/* <CardCarousel
                                defaultSlidesToShow={item?.section_data?.length >= 5 ? 5 : item?.section_data?.length}
                                slidesToShowFor540={item?.section_data?.length >= 1 ? 1 : item?.section_data?.length}
                                slidesToShowFor640={item?.section_data?.length >= 2 ? 2 : item?.section_data?.length}
                                slidesToShowFor768={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                                slidesToShowFor1024={item?.section_data?.length >= 3 ? 3 : item?.section_data?.length}
                                slidesToShowFor1280={item?.section_data?.length >= 4 ? 4 : item?.section_data?.length}
                                slidesToShowFor1536={item?.section_data?.length >= 5 ? 5 : item?.section_data?.length}
                            >
                                {item?.section_data?.map((item, i) => (
                                    <div key={i} className="min-w-min px-[10px]">
                                        <CenterAlignCard key={i} item={item} />
                                    </div>
                                ))}
                            </CardCarousel> */}

                            <SwiperSlider>
                                {item?.section_data?.map((item, i) => (

                                    <SwiperSlide key={item?.id}>
                                        <CenterAlignCard item={item}/>
                                    </SwiperSlide>

                                ))}
                            </SwiperSlider>
                        </div>
                    )}
                    {item?.id == 18 && item?.section_data?.length > 0 && (
                        <div className="px-[10px] mb-4 md:mb-10  container mx-auto">
                            <SlimSlider dots={false} item={item?.section_data} isLinkClickOffer={true}/>
                        </div>
                    )}
                </Fragment>
            ))}

            <ScrollRestoration/>

            {/* ---------------- */}
            {/*
            <div className="grid grid-cols-3 gap-x-5 gap-y-4">
                {numbers.slice(0, 3).map((Num, i) => (
                    <DiscountCardForSlider key={i} image={DiscountCardForSliderImage} />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-4">
                {numbers.slice(0, 3).map((Num, i) => (
                    <BrandCard key={i} image={img1} />
                ))}
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-4">
                {numbers.slice(0, 4).map((Num, i) => (
                    <BrandCard key={i} image={img2} />
                ))}
            </div>
            <div className="grid grid-cols-5 gap-x-5 gap-y-4">
                {numbers.slice(0, 5).map((Num, i) => (
                    <BrandCard key={i} image={img3} />
                ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-4">
                {numbers.slice(0, 5).map((Num, i) => (
                    <LeftAlignCard key={i} img={img4} />
                ))}
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-4">
                {numbers.slice(0, 5).map((Num, i) => (
                    <CenterAlignCard key={i} img={centerAlignCardImg} />
                ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-x-5 gap-y-4">
                {numbers.slice(0, 6).map((Num, i) => (
                    <EggCard key={i} image={eggCardImage} eggCardProductImage={eggCardProductImage} />
                ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-4">
                {numbers.slice(0, 5).map((Num, i) => (
                    <CategoryCard key={i} />
                ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-4">
                {numbers.slice(0, 5).map((Num, i) => (
                    <CarouselCategoryCard key={i} />
                ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-4">
                {numbers.slice(0, 5).map((Num, i) => (
                    <DiscountCard key={i} />
                ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-4">
                {numbers.slice(0, 5).map((Num, i) => (
                    <SaveCard key={i} />
                ))}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-4">
                {numbers.slice(0, 5).map((Num, i) => (
                    <IngredientCard key={i} img={centerAlignCardImg} />
                ))}
            </div> */}
            {/* <PrimaryButton title={"Shop All Makeup"} icon={<AiOutlineRight />} /> */}

            {/* <DeliveryAndReturnBanner  /> */}
        </div>
    );
};

export default Home;
