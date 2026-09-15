import React, {useEffect, useState} from "react";
import {FaApple, FaFacebookF, FaPhone, FaTwitter} from "react-icons/fa6";
import {IoLogoYoutube, IoPhonePortraitOutline} from "react-icons/io5";
import {LiaTruckMovingSolid} from "react-icons/lia";
import {SiInstagram} from "react-icons/si";
import {SlBadge} from "react-icons/sl";
import {TbCertificate, TbTag} from "react-icons/tb";
import {Link, useLocation} from "react-router-dom";
import logo from "../../assets/footer/footerLogo.svg";
import playStoreImg from "../../assets/footer/playstore.svg";
import {useGetContactQuery} from "../../redux/features/contact/contactApi";
import {useCategoryListQuery} from "../../redux/features/productFilter/productFilterApi";
import {filterAndSortCategories} from "../../utilities/filterAndSortCategories";

const Footer = () => {
    const {data: categoryList} = useCategoryListQuery(undefined);
    const {data: getContactQuery, isLoading} = useGetContactQuery(undefined);
    const filteredAndSortedCategories = filterAndSortCategories(categoryList?.data);

    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Check if path contains "/product-filter"
    const isProductFilterPath = location.pathname.includes("/product-filter") || /^\/campaign\/\d+$/.test(location.pathname);

    // Decide whether to show the section or not
    const showSection = !(isMobile && isProductFilterPath);

    return (
        <div className="">
            {/* top footer start */}

            <div className="bg-[#8D8D95] py-4 sm:py-9">
                <div className="px-[10px] container mx-auto flex flex-wrap gap-y-4 justify-between items-center  ">
                    <div>
                        <div className="flex items-center gap-1 mb-3">
                            <IoPhonePortraitOutline className="text-white" size={20}/>
                            <p className="text-white font-inter text-xs font-semibold leading-normal tracking-tighter">Experience The GlowCart Mobile App</p>
                        </div>

                        <div className="flex gap-2">
                            {getContactQuery?.status && getContactQuery?.data?.google_link && (
                                <a href={getContactQuery?.data?.google_link} target="_blank" rel="noreferrer">
                                    <div
                                        style={{boxShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.26)"}}
                                        className="border border-white rounded bg-black flex items-center gap-2 p-[6px] w-fit"
                                    >
                                        <img className="" src={playStoreImg} alt=""/>
                                        <div>
                                            <p className="text-white font-poppins text-[8px] font-normal leading-normal -mb-1">Get it on</p>
                                            <p className="text-white font-poppins text-sm font-medium leading-normal tracking-[-0.28px]">Google Play</p>
                                        </div>
                                    </div>
                                </a>
                            )}
                            {getContactQuery?.status && getContactQuery?.data?.apple_link && (
                                <a href={getContactQuery?.data?.apple_link} target="_blank" rel="noreferrer">
                                    <div
                                        style={{boxShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.26)"}}
                                        className="border border-white rounded bg-black flex items-center gap-2 p-[6px] w-fit"
                                    >
                                        <FaApple size={27} className="text-white"/>
                                        <div>
                                            <p className="text-white font-poppins text-[8px] font-normal leading-normal -mb-1">Get it on</p>
                                            <p className="text-white font-poppins text-sm font-medium leading-normal tracking-[-0.28px]">Apple Store</p>
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-start gap-2">
                        <FaPhone className="text-white"/>
                        <div>
                            <p className="text-[#FFFFFFCC] text-xs font-semibold leading-normal">For any help, you may Call Us at</p>
                            <p className="text-[#FFFFFFCC] text-sm font-semibold leading-normal">{getContactQuery?.data?.phone}</p>
                            <p className="text-[#FFFFFFCC] text-xs font-semibold leading-normal">(Saturday to Thursday, 10AM to 7pm)</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* top footer end*/}
            {/* main Footer start */}
            {
                showSection &&
                <div className="bg-[#0A0A0A] py-9 ">
                    <div className="px-[12px] container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-5">
                        <div className="">
                            <Link to={"/"}>
                                <div className="h-5 w-32 sm:h-10 sm:w-44 mb-4 sm:mb-4 -ms-2 sm:ms-0">
                                    <img src={logo} className="max-h-full w-full" alt=""/>
                                </div>
                            </Link>
                            <Link to={"/who-we-are"}>
                                <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Who We Are</p>
                            </Link>
                            {/* <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Careers</p> */}
                            {/* <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Authenticity</p> */}
                        </div>
                        <div>
                            <h5 className="text-primary-color mb-4 sm:mb-8">Help</h5>
                            <Link to={"/contact-us"}>
                                <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Contact Us</p>
                            </Link>
                            <Link to={"/frequently-asked-questions"}>
                                <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">
                                    Frequently Asked Questions
                                </p>
                            </Link>
                            <Link to={"/store-and-event-location"}>
                                <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Store Locator</p>
                            </Link>
                            <Link to="/my-account/return-and-cancel">
                                <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Cancellation & Return</p>
                            </Link>
                            <Link to="/shipping-policies">
                                <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Shipping & Delivery</p>
                            </Link>
                            <Link to="/privacy-policies">
                                <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Privacy Policy</p>
                            </Link>
                            {/* <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">
                          Sell On GlowCart
                        </p> */}
                        </div>
                        <div>
                            <h5 className="text-primary-color mb-4 sm:mb-8">Inspire Me</h5>
                            <Link to={"/buying-guides"}>
                                <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Buying Guides</p>
                            </Link>
                            <Link to={"/beauty-advice"}>
                                <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Beauty Advice</p>
                            </Link>
                        </div>
                        <div>
                            <h5 className="text-primary-color mb-4 sm:mb-8">Top Categories</h5>
                            {categoryList?.status == true &&
                                filteredAndSortedCategories?.length > 0 &&
                                filteredAndSortedCategories?.map((item, index) => (
                                    <Link key={index} to={`/product-filter?category=${item?.slug}`}>
                                        <p
                                            onClick={window.scrollTo({
                                                top: 0,
                                                left: 0,
                                                behavior: "smooth",
                                            })}
                                            className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2"
                                        >
                                            {item?.name}
                                        </p>
                                    </Link>
                                ))}
                        </div>
                        {/* <div>
                        <h5 className="text-primary-color mb-4 sm:mb-8">All Routes</h5>
                        <Link to={"/login-with-email"}>
                            <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Login</p>
                        </Link>
                        <Link to={"/login-with-phone"}>
                            <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Login with phone</p>
                        </Link>
                        <Link to={"/sign-up"}>
                            <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Sign up</p>
                        </Link>
                        <Link to={"/product-details-with-size"}>
                            <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Product Details With Size</p>
                        </Link>
                        <Link to={"/product-details-with-offer"}>
                            <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">Product Details With Offer</p>
                        </Link>
                        <Link to={"/all-review"}>
                            <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">All Review</p>
                        </Link>

                        <Link to={"/all-review-with-no-review"}>
                            <p className="text-[#FFFFFF] text-sm font-medium leading-normal tracking-[-0.14px] hover:cursor-pointer mb-2">All review with no review</p>
                        </Link>
                    </div> */}
                    </div>
                </div>
            }

            {/* main Footer end */}
            {/* bottom footer start */}
            {
                showSection &&
                <div className="bg-white py-7 md:py-14">
                    <div className="px-[10px] container mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4 ">
                        {/* per item start */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary-color p-3 rounded-full">
                                <LiaTruckMovingSolid size={25} className="text-white"/>
                            </div>
                            <div>
                                <h5 className="border-b-[1px] pb-[1px] mb-1 text-black font-inter text-sm font-bold leading-normal">Nation Wide Shipping</h5>
                                <p className="text-[#00000080] text-[11px] font-medium leading-[14px] mb-[2px]">Inside Dhaka Within 3 Days</p>
                                <p className="text-[#00000080] text-[11px] font-medium leading-[14px]">Outside Dhaka Within 5 Days</p>
                            </div>
                        </div>
                        {/* per item end */}
                        {/* per item start */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary-color p-3 rounded-full">
                                <TbCertificate size={25} className="text-white"/>
                            </div>
                            <div>
                                <h5 className="border-b-[1px] pb-[1px] mb-1 text-black font-inter text-sm font-bold leading-normal">Secure Payment Method</h5>
                                <p className="text-[#00000080] text-[11px] font-medium leading-[14px] mb-[2px]">100% secure online payment method</p>
                            </div>
                        </div>
                        {/* per item end */}
                        {/* per item start */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary-color p-3 rounded-full">
                                <SlBadge size={25} className="text-white"/>
                            </div>
                            <div>
                                <h5 className="border-b-[1px] pb-[1px] mb-1 text-black font-inter text-sm font-bold leading-normal">100% Authentic</h5>
                                <p className="text-[#00000080] text-[11px] font-medium leading-[14px] mb-[2px]">Products Sourced Directly</p>
                            </div>
                        </div>
                        {/* per item end */}
                        {/* per item start */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary-color p-3 rounded-full">
                                <TbTag size={25} className="text-white"/>
                            </div>
                            <div>
                                <h5 className="border-b-[1px] pb-[1px] mb-1 text-black font-inter text-sm font-bold leading-normal">250 + Brands</h5>
                                <p className="text-[#00000080] text-[11px] font-medium leading-[14px] mb-[2px]">2000 + Products</p>
                            </div>
                        </div>
                        {/* per item end */}
                        {/* per item start */}
                        <div className="flex items-start gap-3 mx-auto">
                            {/* <div className="bg-primary-color p-3 rounded-full">
              <TbTag size={25} className="text-white" />
            </div> */}
                            {}
                            <div>
                                <h5 className="pb-[1px] mb-1 md:mb-3 text-black font-inter text-sm font-bold leading-normal whitespace-nowrap">
                                    Show us some love ❤ on social media
                                </h5>
                                <div className="flex justify-evenly items-center">
                                    {getContactQuery?.status && getContactQuery?.data?.facebook_link && (
                                        <a href={getContactQuery?.data?.facebook_link} target="_blank" rel="noreferrer">
                                            <div className="bg-primary-color p-2 rounded-full hover:cursor-pointer">
                                                <FaFacebookF size={15} className="text-white"/>
                                            </div>
                                        </a>
                                    )}
                                    {getContactQuery?.status && getContactQuery?.data?.twitter_link && (
                                        <a href={getContactQuery?.data?.twitter_link} target="_blank" rel="noreferrer">
                                            <div className="bg-primary-color p-2 rounded-full hover:cursor-pointer">
                                                <FaTwitter size={15} className="text-white"/>
                                            </div>
                                        </a>
                                    )}
                                    {getContactQuery?.status && getContactQuery?.data?.instagram_link && (
                                        <a href={getContactQuery?.data?.instagram_link} target="_blank" rel="noreferrer">
                                            <div className="bg-primary-color p-2 rounded-full hover:cursor-pointer">
                                                <SiInstagram size={15} className="text-white"/>
                                            </div>
                                        </a>
                                    )}
                                    {getContactQuery?.status && getContactQuery?.data?.youtube_link && (
                                        <a href={getContactQuery?.data?.youtube_link} target="_blank" rel="noreferrer">
                                            <div className="bg-primary-color p-2 rounded-full hover:cursor-pointer">
                                                <IoLogoYoutube size={15} className="text-white"/>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* per item end */}
                    </div>
                </div>
            }
            {/* bottom footer end */}
            {/* privacy and copyright start */}
            <div className="bg-primary-color py-4 px-2">
                <div className="flex justify-center items-center gap-8 mb-4">
                    <Link to="/terms-and-condition">
                        <p className="text-white text-[10px] font-medium leading-normal tracking-[0.2px] text-center hover:cursor-pointer">Terms & Conditions</p>
                    </Link>
                    <Link to="/shipping-policies">
                        <p className="text-white text-[10px] font-medium leading-normal tracking-[0.2px] text-center hover:cursor-pointer">Shipping Policy</p>
                    </Link>
                    <Link to="/cancellation-policies">
                        <p className="text-white text-[10px] font-medium leading-normal tracking-[0.2px] text-center hover:cursor-pointer">Cancellation Policy</p>
                    </Link>
                    {/*<Link to="/privacy-policies">*/}
                    {/*    <p className="text-white text-[10px] font-medium leading-normal tracking-[0.2px] text-center hover:cursor-pointer">Privacy Policy</p>*/}
                    {/*</Link>*/}
                </div>
                <div>
                    <p className="text-white text-[10px] font-medium leading-normal tracking-[0.2px] text-center">
                        © {new Date().getFullYear()} GlowCart. All Rights Reserved.
                    </p>
                </div>
            </div>
            {/* privacy and copyright end */}
        </div>
    );
};

export default Footer;
