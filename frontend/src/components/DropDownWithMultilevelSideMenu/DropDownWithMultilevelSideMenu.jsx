import React, {useState} from "react";
import {useForm} from "react-hook-form";
import NavbarHoverIcon from "../../assets/NavbarHoverIcon/NavbarHoverIcon.svg";
import {Link} from "react-router-dom";
import "./DropDownWithMultilevelSideMenu.scss";

const DropDownWithMultilevelSideMenu = ({
                                            categories,
                                            isBrandOpen,
                                            setIsBrandOpen,
                                        }) => {
    //

    return (
        <div className="h-10">
            {/* <div className={`absolute  w-full flex justify-center ${isBrandOpen ? "block" : "hidden"}`}>
                <img src={NavbarHoverIcon} alt="" />
            </div>
            <div className="hover:cursor-pointer relative">
                <h5 className={`hover:cursor-pointer py-3 px-2 text-center text-sm font-medium leading-normal tracking-tighter ${isBrandOpen ? "text-[#5DC9F4]" : "text-[#000000A6]"}`}>{title}</h5>
            </div> */}

            <div
                style={{boxShadow: "0px 4px 20px 0px rgba(36, 52, 58, 0.10)"}}
                className={`md:w-[758px] lg:w-[1016px] xl:w-[1270px] 2xl:w-[1526px] absolute z-10 flex top-11 left-0 rounded slim-scroll max-h-[calc(100vh-150px)] overflow-hidden overflow-y-auto bg-white ${
                    isBrandOpen ? "block" : "hidden"
                } `}
            >
                {/* menu Items start */}
                <div className="grid grid-cols-4 lg:grid-cols-6 w-full">
                    {categories?.subcategory?.map((items, i) => (
                        <div
                            key={i}
                            onClick={() => setIsBrandOpen(false)}
                            className="px-5 backgroundColor"
                        >
                            <Link to={`/product-filter/sub-category/${items?.slug}`}>
                                <h5 className="my-4 text-black  text-lg font-medium leading-normal hover:cursor-pointer">
                                    {items?.name}
                                </h5>
                            </Link>
                            <div className="mt-2 mb-5 h-[calc(100vh-70vh)] overflow-hidden overflow-y-auto slim-scroll">
                                {items?.subcategory?.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={`/product-filter/child-category/${item?.slug}`}
                                    >
                                        <p className="text-[#00000080] text-sm font-normal leading-normal hover:cursor-pointer mb-2">
                                            {item?.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* menu Items end */}
            </div>
        </div>
    );
};

export default DropDownWithMultilevelSideMenu;
