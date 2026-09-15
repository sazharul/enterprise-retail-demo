import PropTypes from "prop-types";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./CardCarousel.scss";

const CardCarousel = ({ children, defaultSlidesToShow, slidesToShowFor1536, slidesToShowFor1280, slidesToShowFor1024, slidesToShowFor768, slidesToShowFor640, slidesToShowFor540, type = "" }) => {
    function CustomPrevArrow(props) {
        return (
            <div
                // h-16 xs:h-24 sm:h-36 md:h-48 lg:h-52
                className="custom-prev-arrow absolute left-2 z-10 bg-white top-[45%] xs:top-[35%] sm:top-[40%]  rounded-full p-1  md:p-3 hover:cursor-pointer"
                onClick={props.onClick}
                // style={{ position: 'absolute', left: 10, zIndex: 1 }}
            >
                <FaChevronLeft className="text-[#000000A6] h-3 w-3 xs:h-4 xs:w-4" />
            </div>
        );
    }

    function CustomNextArrow(props) {
        return (
            <div
                className="custom-next-arrow absolute right-2 z-10 bg-white top-[45%] xs:top-[35%] sm:top-[40%]  rounded-full p-1 md:p-3 hover:cursor-pointer"
                onClick={props.onClick}
                // style={{ position: 'absolute',  right: 10, zIndex: 1 }}
            >
                <FaChevronRight className="text-[#000000A6] h-3 w-3 xs:h-4 xs:w-4" />
            </div>
        );
    }

    const settings = {
        infinite: true,
        speed: 500,

        slidesToShow: defaultSlidesToShow,
        slidesToScroll: defaultSlidesToShow,
        // add gap between slides

        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: slidesToShowFor1536,
                    slidesToScroll: slidesToShowFor1536,
                    // infinite: true,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: slidesToShowFor1280,
                    slidesToScroll: slidesToShowFor1280,
                    // infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slidesToShowFor1024,
                    slidesToScroll: slidesToShowFor1024,
                    // infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: slidesToShowFor768,
                    slidesToScroll: slidesToShowFor768,
                    // infinite: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: slidesToShowFor640,
                    slidesToScroll: slidesToShowFor640,
                    // infinite: true,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: slidesToShowFor540,
                    slidesToScroll: slidesToShowFor540,
                    initialSlide: slidesToShowFor540,
                    // infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: type == "egg" ? 3 : 1,
                    slidesToScroll: 1,
                    // infinite: true,
                },
            },
        ],
    };

    CustomPrevArrow.propTypes = {
        onClick: PropTypes.func.isRequired,
    };

    CustomNextArrow.propTypes = {
        onClick: PropTypes.func.isRequired,
    };

    return (
        <div className="w-full">
            <Slider {...settings} className="custom-slider">
                {children}
            </Slider>
            {/* <style>
                {`
          .slick-slide {
            margin-right: 10px; 
            max-height: 140px;
          }
        `}
            </style> */}
        </div>
    );
};

export default CardCarousel;
