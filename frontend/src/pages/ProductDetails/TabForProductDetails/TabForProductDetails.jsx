/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Description from "../Description/Description";
import Ingredients from "../Ingredients/Ingredients";
import HowToUse from "../HowToUse/HowToUse";
import FAQ from "../FAQ/FAQ";
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";

const TabForProductDetails = ({productDetails}) => {
    const [isReadMore, setIsReadMore] = useState(false);
    const location = useLocation();
    const {id} = useParams();
    const [selectedTabChange, setSelectedTabChange] = useState("Description");

    useEffect(() => {
        // Get the existing search parameters
        const searchParams = new URLSearchParams(location.search);
        const selectedTabChangeValue = searchParams.get("open_tab");

        // Set the initial state based on the URL parameters
        setSelectedTabChange(selectedTabChangeValue || "Description");
    }, [location.search]);

    const handleSelectedTabChange = (title) => {
        // Get the existing search parameters
        const searchParams = new URLSearchParams(window.location.search);

        // Update the 'open_tab' parameter
        searchParams.set("open_tab", title);

        // Update the URL without reloading the page or scrolling to the top
        window.history.replaceState(null, '', `/product/${id}?${searchParams.toString()}`);

        // Update the component state
        setSelectedTabChange(title);
    };

    return (
        <div
            className="rounded w-full"
            style={{boxShadow: "0px 0px 6px 0px #E4EDF0"}}
        >
            {/* header start */}
            <div className="border-b-[1px] flex items-center gap-8  ps-5 overflow-hidden overflow-x-auto slim-scroll">
                <p
                    onClick={() => handleSelectedTabChange("Description")}
                    className={`text-[#000000A6] text-sm font-medium leading-5 py-4 hover:cursor-pointer ${
                        selectedTabChange === "Description" &&
                        "border-b-primary-color py-[15px] text-black"
                    }`}
                >
                    Description
                </p>
                <p
                    onClick={() => handleSelectedTabChange("Ingredients")}
                    className={`text-[#000000A6] text-sm font-medium leading-5 py-4 hover:cursor-pointer ${
                        selectedTabChange === "Ingredients" &&
                        "border-b-primary-color py-[15px] text-black"
                    }`}
                >
                    Ingredients
                </p>
                <p
                    onClick={() => handleSelectedTabChange("How to Use")}
                    className={`text-[#000000A6] text-sm font-medium leading-5 py-4 hover:cursor-pointer whitespace-nowrap ${
                        selectedTabChange === "How to Use" &&
                        "border-b-primary-color py-[15px] text-black"
                    }`}
                >
                    How to Use
                </p>
                <p
                    onClick={() => handleSelectedTabChange("FAQ")}
                    className={`text-[#000000A6] text-sm font-medium leading-5 py-4 pe-4 hover:cursor-pointer ${
                        selectedTabChange === "FAQ" &&
                        "border-b-primary-color py-[15px] text-black"
                    }`}
                >
                    FAQ
                </p>
            </div>
            {/* header end*/}
            {/* body start */}
            <div>
                <div
                    className={`${isReadMore ? "h-full" : "max-h-56"} overflow-hidden`}
                >
                    {selectedTabChange === "Description" && (
                        <Description description={productDetails?.description}/>
                    )}
                    {selectedTabChange === "Ingredients" && (
                        <Ingredients
                            ingredient_description={productDetails?.ingredient_description}
                        />
                    )}
                    {selectedTabChange === "How to Use" && (
                        <HowToUse how_to_use={productDetails?.how_to_use}/>
                    )}
                    {selectedTabChange === "FAQ" && <FAQ faq={productDetails?.faq}/>}
                </div>

                {/* read more button start */}
                {(selectedTabChange === "Description" && productDetails?.description?.length > 50) ||
                (selectedTabChange === "Ingredients" && productDetails?.ingredient_description?.length > 50) ||
                (selectedTabChange === "How to Use" && productDetails?.how_to_use?.length > 50) ||
                (selectedTabChange === "FAQ" && productDetails?.faq?.length > 50) ? (
                    <div className="border-t-[1px] py-3 flex items-center justify-center gap-2 text-black text-center text-sm font-semibold leading-5">
                        {isReadMore ? (
                            <div
                                onClick={() => setIsReadMore(false)}
                                className="flex items-center gap-2 hover:cursor-pointer"
                            >
                                <p className="text-center">Read Less</p>
                                <FaAngleUp/>
                            </div>
                        ) : (
                            <div
                                onClick={() => setIsReadMore(true)}
                                className="flex items-center gap-2 hover:cursor-pointer"
                            >
                                <p className="text-center">Read More</p>
                                <FaAngleDown/>
                            </div>
                        )}
                    </div>
                ) : null}

                {/* read more button end */}
            </div>
            {/* body end*/}
        </div>
    );
};

export default TabForProductDetails;
