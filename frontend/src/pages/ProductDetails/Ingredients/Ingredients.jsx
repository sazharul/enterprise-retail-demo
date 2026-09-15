/* eslint-disable react/prop-types */
import React from "react";
import ImageURL from "../../../components/ImageURL/ImageURL";

const Ingredients = ({ingredient_description}) => {
    return (
        <div className="p-2 md:p-5">
            <div className=" text-[#000000] text-sm font-medium leading-5">
                {ingredient_description && <div dangerouslySetInnerHTML={{__html: ingredient_description}}/>}
            </div>
        </div>
    );
};

export default Ingredients;
