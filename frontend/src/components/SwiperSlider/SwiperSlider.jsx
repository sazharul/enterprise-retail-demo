import React, {useContext, useRef, useState} from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import "./SwiperSlider.scss";

// import required modules
import {FreeMode, Navigation} from "swiper/modules";
import {LogicProviderContext} from "../../providers/LogicProvider";

const SwiperSlider = ({children}) => {
    const {windowWidth} = useContext(LogicProviderContext);

    return (
        <div className="px-2 SwiperSliderParent">
            <Swiper
                slidesPerView={
                    windowWidth <= 520
                        ? 2
                        : windowWidth <= 640
                            ? 2
                            : windowWidth <= 768
                                ? 2
                                : windowWidth <= 1024
                                    ? 3
                                    : windowWidth <= 1280
                                        ? 4
                                        : windowWidth <= 1535
                                            ? 5
                                            : 5
                }
                spaceBetween={20}
                freeMode={true}
                navigation={true}
                loop={true}
                modules={[FreeMode, Navigation]}
                className="mySwiper"
            >
                {children}
            </Swiper>
        </div>
    );
};

export default SwiperSlider;
