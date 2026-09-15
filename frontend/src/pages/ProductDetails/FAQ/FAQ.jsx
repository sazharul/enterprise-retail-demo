/* eslint-disable react/prop-types */
import React from "react";
import ImageURL from "../../../components/ImageURL/ImageURL";

const FAQ = ({faq}) => {
    return (
        <div className="p-2 md:p-5">
            <div className=" text-[#000000] list-disc text-sm font-medium leading-5">
                {faq && <div dangerouslySetInnerHTML={{__html: faq}}/>}
            </div>
            {/* <ul className="text-[#000000] list-disc p-2 md:p-5 text-sm font-medium leading-5">
                <li>Start from the centre of your upper lip and move outwards</li>
                <li>Follow the contours of your lips carefully</li>
                <li>Swipe the lipstick across your bottom lip and get ready to shine</li>
            </ul> */}
        </div>
    );
};

export default FAQ;
