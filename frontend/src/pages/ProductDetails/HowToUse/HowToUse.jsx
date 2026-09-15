/* eslint-disable react/prop-types */
import React from "react";
import ImageURL from "../../../components/ImageURL/ImageURL";

const HowToUse = ({how_to_use}) => {
    return (
        <div className="p-2 md:p-5">
            <div className="text-[#000000] list-disc  text-sm font-medium leading-5">
                {how_to_use && <div dangerouslySetInnerHTML={{__html: how_to_use}}/>}
            </div>
        </div>
    );
};

export default HowToUse;
