import React, {useState} from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ImageURL from "../../components/ImageURL/ImageURL";
import BuyingGuides1 from "../../assets/BuyingGuides/BuyingGuides1.png";
import BuyingGuides2 from "../../assets/BuyingGuides/BuyingGuides2.jpg";
import BuyingGuides3 from "../../assets/BuyingGuides/BuyingGuides3.png";
import BuyingGuides4 from "../../assets/BuyingGuides/BuyingGuides4.jpg";
import BuyingGuides5 from "../../assets/BuyingGuides/BuyingGuides5.jpg";
import BuyingGuides6 from "../../assets/BuyingGuides/BuyingGuides6.jpg";
import BuyingGuides7 from "../../assets/BuyingGuides/BuyingGuides7.png";
import BuyingGuides8 from "../../assets/BuyingGuides/BuyingGuides8.png";
import BuyingGuides9 from "../../assets/BuyingGuides/BuyingGuides9.png";
import bgRight from "../../assets/BuyingGuides/bgRight.png";
import bgLeft from "../../assets/BuyingGuides/bgLeft.png";
import Button from "../../components/ui/Button";
import {twMerge} from "tailwind-merge";
import {ScrollRestoration} from "react-router-dom";
import {useGetBuyingGuidesQuery} from "../../redux/features/buyingGuides/buyingGuidesApi";
import {Bars} from "react-loader-spinner";

