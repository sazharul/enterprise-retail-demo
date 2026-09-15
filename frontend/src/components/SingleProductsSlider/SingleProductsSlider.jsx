/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { SlArrowDown, SlArrowLeft, SlArrowRight, SlArrowUp } from "react-icons/sl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SingleProductsSlider.css";
import ImageURL from "../ImageURL/ImageURL";

const SingleProductsSlider = ({ sliderImages }) => {
    // const isHome = location.pathname.includes("product_description");
    const queryString = window.location.search;

    // product image start
    const [currentIndex, setCurrentIndex] = useState(0);
    //
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [nav3, setNav3] = useState(null);

    useEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
        setNav3(slider3);
    }, []);

    let slider1, slider2, slider3;

    const handleBeforeChange = (oldIndex, newIndex) => {
        setCurrentIndex(newIndex);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e) => {
        // setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
        setIsModalVisible(true);
    };

    const handleMouseLeave = () => {
        setIsModalVisible(false);
    };

    const handleMouseMove = (e) => {
        setPosition({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        });
    };
    // product image end

    // style with screen width (media queries alternative way)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const customStyle = {
        transform: `translate(calc(87% - ${position.x}px), calc(87% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(2.75, 2.75)`,
    };

    // if (windowWidth <= 1023) {
    //     customStyle.transform = `translate(calc(110% - ${position.x}px), calc(115% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(3.3, 3.30)`;
    // } else if (windowWidth <= 1279) {
    //     customStyle.transform = `translate(calc(72% - ${position.x}px), calc(75% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(2.4, 2.5)`;
    // } else if (windowWidth <= 1535) {
    //     customStyle.transform = `translate(calc(72.5% - ${position.x}px), calc(5% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(2.4, 2.3)`;
    // }

    return (
        <div className="md:flex justify-between lg:gap-6 ps-1 my-3">
            <div className=" w-full">
                {/* product image start */}
                <>
                    <div className="relative flex flex-col-reverse md:flex-row md:gap-4 lg:gap-6">
                        {/* slider for pc start */}
                        <div className="ms-6 mt-4 lg:w-1/12 lg:flex lg:flex-col items-center justify-center hidden">
                            <button onClick={() => slider1.slickPrev()}>
                                <SlArrowUp className=" mx-auto hidden md:block text-[#5DC9F4] border border-[#5DC9F4] rounded-full p-1 mb-2" size={28} />
                            </button>
                            <div className="relative w-[62px]">
                                <Slider
                                    // className="max-h-[610px]"
                                    asNavFor={nav1}
                                    ref={(slider) => (slider2 = slider)}
                                    slidesToShow={sliderImages?.length > 5 ? 5 : sliderImages?.length == 4 ? 4 : sliderImages?.length == 3 ? 3 : sliderImages?.length == 2 ? 2 : 1}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                    arrows={false}
                                    vertical={true}
                                    centerMode={true}
                                    centerPadding="-50px"
                                    beforeChange={handleBeforeChange}
                                >
                                    {sliderImages &&
                                        sliderImages?.map((item, index) => (
                                            <div className={`  hover:cursor-pointer mt-[2.8px] rounded ${index === currentIndex ? "border border-[#5DC9F4] " : ""}`} key={index}>
                                                <ImageURL image={item} className="h-[60px] w-[60px] rounded" />
                                            </div>
                                        ))}
                                </Slider>
                            </div>
                            <button
                                onClick={() => {
                                    slider1.slickNext();
                                }}
                            >
                                <SlArrowDown className="mx-auto hidden md:block text-[#5DC9F4] border border-[#5DC9F4] rounded-full p-1 mt-2" size={28} />
                            </button>
                        </div>
                        {/* slider for pc end */}
                        {/* big picture start */}
                        <div className=" w-full lg:w-[78%] h-min ">
                            <Slider asNavFor={nav2} ref={(slider) => (slider1 = slider)} slidesToShow={1} arrows={false} vertical={true}>
                                {sliderImages?.map((item, index) => (
                                    <div key={index} className={` w-[305px] h-[305px]  xs:h-[372px] xs:w-[372px] sm:h-[372px] sm:w-[372px] md:h-[380px] md:w-[380px] lg:h-[270px] lg:w-[270px]  2xl:h-[372px] 2xl:w-[372px] cursor-zoom-in relative overflow-hidden !flex items-center justify-center`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={(e) => handleMouseMove(e)}>
                                        {/* {isModalVisible && (
                                            <div
                                                className="hidden lg:block absolute h-52 w-52 rounded-lg pointer-events-none"
                                                style={{
                                                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                    top: position.y - 100,
                                                    left: position.x - 100,
                                                }}
                                            />
                                        )} */}
                                        <ImageURL image={item} className=" h-auto w-auto max-h-full max-w-full rounded-lg" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        {/* big picture end */}
                    </div>

                    {/* for mobile start */}
                    <div className="flex items-center lg:hidden lg:m-4 justify-center mx-1 px-2">
                        <button onClick={() => slider3.slickPrev()}>
                            <SlArrowLeft size={28} className="mx-auto block text-[#5DC9F4] border border-[#5DC9F4] rounded-full p-1 xs:me-6 md:me-auto" />
                        </button>
                        <div className="w-10/12">
                            <div className="">
                                <Slider asNavFor={nav1} ref={(slider) => (slider3 = slider)} slidesToShow={sliderImages?.length > 5 ? (windowWidth < 360 ? 3 : 5) : sliderImages?.length || 1} swipeToSlide={true} focusOnSelect={true} arrows={false} centerMode={true} centerPadding="0px" beforeChange={handleBeforeChange}>
                                    {sliderImages?.map((item, index) => (
                                        <div className={`hover:cursor-pointer rounded-md px-1`} key={index}>
                                            <ImageURL image={item} className={`h-[50px] xs:h-[80px] w-[80px] rounded-md ${index === currentIndex ? "border border-[#5DC9F4] " : ""}`} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <button onClick={() => slider3.slickNext()}>
                            <SlArrowRight size={28} className="mx-auto block text-[#5DC9F4] border border-[#5DC9F4] rounded-full p-1 xs:ms-5 md:ms-2" />
                        </button>
                    </div>

                    {/* for mobile end */}
                </>
                {/* product image end */}
            </div>
            {/* hover image start */}
            <div className="lg:w-full relative">
                {isModalVisible && (
                    <div className="hidden lg:h-[450px] lg:block bg-white h-full w-[450px] absolute top-0 left-[0%] overflow-hidden border z-20 rounded-lg ">
                        <ImageURL style={customStyle} image={sliderImages[currentIndex]} className="h-full w-full object-fill rounded-md" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleProductsSlider;
