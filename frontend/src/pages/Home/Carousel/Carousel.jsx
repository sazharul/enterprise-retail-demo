import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Import fade effect styles

// Import required Swiper modules directly
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import { Skeleton } from "antd";
import ImageURL from "../../../components/ImageURL/ImageURL.jsx";
import useHomeBanner from "../../../hooks/useHomeBanner.js";
import { LogicProviderContext } from "../../../providers/LogicProvider.jsx";
import { Link } from "react-router-dom";
import "./Cursol.css";

const Carousel = ({ items }) => {
    const { windowWidth } = useContext(LogicProviderContext);
    return (
        <div className=" relative mb-8 mt-2 md:mt-0 ">
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: ".swiper-pagination",
                }}
                effect="fade" // Enable fade effect
                fadeEffect={{ crossFade: true }} // Optional: for smooth transitions
                speed={1500} // Adjust speed for smoother transitions (in ms)
                modules={[Autoplay, Pagination, EffectFade]}
                className="mySwiper"
            >
                {windowWidth <= 640 && (
                    <>
                        {items?.section_data?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Link
                                    to={
                                        item?.type === "Category"
                                            ? `/product-filter?category=${item?.category?.slug}`
                                            : item?.type === "Brand"
                                            ? `/product-filter?brand=${item?.brand?.slug}`
                                            : item?.type === "Offer"
                                            ? `/campaign/${item?.offers?.id}`
                                            : item?.type === "SubCategory"
                                            ? `/product-filter/sub-category/${item?.sub_category?.slug}`
                                            : item?.type === "ChildCategory"
                                            ? `/product-filter/child-category/${item?.child_category?.slug}`
                                            : "#"
                                    }
                                >
                                    <div className="relative w-full h-52 rounded-xl object-fill overflow-hidden">
                                        <ImageURL className="h-full w-full object-fill" image={item?.mobile_image && item?.mobile_image} />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </>
                )}
                {windowWidth >= 641 && (
                    <>
                        {items?.section_data?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Link
                                    to={
                                        item?.type === "Category"
                                            ? `/product-filter?category=${item?.category?.slug}`
                                            : item?.type === "Brand"
                                            ? `/product-filter?brand=${item?.brand?.slug}`
                                            : item?.type === "Offer"
                                            ? `/campaign/${item?.offers?.id}`
                                            : item?.type === "SubCategory"
                                            ? `/product-filter?sub-category=${item?.sub_category?.slug}`
                                            : item?.type === "ChildCategory"
                                            ? `/product-filter?child-category=${item?.child_category?.slug}`
                                            : "#"
                                    }
                                >
                                    <div className="relative w-full h-96 rounded-xl object-fill overflow-hidden">
                                        <ImageURL className="h-full w-full object-fill" image={item?.image && item?.image} />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </>
                )}
            </Swiper>
            <div className="swiper-pagination"></div>
        </div>
    );
};

export default Carousel;