const BuyingGuides = () => {
    const [current, setCurrent] = useState(3);
    const onChange = (page) => {
        setCurrent(page);
    };
    const paginationStyles = {
        borderRadius: "20px", // Adjust the border-radius value as needed
    };

    const {data: getBuyingGuidesQuery, isLoading: buyingGuidesQueryIsLoading} = useGetBuyingGuidesQuery();

    if (buyingGuidesQueryIsLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }
    return (
        <div className="mb-10 md:mb-20">
            <div className="container mx-auto px-[10px] ">
                <Breadcrumbs className={"mt-4 mb-2"} first={"Home"} second={"Buying Guides"}/>
            </div>
            <h4 className="font-semibold text-xl md:text-3xl text-center mb-3 md:mb-8">Buying Guides</h4>
            <>
                {getBuyingGuidesQuery?.status == true &&
                    getBuyingGuidesQuery?.data?.map((item, i) => (
                        <div
                            key={i}
                            style={{
                                backgroundImage: `url("${i % 2 !== 0 ? bgRight : bgLeft}")`,
                            }}
                            className={twMerge(`bg-contain  ${i % 2 !== 0 ? "bg-right" : "bg-left"} object-cover bg-no-repeat w-full h-full mx-auto mb-5 md:mb-8`)}
                        >
                            <div className={`container mx-auto px-[10px] flex flex-col ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} justify-center items-center gap-2 md:gap-8`}>
                                <div className="md:w-7/12">
                                    <ImageURL className={" max-h-full w-full"} image={item?.image}/>
                                </div>
                                <div className="md:w-5/12">
                                    <div className="flex justify-end">
                                        <Button className="rounded-full py-2 px-5 mb-3 md:mb-8 flex">Step 0{i + 1}</Button>
                                    </div>
                                    <h5 className="text-black font-Inter text-right text-2xl font-semibold leading-tight mb-1">{item?.title}</h5>
                                    <p className="text-[#000000BF] font-Inter text-right text-base font-medium leading-6">{item?.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </>
            {/* per step start */}

            {/* <div
                style={{
                    backgroundImage: `url("${bgRight}")`,
                }}
                className={twMerge(`bg-contain bg-right object-cover bg-no-repeat w-full h-full mx-auto mb-5 md:mb-8`)}
            >
                <div className="container mx-auto px-[10px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
                    <div className="md:w-7/12">
                        <ImageURL className={" max-h-full w-full"} image={BuyingGuides1} />
                    </div>
                    <div className="md:w-5/12">
                        <Button className="rounded-full py-2 px-5 mb-3 md:mb-8 ">Step 01</Button>
                        <h5 className="text-black font-Inter text-2xl font-semibold leading-tight mb-1">To buy products from GlowCart, Open GlowCart’s website</h5>
                        <p className="text-[#000000BF] font-Inter text-base font-medium leading-6">
                            To access GlowCart's online store, first click on GlowCart Online Store or type this URL (glowcart.demo) into the browser's address bar and hit Enter.{" "}
                        </p>
                    </div>
                </div>
            </div> */}
            {/* per step end */}
            {/* per step start */}

            {/* <div
                style={{
                    backgroundImage: `url("${bgLeft}")`,
                }}
                className={twMerge(`bg-contain bg-left object-cover bg-no-repeat w-full h-full mx-auto mb-5 md:mb-8`)}
            >
                <div className="container mx-auto px-[10px] flex flex-col md:flex-row-reverse justify-center items-center gap-2 md:gap-8">
                    <div className="md:w-7/12">
                        <ImageURL className={" max-h-full w-full"} image={BuyingGuides2} />
                    </div>
                    <div className="md:w-5/12">
                        <div className="flex justify-end">
                            <Button className="rounded-full py-2 px-5 mb-3 md:mb-8 flex">Step 02</Button>
                        </div>
                        <h5 className="text-black font-Inter text-right text-2xl font-semibold leading-tight mb-1">Enhance your beauty with world famous brand from GlowCart </h5>
                        <p className="text-[#000000BF] font-Inter text-right text-base font-medium leading-6">We focus on sourcing and distribute affordable new products of world famous brand from the very fast moving beauty world.</p>
                    </div>
                </div>
            </div> */}
            {/* per step end */}
            {/* per step start */}

            {/* <div
                style={{
                    backgroundImage: `url("${bgRight}")`,
                }}
                className={twMerge(`bg-contain bg-right object-cover bg-no-repeat w-full h-full mx-auto mb-5 md:mb-8`)}
            >
                <div className="container mx-auto px-[10px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
                    <div className="md:w-7/12">
                        <ImageURL className={" max-h-full w-full"} image={BuyingGuides3} />
                    </div>
                    <div className="md:w-5/12">
                        <Button className="rounded-full py-2 px-5 mb-3 md:mb-8 ">Step 03</Button>
                        <h5 className="text-black font-Inter text-2xl font-semibold leading-tight mb-1">Menu for category & Subcategory </h5>
                        <p className="text-[#000000BF] font-Inter text-base font-medium leading-6">
                            The categories for makeup, hair, beauty products, and babies are shown below. You can choose the product of your choosing, which is separated into multiple subcategories, by clicking this link. In addition, if you type the
                            name of the product you wish to purchase into the search field, it will appear.
                        </p>
                    </div>
                </div>
            </div> */}
            {/* per step end */}
            {/* per step start */}

            {/* <div
                style={{
                    backgroundImage: `url("${bgLeft}")`,
                }}
                className={twMerge(`bg-contain bg-right object-cover bg-no-repeat w-full h-full mx-auto mb-5 md:mb-8`)}
            >
                <div className="container mx-auto px-[10px] flex flex-col md:flex-row-reverse justify-center items-center gap-2 md:gap-8">
                    <div className="md:w-7/12">
                        <ImageURL className={" max-h-full w-full"} image={BuyingGuides4} />
                    </div>
                    <div className="md:w-5/12">
                        <div className="flex justify-end">
                            <Button className="rounded-full py-2 px-5 mb-3 md:mb-8 ">Step 04</Button>
                        </div>
                        <h5 className="text-black text-end font-Inter text-2xl font-semibold leading-tight mb-1">Brand Menu </h5>
                        <p className="text-[#000000BF] text-end font-Inter text-base font-medium leading-6">We focus on sourcing and distribute affordable new products of world famous brand from the very fast moving beauty world.</p>
                    </div>
                </div>
            </div> */}
            {/* per step end */}
            {/* per step start */}

            {/* <div
                style={{
                    backgroundImage: `url("${bgRight}")`,
                }}
                className={twMerge(`bg-contain bg-right object-cover bg-no-repeat w-full h-full mx-auto mb-5 md:mb-8`)}
            >
                <div className="container mx-auto px-[10px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
                    <div className="md:w-7/12">
                        <ImageURL className={" max-h-full w-full"} image={BuyingGuides5} />
                    </div>
                    <div className="md:w-5/12">
                        <Button className="rounded-full py-2 px-5 mb-3 md:mb-8 ">Step 05</Button>
                        <h5 className="text-black font-Inter text-2xl font-semibold leading-tight mb-1">Single Product </h5>
                        <p className="text-[#000000BF] font-Inter text-base font-medium leading-6">
                            Your go-to neutral lipstick has changed! In one swipe, the creamy, permanent quality offers you lips that are worthy of a pout. It applies to your lips with such ease, leaving you with a gorgeously smooth matte finish.
                            Embrace the occasion and pucker up with our delicious matte lipstick. Haha!
                        </p>
                    </div>
                </div>
            </div> */}
            {/* per step end */}
            {/* per step start */}
            {/*
            <div
                style={{
                    backgroundImage: `url("${bgLeft}")`,
                }}
                className={twMerge(`bg-contain bg-left object-cover bg-no-repeat w-full h-full mx-auto mb-5 md:mb-8`)}
            >
                <div className="container mx-auto px-[10px] flex flex-col md:flex-row-reverse justify-center items-center gap-2 md:gap-8">
                    <div className="md:w-7/12">
                        <ImageURL className={" max-h-full w-full"} image={BuyingGuides6} />
                    </div>
                    <div className="md:w-5/12">
                        <div className="flex justify-end">
                            <Button className="rounded-full py-2 px-5 mb-3 md:mb-8 ">Step 06</Button>
                        </div>
                        <h5 className="text-black text-end font-Inter text-2xl font-semibold leading-tight mb-1">Cart View </h5>
                        <p className="text-[#000000BF] text-end font-Inter text-base font-medium leading-6">
                            A window similar to the one in the above image will appear after selecting the Add To Card option. You must select the Proceed To Checkout option from the two alternatives that appear in this box.
                        </p>
                    </div>
                </div>
            </div> */}
            {/* per step end */}
            {/* per step start */}

            {/* <div
                style={{
                    backgroundImage: `url("${bgRight}")`,
                }}
                className={twMerge(`bg-contain bg-right object-cover bg-no-repeat w-full h-full mx-auto mb-5 md:mb-8`)}
            >
                <div className="container mx-auto px-[10px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
                    <div className="md:w-7/12">
                        <ImageURL className={" max-h-full w-full"} image={BuyingGuides7} />
                    </div>
                    <div className="md:w-5/12">
                        <Button className="rounded-full py-2 px-5 mb-3 md:mb-8 ">Step 07</Button>
                        <h5 className="text-black font-Inter text-2xl font-semibold leading-tight mb-1">Login page </h5>
                        <p className="text-[#000000BF] font-Inter text-base font-medium leading-6">Open your account and log in. Not yet a member? Make a profile. Email address. The password. You misplaced your password. Log in. or sign in</p>
                    </div>
                </div>
            </div> */}
            {/* per step end */}
            {/* per step start */}

            {/* <div
                style={{
                    backgroundImage: `url("${bgLeft}")`,
                }}
                className={twMerge(`bg-contain bg-left object-cover bg-no-repeat w-full h-full mx-auto mb-5 md:mb-8`)}
            >
                <div className="container mx-auto px-[10px] flex flex-col md:flex-row-reverse justify-center items-center gap-2 md:gap-8">
                    <div className="md:w-7/12">
                        <ImageURL className={" max-h-full w-full"} image={BuyingGuides8} />
                    </div>
                    <div className="md:w-5/12">
                        <div className="flex justify-end">
                            <Button className="rounded-full py-2 px-5 mb-3 md:mb-8 ">Step 08</Button>
                        </div>
                        <h5 className="text-black text-end font-Inter text-2xl font-semibold leading-tight mb-1">Checkout page </h5>
                        <p className="text-[#000000BF] text-end font-Inter text-base font-medium leading-6">We focus on sourcing and distribute affordable new products of world famous brand from the very fast moving beauty world.</p>
                    </div>
                </div>
            </div> */}
            {/* per step end */}
            {/* per step start */}

            {/* <div
                style={{
                    backgroundImage: `url("${bgRight}")`,
                }}
                className={twMerge(`bg-contain bg-right object-cover bg-no-repeat w-full h-full mx-auto mb-5 md:mb-8`)}
            >
                <div className="container mx-auto px-[10px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
                    <div className="md:w-7/12">
                        <ImageURL className={" max-h-full w-full"} image={BuyingGuides9} />
                    </div>
                    <div className="md:w-5/12">
                        <Button className="rounded-full py-2 px-5 mb-3 md:mb-8 ">Step 09</Button>
                        <h5 className="text-black font-Inter text-2xl font-semibold leading-tight mb-1">My Orders </h5>
                        <p className="text-[#000000BF] font-Inter text-base font-medium leading-6">
                            Upon selecting Final CHECKOUT, a page resembling a form will appear. You must enter all of the information here. Keep in mind that your address needs to be accurate. Complete all the fields and select the "Save" button to
                            proceed.
                        </p>
                    </div>
                </div>
            </div> */}
            {/* per step end */}
            <ScrollRestoration/>
        </div>
    );
};

export default BuyingGuides;
