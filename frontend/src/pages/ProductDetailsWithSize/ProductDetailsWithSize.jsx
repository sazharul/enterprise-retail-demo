import {Divider, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {
    BsCheck,
    BsFacebook,
    BsFillShareFill,
    BsLink45Deg,
    BsLinkedin,
    BsPersonCircle,
} from "react-icons/bs";
import {FaAngleDown, FaChevronDown, FaRegHeart} from "react-icons/fa6";
import {FiMinus, FiPlus, FiThumbsUp} from "react-icons/fi";
import {GoStarFill} from "react-icons/go";
import {
    SlArrowDown,
    SlArrowLeft,
    SlArrowRight,
    SlArrowUp,
} from "react-icons/sl";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import reviewImg1 from "../../assets/review-image/review1.png";
import reviewImg2 from "../../assets/review-image/review2.png";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import ImageURL from "../../components/ImageURL/ImageURL";
import StarRating from "../../components/StarRating/StarRating";
import Button from "../../components/ui/Button";

import "./ProductDetailsWithSize.scss";
import genuineProductsImage from "../../assets/productDetails/products.png";
import returnPolicyImage from "../../assets/productDetails/Return.png";
import soldByImage from "../../assets/productDetails/soldBy.png";
import CenterAlignCard from "../../components/allCards/CenterAlignCard/CenterAlignCard";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {ScrollRestoration, useLocation} from "react-router-dom";
import ReviewSlider from "../../components/ReviewSlider/ReviewSlider";
import {IoMdClose} from "react-icons/io";
import CreateReview from "../ProductDetails/CreateReview/CreateReview";
import TabForProductDetails from "../ProductDetails/TabForProductDetails/TabForProductDetails";

const ProductDetailsWithSize = () => {
    const [isCreateReview, setIsCreateReview] = useState(false);
    const [counter, setCounter] = useState(1);
    const [shadeName, setShadeName] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const location = useLocation();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const shadeCount = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
    ];
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
    const [position, setPosition] = useState({x: 0, y: 0});

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
        transform: `translate(calc(72.5% - ${position.x}px), calc(60% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(2.5, 2.2)`,
    };

    if (windowWidth <= 1023) {
        customStyle.transform = `translate(calc(110% - ${position.x}px), calc(115% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(3.3, 3.30)`;
    } else if (windowWidth <= 1279) {
        customStyle.transform = `translate(calc(72% - ${position.x}px), calc(75% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(2.4, 2.5)`;
    } else if (windowWidth <= 1535) {
        customStyle.transform = `translate(calc(72.5% - ${position.x}px), calc(65% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(2.4, 2.3)`;
    }
    // style with screen width (media queries alternative way)

    // const [singleProductData, setSingleProductData] = useState([])
    //
    // useEffect(() => {
    //   // axios.get(`get_single_products/${16}`)
    //   axios.get(`get_single_products/nobis-maxime-quidem-non-praesentium-ratione?pagination=3`)
    //     .then(response => {
    //       // Handle the response data here
    //       setSingleProductData(response?.data?.data);
    //     })
    //     .catch(error => {
    //       // Handle any errors here
    //       console.error('Error fetching data:', error);
    //     });
    // }, [
    //   // searchValue
    // ]);

    // const singleProductData = isLoading || singleProduct?.data;
    // const productImages = isLoading || singleProduct?.data?.products?.images;
    // const sliderImages = productImages.filter((image) => image !== null);
    const sliderImages = [
        "https://store.focallurebd.com/storage/files/1/Sunsilk-Shampoo-160ml-1.jpg",
        "https://i5.walmartimages.com/seo/POND-S-Face-Cream-Crema-S-14-1-oz_f87383e2-31b8-4783-8d39-b379a53c5940_1.6b696c7d6e20ff20bd4afeb13471e640.jpeg",
        "https://www.ritchiefeed.com/cdn/shop/files/Untitled_design-18_7a6111f9-4209-4331-a1ee-c9df2b2c83d9_1800x.png?v=1652968623",
        "https://store.focallurebd.com/storage/files/1/Sunsilk-Shampoo-160ml-1.jpg",
        "https://i5.walmartimages.com/seo/POND-S-Face-Cream-Crema-S-14-1-oz_f87383e2-31b8-4783-8d39-b379a53c5940_1.6b696c7d6e20ff20bd4afeb13471e640.jpeg",
        "https://i5.walmartimages.com/asr/be8ea28a-4c22-4b5f-a232-e5e2e4712a40_1.715225f212a18be3f07e787afc601cb9.jpeg",
    ];

    const handleIncrement = () => {
        setCounter((prevCounter) => prevCounter + 1);
    };

    const handleDecrement = () => {
        if (counter > 1) {
            setCounter((prevCounter) => prevCounter - 1);
        }
    };
    const items = [
        {name: "John", age: 21},
        {name: "Peter", age: 21},
        {name: "Sally", age: 21},
        {name: "John", age: 21},
        {name: "Peter", age: 21},
        {name: "Sally", age: 21},
    ];

    return (
        <>
            <div className=" container mx-auto">
                <Breadcrumbs
                    className={"mt-2 mb-1 md:my-4 px-[10px]"}
                    first={"Home"}
                    second={"Skin"}
                    third={"Lipstick"}
                />
                {/* Product slider and title start */}
                <div
                    className="rounded mx-[10px]"
                    style={{boxShadow: "0px 0px 6px 0px #E4EDF0"}}
                >
                    <div className="md:flex justify-between gap-x-4 xl:gap-x-0 my-3">
                        <div className=" w-full md:w-4/12">
                            {/* product image start */}
                            <>
                                <div className="">
                                    <div className="relative flex flex-col-reverse items-center md:flex-row md:gap-6 lg:gap-8">
                                        {/* slider for pc start */}
                                        <div className="ms-6 mt-4 lg:w-1/12 lg:flex lg:flex-col items-center justify-center hidden">
                                            <button onClick={() => slider1.slickPrev()}>
                                                <SlArrowUp
                                                    className=" mx-auto hidden md:block text-[#5DC9F4] border border-[#5DC9F4] rounded-full p-1 mb-2"
                                                    size={28}
                                                />
                                            </button>

                                            <div className="relative w-[62px]">
                                                {/* <div
                                                onClick={() => slider1.slickPrev()}
                                                className="h-1/5 w-full  absolute top-0 z-10 bg-gradient-to-b from-white hover:cursor-pointer"
                                            ></div> */}
                                                <Slider
                                                    // className="max-h-[610px]"
                                                    asNavFor={nav1}
                                                    ref={(slider) => (slider2 = slider)}
                                                    slidesToShow={
                                                        sliderImages.length > 5 ? 5 : sliderImages.length
                                                    }
                                                    swipeToSlide={true}
                                                    focusOnSelect={true}
                                                    arrows={false}
                                                    vertical={true}
                                                    centerMode={true}
                                                    centerPadding="-50px"
                                                    beforeChange={handleBeforeChange}
                                                >
                                                    {sliderImages &&
                                                        sliderImages.map((item, index) => (
                                                            <div
                                                                className={`  hover:cursor-pointer rounded ${
                                                                    index === currentIndex
                                                                        ? "border border-[#5DC9F4] "
                                                                        : ""
                                                                }`}
                                                                key={index}
                                                            >
                                                                {/* <img
                            className="h-full w-full rounded-md"
                            src={item.src}
                            alt=""
                          /> */}
                                                                <ImageURL
                                                                    image={item}
                                                                    className="h-[60px] w-[60px] rounded"
                                                                />
                                                            </div>
                                                        ))}
                                                </Slider>
                                                {/* <div
                                                onClick={() => slider1.slickNext()}
                                                className=" h-1/5 w-full absolute bottom-0 z-10 bg-gradient-to-t from-white hover:cursor-pointer"
                                            ></div> */}
                                            </div>
                                            <button onClick={() => slider1.slickNext()}>
                                                <SlArrowDown
                                                    className="mx-auto hidden md:block text-[#5DC9F4] border border-[#5DC9F4] rounded-full p-1 mt-2"
                                                    size={28}
                                                />
                                            </button>
                                        </div>
                                        {/* slider for pc end */}
                                        {/* big picture start */}
                                        <div className=" lg:w-9/12 h-min ">
                                            <Slider
                                                className="w-full"
                                                asNavFor={nav2}
                                                ref={(slider) => (slider1 = slider)}
                                                slidesToShow={1}
                                                arrows={false}
                                                vertical={true}
                                            >
                                                {sliderImages.map((item, index) => (
                                                    <div className="w-full" key={index}>
                                                        <div
                                                            className=" w-full cursor-zoom-in relative overflow-hidden"
                                                            onMouseEnter={handleMouseEnter}
                                                            onMouseLeave={handleMouseLeave}
                                                            onMouseMove={(e) => handleMouseMove(e)}
                                                        >
                                                            {isModalVisible && (
                                                                <div
                                                                    className="hidden lg:block absolute h-52 w-52 rounded-lg pointer-events-none"
                                                                    style={{
                                                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                                        top: position.y - 100,
                                                                        left: position.x - 100,
                                                                    }}
                                                                />
                                                            )}
                                                            {/* <img
                          className="w-full rounded-lg"
                          src={item.src}
                          alt=""
                        /> */}
                                                            <ImageURL
                                                                image={item}
                                                                className="w-full rounded"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                        {/* big picture end */}
                                    </div>
                                </div>

                                {/* for mobile start */}
                                <div className="flex items-center lg:hidden lg:m-4 justify-center mx-1 px-2">
                                    <button onClick={() => slider3.slickPrev()}>
                                        <SlArrowLeft
                                            size={28}
                                            className="mx-auto block text-[#5DC9F4] border border-[#5DC9F4] rounded-full p-1 xs:me-6 md:me-auto"
                                        />
                                    </button>
                                    <div className="w-10/12">
                                        <div className="">
                                            <Slider
                                                asNavFor={nav1}
                                                ref={(slider) => (slider3 = slider)}
                                                slidesToShow={
                                                    sliderImages.length > 5
                                                        ? windowWidth < 360
                                                            ? 3
                                                            : 5
                                                        : sliderImages.length
                                                }
                                                swipeToSlide={true}
                                                focusOnSelect={true}
                                                arrows={false}
                                                centerMode={true}
                                                centerPadding="0px"
                                                beforeChange={handleBeforeChange}
                                            >
                                                {sliderImages.map((item, index) => (
                                                    <div
                                                        className={`hover:cursor-pointer rounded-md px-1`}
                                                        key={index}
                                                    >
                                                        {/* <img
                          className={`h-full w-full rounded-md ${
                            index === currentIndex
                              ? "border border-[#5DC9F4] "
                              : ""
                          }`}
                          src={item.src}
                          alt=""
                        /> */}
                                                        <ImageURL
                                                            image={item}
                                                            className={`h-[50px] xs:h-[80px] w-[80px] rounded-md ${
                                                                index === currentIndex
                                                                    ? "border border-[#5DC9F4] "
                                                                    : ""
                                                            }`}
                                                        />
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    </div>
                                    <button onClick={() => slider3.slickNext()}>
                                        <SlArrowRight
                                            size={28}
                                            className="mx-auto block text-[#5DC9F4] border border-[#5DC9F4] rounded-full p-1 xs:ms-5 md:ms-2"
                                        />
                                    </button>
                                </div>
                                {/* for mobile end */}
                            </>
                            {/* product image end */}
                        </div>
                        <div className=" w-full md:w-8/12 relative">
                            {/* hover image start */}
                            {isModalVisible && (
                                <div className="hidden md:h-[490px] lg:h-full lg:block bg-white h-full w-/12 absolute top-0 left-[0%] overflow-hidden border z-20 rounded ">
                                    {/* <img
                className=""
                src={sliderImages[currentIndex].src}
                alt="alt"
                style={customStyle}
              /> */}
                                    <ImageURL
                                        style={customStyle}
                                        image={sliderImages[currentIndex]}
                                        className="h-full w-full rounded"
                                    />
                                </div>
                            )}
                            {/* hover image end */}

                            {/* title and details start */}
                            <div className="md:border-s-[1px] h-full flex flex-col justify-between">
                                <div className="px-1 md:p-5">
                                    <div>
                                        <h1 className=" sm:text-xl md:text-xl font-medium mb-[10px] md:mb-3 md:leading-[28px]">
                                            {/* {singleProductData?.products?.name && singleProductData?.products?.name} */}
                                            Maybelline New York Color Sensational Creamy Matte
                                            Lipstick - 657 Nude Nuance
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-x-2 mb-2 md:mb-3">
                                            {" "}
                                            <p className="whitespace-nowrap text-[#000000CC] font-inter text-xs md:text-sm font-normal leading-normal">
                                                Brand:{" "}
                                                <span className="text-black font-medium">Lakme</span>
                                            </p>
                                            <div className="border-[0.1px] h-4"></div>
                                            <p className="whitespace-nowrap text-[#000000CC] font-inter text-xs md:text-sm font font-normal leading-normal">
                                                Size:{" "}
                                                <span className="text-black font-medium">3.4ml</span>
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-2 mb-2 md:mb-3">
                                            {" "}
                                            <StarRating rating={4} totalStars={5}/>
                                            <div className="border-[0.1px] h-4"></div>
                                            <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs md:text-sm font font-normal leading-normal">
                        <span className="text-black font-medium">
                          23421 ratings & 234 reviews
                        </span>
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-2 mb-2 md:mb-8">
                                            {" "}
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="flex items-center text-[28px] font-semibold tracking-[-1.12px] leading-[42px]">
                                                    ৳550
                                                </h2>
                                                <span className="flex flex-wrap items-center gap-2 font-medium">
                          <h4 className="flex items-center text-base font-semibold text-[#999] line-through">
                            ৳550
                          </h4>
                        </span>
                                            </div>
                                            <div className="border-[0.1px] h-4"></div>
                                            <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                        <span className="text-[#02792A] font-semibold text-base">
                          (-25% Off)
                        </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        {/* Shade start */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="relative">
                                                    <div
                                                        onClick={() => setShadeName(!shadeName)}
                                                        className="flex items-center gap-1 sm:gap-4 hover:cursor-pointer mb-2"
                                                    >
                                                        <p className="text-[#000000CC] text-sm font-medium leading-normal">
                                                            180ml
                                                        </p>
                                                        <span
                                                            className={`${shadeName ? "rotate-180" : ""}`}
                                                        >
                              <FaAngleDown/>
                            </span>
                                                    </div>
                                                    <div
                                                        style={{boxShadow: "0px 0px 6px 0px #E4EDF0"}}
                                                        className={`absolute top-6 w-36  whitespace-nowrap bg-white rounded overflow-hidden z-20 ${
                                                            shadeName ? "block" : "hidden"
                                                        }`}
                                                    >
                                                        <p className="text-[#000000A6]   text-sm font-medium leading-normal hover:bg-primary-color p-2 hover:cursor-pointer">
                                                            180ml
                                                        </p>
                                                        <p className="text-[#000000A6]   text-sm font-medium leading-normal hover:bg-primary-color p-2 hover:cursor-pointer">
                                                            340ml
                                                        </p>
                                                        <p className="text-[#000000A6]   text-sm font-medium leading-normal hover:bg-primary-color p-2 hover:cursor-pointer">
                                                            650ml
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* <p className="text-[#000000CC] text-sm font-medium leading-normal border-b-2 border-[#5DC9F4]">
                                                    All Shades (32)
                                                </p> */}
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Button className="text-base font-semibold px-2 py-1  tracking-[-0.16px] border-primary-color">
                                                    180ml
                                                </Button>
                                                <Button
                                                    className="text-base font-medium px-2 py-1 rounded-md text-black tracking-[-0.16px]"
                                                    variant="bordered"
                                                >
                                                    340ml
                                                </Button>
                                                <Button
                                                    className="text-base font-medium px-2 py-1 rounded-md text-black tracking-[-0.16px]"
                                                    variant="bordered"
                                                >
                                                    650ml
                                                </Button>
                                                {/* <div className="w-28 h-24 bg-red-500 rounded-md"></div> */}
                                                {/* <div className="border h-24 overflow-hidden overflow-y-auto slim-scroll p-2 w-full flex gap-2 flex-wrap">
                                                    <div className="w-7 h-7 bg-red-900 rounded hover:cursor-pointer"></div>
                                                    <div className="w-7 h-7 bg-green-600 rounded hover:cursor-pointer"></div>
                                                    <div className="w-7 h-7 bg-blue-600 rounded hover:cursor-pointer"></div>
                                                    {shadeCount.map((item, index) => (
                                                        <div className="w-7 h-7 bg-red-500 rounded hover:cursor-pointer" key={index}></div>
                                                    ))}
                                                </div> */}
                                            </div>
                                        </div>
                                        {/* Shade end */}
                                        <div className="flex flex-wrap items-center gap-4 mb-6">
                                            <p className="text-sm font-semibold">Quantity</p>

                                            <div className="w-[104px] h-9 border rounded-md border-[#5DC9F4] flex items-center">
                                                <button
                                                    onClick={handleDecrement}
                                                    className=" px-[9px]  text-[#5DC9F4] border-e-[1.2px] border-[#5DC9F4]"
                                                >
                                                    <FiMinus/>
                                                </button>
                                                <input
                                                    type="number"
                                                    value={counter}
                                                    readOnly
                                                    // onChange={handleInputChange}
                                                    className={`text-center bg-white text-[#5DC9F4] h-7 w-8 
                                            ${
                                                        isNaN(counter)
                                                            ? "border-[#5DC9F4] outline-none"
                                                            : "border-[#5DC9F4] outline-none"
                                                    }
                                            `}
                                                />
                                                <button
                                                    onClick={handleIncrement}
                                                    className="py-[0.8px] px-2 text-[#5DC9F4] border-s-[1.2px] border-[#5DC9F4]"
                                                >
                                                    <FiPlus/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-1">
                                            <div className="flex items-center gap-2 md:gap-5">
                                                <Button
                                                    className="rounded text-black text-xs xs:text-base px-2 xs:px-5 py-[9px] font-semibold md:px-10 border-black"
                                                    variant="bordered"
                                                >
                                                    Buy Now
                                                </Button>
                                                <Button
                                                    className="rounded text-xs px-2 py-[9px] xs:text-base xs:px-5  font-semibold border-primary-color sm:px-4 md:px-10"
                                                    variant=""
                                                >
                                                    Add To Bag
                                                </Button>
                                                <Button
                                                    className="rounded font-semibold  text-xs px-2 py-1 xs:py-2 xs:px-5  md:py-[6px]"
                                                    variant="bordered"
                                                >
                                                    <FaRegHeart size={25}/>
                                                </Button>
                                            </div>
                                            {/* <BsFillShareFill className="text-[#999999] text-end md:me-2 lg:me-10 hover:cursor-pointer w-5 h-5 sm:w-7 sm:h-7" /> */}
                                            <button
                                                onClick={() => setIsShare(!isShare)}
                                                className="relative"
                                            >
                                                <BsFillShareFill className="text-[#999999] text-end me-1 hover:cursor-pointer w-5 h-5 sm:w-7 sm:h-7"/>
                                                <div
                                                    className={`bg-white absolute top-10 md:top-12 -right-5  filter drop-shadow-md ${
                                                        isShare ? "block" : "hidden"
                                                    } `}
                                                >
                                                    <div className="relative">
                                                        <div className=" w-6 h-6 rotate-45 bg-white absolute right-5 sm:right-3 md:right-3 lg:right-5 -mt-3"></div>
                                                        <div className="flex items-center px-4 py-5 gap-6">
                              <span className="whitespace-nowrap me-1 text-[10px] font-medium">
                                Share via:
                              </span>
                                                            <span className="whitespace-nowrap hover:cursor-pointer h-min flex flex-col justify-center">
                                <BsLink45Deg className="mx-auto"/>
                                <span className="text-[8px] font-medium">
                                  Copy Link
                                </span>
                              </span>
                                                            <span>
                                <BsFacebook className="text-[#1255D9] h-5 w-5 sm:h-7 sm:w-7 hover:cursor-pointer"/>
                              </span>
                                                            <span>
                                <BsLinkedin className="text-[#3051C4] h-5 w-5 sm:h-7 sm:w-7 hover:cursor-pointer"/>
                              </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between bg-[#D4F3FF] w-full py-2 px-2 md:px-5">
                                    <div className="flex items-center gap-1 xs:gap-2">
                                        <img className="h-6" src={genuineProductsImage} alt=""/>
                                        <p className="text-[#000000A6] font-inter text-[8px] xs:text-sm font-medium leading-normal">
                                            100% Genuine Products
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 xs:gap-2">
                                        <img className="h-6" src={returnPolicyImage} alt=""/>
                                        <p className="text-[#000000A6] font-inter text-[8px] xs:text-sm font-medium leading-normal">
                                            Easy Return Policy
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 xs:gap-2">
                                        <img className="h-6" src={soldByImage} alt=""/>
                                        <p className="text-[#000000A6] font-inter text-[8px] xs:text-sm font-medium leading-normal">
                                            Sold By: GlowCart
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* title and details end*/}
                        </div>
                    </div>
                </div>
                {/* Product slider and title end*/}
                <h5 className="text-black font-Inter text-xl font-semibold px-[10px] mt-3 mb-2 md:mb-4 md:mt-6">
                    Product Description
                </h5>
                <div className="flex items-start gap-7 ">
                    <div className="w-full">
                        <div className="mb-6 px-[10px]">
                            <TabForProductDetails/>
                        </div>
                        <div className="mb-6">
                            <h5 className="text-black px-[10px] text-lg font-semibold mb-4">
                                Customers also Viewed
                            </h5>
                            <CardCarousel
                                defaultSlidesToShow={5}
                                slidesToShowFor540={1}
                                slidesToShowFor640={2}
                                slidesToShowFor768={2}
                                slidesToShowFor1024={3}
                                slidesToShowFor1280={4}
                                slidesToShowFor1536={5}
                            >
                                {items.map((item, i) => (
                                    <div key={i} className="min-w-min px-2 pb-2">
                                        <CenterAlignCard key={i} item={item}/>
                                    </div>
                                ))}
                            </CardCarousel>
                        </div>
                        <div>
                            <h5 className="text-black px-[10px] text-lg font-semibold mb-4">
                                Product Details
                            </h5>
                            {/* rating start */}
                            <div
                                className="rounded p-1 mb-10 md:mb-20 mx-[10px]"
                                style={{boxShadow: "0px 0px 6px 0px #E4EDF0"}}
                            >
                                <div className="border-b-[1px] flex justify-between md:px-5 overflow-hidden overflow-x-auto slim-scroll">
                                    <p
                                        className={`text-[#000000A6] text-sm font-semibold leading-5 border-b-primary-color py-[15px] text-black`}
                                    >
                                        Ratings & Reviews
                                    </p>
                                    <div className="flex items-center md:hidden gap-5">
                                        <div>
                                            <Button
                                                onClick={() => setIsCreateReview((prev) => !prev)}
                                                className="border-black text-black px-3 rounded-md"
                                                variant="bordered"
                                            >
                                                Write Review
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2 md:p-5">
                                    <div
                                        className={`flex  ${
                                            isCreateReview ? "items-start" : "items-center"
                                        } gap-4 pb-2 md:pb-4`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-black font-inter text-2xl md:text-5xl font-bold leading-normal">
                                                4.3/<span className="font-medium">5</span>
                                            </h1>
                                            <div>
                                                <p className="text-black  text-sm font-semibold leading-normal">
                                                    Overall Ratings
                                                </p>
                                                <p className="text-[#000000A6]  text-xs font-normal leading-normal">
                                                    234 verified ratings
                                                </p>
                                            </div>
                                        </div>

                                        <Divider
                                            className={`h-10 hidden md:block ${
                                                isCreateReview && "h-56"
                                            }`}
                                            type="vertical"
                                        />
                                        {isCreateReview ? (
                                            <CreateReview
                                                className={"hidden md:block"}
                                                cancel={setIsCreateReview}
                                            />
                                        ) : (
                                            <div className="hidden md:flex items-center gap-5">
                                                <div>
                                                    <p className="text-[#000000A6]  text-sm font-semibold leading-normal">
                                                        Add your Review
                                                    </p>
                                                </div>
                                                <div>
                                                    <Button
                                                        onClick={() => setIsCreateReview((prev) => !prev)}
                                                        className="border-black text-black px-7 rounded-md"
                                                        variant="bordered"
                                                    >
                                                        Write Review
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {isCreateReview && (
                                            <CreateReview
                                                className={"block md:hidden"}
                                                cancel={setIsCreateReview}
                                            />
                                        )}
                                    </div>
                                    <div className="border-t-[1px] border-b-[1px] py-5">
                                        <p
                                            className={`text-[#000000A6] text-sm font-semibold leading-5  pb-[15px] text-black mb-1`}
                                        >
                                            Photos From Customers
                                        </p>
                                        <div>
                                            <div className="flex items-center gap-4">
                                                <div className="md:w-1/12">
                                                    <img src={reviewImg1} alt=""/>
                                                </div>
                                                <div className="md:w-1/12">
                                                    <img src={reviewImg2} alt=""/>
                                                </div>
                                                <div className="md:w-1/12">
                                                    <img src={reviewImg1} alt=""/>
                                                </div>
                                                <div className="md:w-1/12">
                                                    <img src={reviewImg2} alt=""/>
                                                </div>
                                                <div className="w-1/12 hidden md:block">
                                                    <img src={reviewImg1} alt=""/>
                                                </div>
                                                <div className="w-1/12 hidden md:block">
                                                    <img src={reviewImg2} alt=""/>
                                                </div>
                                                <div className="w-1/12 hidden md:block">
                                                    <img src={reviewImg1} alt=""/>
                                                </div>
                                                <div className="w-1/12 hidden md:block">
                                                    <img src={reviewImg2} alt=""/>
                                                </div>
                                                <div className="w-1/12 hidden md:block">
                                                    <img src={reviewImg1} alt=""/>
                                                </div>
                                                <div className="w-1/12 relative hidden md:block">
                                                    <img src={reviewImg2} alt=""/>
                                                    <div className="z-10 absolute top-0 left-0 w-full h-full bg-black opacity-50 flex justify-center items-center">
                                                        <p>+35more</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <p
                                            className={`text-[#000000A6] text-sm font-semibold leading-5 pt-3  md:pt-[15px] text-black mb-1`}
                                        >
                                            Most Useful Review
                                        </p>
                                        <div className="w-full">
                                            {/* per comment start*/}
                                            <div className="border-b-[1px] py-3 md:py-6 ">
                                                <div className="flex flex-col md:flex-row items-start gap-3 md:gap-7 ">
                                                    <div className="flex items-center gap-2">
                                                        <div>
                                                            <BsPersonCircle
                                                                size={35}
                                                                className=" text-[#D9D9D9]"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-black font-bold text-sm leading-normal whitespace-nowrap">
                                                                Vinod Kumar
                                                            </p>
                                                            <div className="flex items-center gap-1">
                                                                <BsCheck
                                                                    size={12}
                                                                    className=" text-white bg-[#5dc9f4] rounded-full"
                                                                />
                                                                <p className="text-[#000000A6] text-[10px] font-medium leading-normal whitespace-nowrap">
                                                                    Verified Buyers
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full">
                                                        <div className="w-full">
                                                            <div className="flex items-start justify-between w-full mb-4">
                                                                <div className="flex items-center">
                                                                    <div className="bg-[#5dc9f4] text-white rounded-md flex justify-center items-center gap-1 py-[6px] px-2">
                                                                        <p>5</p>
                                                                        <GoStarFill
                                                                            size={15}
                                                                            className="text-white"
                                                                        />
                                                                    </div>
                                                                    <Divider className="h-6" type="vertical"/>
                                                                    <div className="rounded-md w-6 h-6 bg-[#BF2E4B]"></div>
                                                                    <p className="text-[#000000A6] text-sm font-medium leading-normal ms-2">
                                                                        Nude Shade Color
                                                                    </p>
                                                                </div>
                                                                <p className="text-[#000000CC] text-xs font-normal leading-normal">
                                                                    20 July 2023
                                                                </p>
                                                            </div>
                                                            <div onClick={showModal}>
                                                                <p className="text-black text-sm font-semibold leading-normal">
                                                                    “Velvet in bullet.....”
                                                                </p>
                                                                <p className="text-[#000000A6] text-sm font-normal leading-normal mb-4">
                                                                    It feels light and weightless and has a matte
                                                                    finish that looks fabulous on the pout. This
                                                                    one feels non-sticky and repairs flakiness as
                                                                    is infused with Avocado oil and hyalu...
                                                                    <span className="text-[#000000CC] font-medium">
                                    Read More
                                  </span>
                                                                </p>
                                                                <div className="flex items-center gap-4 mb-4">
                                                                    <div className="w-1/12">
                                                                        <img src={reviewImg1} alt=""/>
                                                                    </div>
                                                                    <div className="w-1/12">
                                                                        <img src={reviewImg2} alt=""/>
                                                                    </div>
                                                                    <div className="w-1/12">
                                                                        <img src={reviewImg1} alt=""/>
                                                                    </div>
                                                                    <div className="w-1/12">
                                                                        <img src={reviewImg2} alt=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                className="text-primary-color rounded-sm"
                                                                variant="bordered"
                                                            >
                                <span className="flex items-center gap-1">
                                  {" "}
                                    <FiThumbsUp size={18}/>
                                  Helpful
                                </span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* per comment end */}
                                            {/* per comment start*/}
                                            <div className="border-b-[1px] py-3 md:py-6">
                                                <div className="flex flex-col md:flex-row items-start gap-3 md:gap-7 ">
                                                    <div className="flex items-center gap-2">
                                                        <div>
                                                            <BsPersonCircle
                                                                size={35}
                                                                className=" text-[#D9D9D9]"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-black font-bold text-sm leading-normal whitespace-nowrap">
                                                                Vinod Kumar
                                                            </p>
                                                            <div className="flex items-center gap-1">
                                                                <BsCheck
                                                                    size={12}
                                                                    className=" text-white bg-[#5dc9f4] rounded-full"
                                                                />
                                                                <p className="text-[#000000A6] text-[10px] font-medium leading-normal whitespace-nowrap">
                                                                    Verified Buyers
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="w-full">
                                                            <div className="flex items-start justify-between w-full mb-4">
                                                                <div className="flex items-center">
                                                                    <div className="bg-[#5dc9f4] text-white rounded-md flex justify-center items-center gap-1 py-[6px] px-2">
                                                                        <p>5</p>
                                                                        <GoStarFill
                                                                            size={15}
                                                                            className="text-white"
                                                                        />
                                                                    </div>
                                                                    <Divider className="h-6" type="vertical"/>
                                                                    <div className="rounded-md w-6 h-6 bg-[#BF2E4B]"></div>
                                                                    <p className="text-[#000000A6] text-sm font-medium leading-normal ms-2">
                                                                        Nude Shade Color
                                                                    </p>
                                                                </div>
                                                                <p className="text-[#000000CC] text-xs font-normal leading-normal">
                                                                    20 July 2023
                                                                </p>
                                                            </div>
                                                            <div onClick={showModal}>
                                                                <p className="text-black text-sm font-semibold leading-normal">
                                                                    “Velvet in bullet.....”
                                                                </p>
                                                                <p className="text-[#000000A6] text-sm font-normal leading-normal mb-4">
                                                                    It feels light and weightless and has a matte
                                                                    finish that looks fabulous on the pout. This
                                                                    one feels non-sticky and repairs flakiness as
                                                                    is infused with Avocado oil and hyalu...
                                                                    <span className="text-[#000000CC] font-medium">
                                    Read More
                                  </span>
                                                                </p>
                                                                <div className="flex items-center gap-4 mb-4">
                                                                    <div className="w-1/12">
                                                                        <img src={reviewImg1} alt=""/>
                                                                    </div>
                                                                    <div className="w-1/12">
                                                                        <img src={reviewImg2} alt=""/>
                                                                    </div>
                                                                    <div className="w-1/12">
                                                                        <img src={reviewImg1} alt=""/>
                                                                    </div>
                                                                    <div className="w-1/12">
                                                                        <img src={reviewImg2} alt=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                className="text-primary-color rounded-sm"
                                                                variant="bordered"
                                                            >
                                <span className="flex items-center gap-1">
                                  {" "}
                                    <FiThumbsUp size={18}/>
                                  Helpful
                                </span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* per comment end */}
                                        </div>
                                        <div className="flex justify-center items-center gap-1 mt-4">
                                            <p className="font-semibold text-sm">Read more reviews</p>
                                            <FaChevronDown/>
                                        </div>
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
            <Modal
                // title="Cancel Order"
                open={isModalOpen}
                onCancel={handleCancel}
                closeIcon={false}
                width={1000}
                okButtonProps={{
                    hidden: true,
                }}
                cancelButtonProps={{
                    hidden: true,
                }}
            >
                <div className="w-full relative">
                    <div
                        onClick={handleCancel}
                        className="absolute top-2 left-2 md:top-7 md:left-7 z-10 bg-[#00000080] rounded-full p-1 md:p-2"
                    >
                        <IoMdClose className="text-white"/>
                    </div>
                    <div className="flex flex-col md:flex-row items-start gap-5">
                        {/* carousel start */}
                        <div className="md:w-6/12 w-full">
                            <ReviewSlider/>
                        </div>
                        {/* carousel end */}
                        <div className="border-b-[1px] py-3 md:py-6 md:w-6/12 px-2 md:px-5">
                            <div className="flex flex-col items-start gap-3 md:gap-7 ">
                                <div className="flex items-center gap-2 w-full pb-3 border-b-[1px]">
                                    <div>
                                        <BsPersonCircle size={35} className=" text-[#D9D9D9]"/>
                                    </div>
                                    <div>
                                        <p className="text-black font-bold text-sm leading-normal whitespace-nowrap">
                                            Vinod Kumar
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <BsCheck
                                                size={12}
                                                className=" text-white bg-[#5dc9f4] rounded-full"
                                            />
                                            <p className="text-[#000000A6] text-[10px] font-medium leading-normal whitespace-nowrap">
                                                Verified Buyers
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="w-full">
                                        <div className="flex flex-wrap gap-y-2 items-start justify-between w-full  mb-4">
                                            <div className="flex items-center">
                                                <div className="bg-[#5dc9f4] text-white rounded-md flex justify-center items-center gap-1 py-[6px] px-2">
                                                    <p>5</p>
                                                    <GoStarFill size={15} className="text-white"/>
                                                </div>
                                                <Divider className="h-6" type="vertical"/>
                                                <div className="rounded-md w-6 h-6 bg-[#BF2E4B]"></div>
                                                <p className="text-[#000000A6] text-sm font-medium leading-normal ms-2">
                                                    Nude Shade Color
                                                </p>
                                            </div>
                                            <p className="text-[#000000CC] text-xs font-normal leading-normal">
                                                20 July 2023
                                            </p>
                                        </div>
                                        <div onClick={showModal}>
                                            <p className="text-black text-sm font-semibold leading-normal">
                                                “Velvet in bullet.....”
                                            </p>
                                            <p className="text-[#000000A6] text-sm font-normal leading-normal mb-4">
                                                It feels light and weightless and has a matte finish
                                                that looks fabulous on the pout. This one feels
                                                non-sticky and repairs flakiness as is infused with
                                                Avocado oil and hyalu...
                                                <span className="text-[#000000CC] font-medium">
                          Read More
                        </span>
                                            </p>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-1/12">
                                                    <img src={reviewImg1} alt=""/>
                                                </div>
                                                <div className="w-1/12">
                                                    <img src={reviewImg2} alt=""/>
                                                </div>
                                                <div className="w-1/12">
                                                    <img src={reviewImg1} alt=""/>
                                                </div>
                                                <div className="w-1/12">
                                                    <img src={reviewImg2} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            className="text-primary-color rounded-sm"
                                            variant="bordered"
                                        >
                      <span className="flex items-center gap-1">
                        {" "}
                          <FiThumbsUp size={18}/>
                        Helpful
                      </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* comment modal end*/}
            {/* ScrollRestoration start */}
            {location?.search ? (
                ""
            ) : (
                <div>
                    <ScrollRestoration/>
                </div>
            )}
            {/* ScrollRestoration end */}
        </>
    );
};

export default ProductDetailsWithSize;
