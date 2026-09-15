/* eslint-disable react/prop-types */
import React from "react";
import {Link} from "react-router-dom";
import {twMerge} from "tailwind-merge";

const MainButton = ({title, icon, to, type, handleSubmit, className}) => {
    return (
        <>
            <Link to={to}>
                <button
                    type={type === "submit" ? "submit" : "button"} // Set type to "submit" if type prop exists, otherwise default to "button"
                    className={twMerge(
                        "btn bg-[#5DC9F4] py-[14px] rounded-[4px] text-white text-[14px] font-semibold leading-5 whitespace-nowrap",
                        className
                    )}
                    onClick={handleSubmit && (() => handleSubmit())} // Conditionally attach onClick handler
                >
                    {icon ? (
                        <span className="flex gap-1">
                            {title}
                            {icon}
                        </span>
                    ) : (
                        <span> {title}</span>
                    )}
                </button>
            </Link>
        </>
    );
};

export default MainButton;
