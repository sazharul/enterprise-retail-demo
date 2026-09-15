/* eslint-disable react/prop-types */
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import "./Breadcrumbs.css";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Breadcrumbs = ({ first, second, secondLink, third, thirdLink, className, isShadow }) => {
    const location = useLocation();
    const isCategory = location.pathname.includes("category");
    return (
        <div className={twMerge("text-sm w-full overflow-x-auto scrollbar-hide text-black", className)}>
            <ul className={`${isCategory && "shadow"} ${isShadow && "shadow"} flex items-center gap-x-2 whitespace-nowrap min-h-min`}>
                {first && (
                    <Link to={"/"}>
                        <li className="text-xs font-normal tracking-[-0.12px] hover:cursor-pointer">
                            {/* <span className="text-black">{first}</span> */}
                            <span className="text-black">Home</span>
                        </li>
                    </Link>
                )}
                {second && (
                    <>
                        <li className=" text-xs font-normal tracking-[-0.12px] hover:cursor-pointer">
                            <AiOutlineRight size={8} />
                        </li>
                        <Link to={secondLink}>
                            <li className="opacity-80 text-[#00000099] text-xs font-normal tracking-[-0.12px]">{second}</li>
                        </Link>
                    </>
                )}
                {third && (
                    <>
                        <li className=" text-xs font-normal tracking-[-0.12px] hover:cursor-pointer">
                            <AiOutlineRight size={8} />
                        </li>
                        <Link to={thirdLink}>
                            <li className="opacity-80 text-[#00000099] text-xs font-normal tracking-[-0.12px]">{third}</li>
                        </Link>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
