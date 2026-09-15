/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge";
import "./BrandCard.scss";
import ImageURL from "../../ImageURL/ImageURL";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BrandCard = ({ className, item }) => {
    return (
        <>
            <Link
                to={
                    item?.type === "Category"
                        ? `/product-filter?category=${item?.category?.slug}`
                        : item?.type === "Brand"
                        ? `/product-filter?brand=${item?.brand?.slug}`
                        : item?.type === "Offer"
                        ? `/campaign/${item?.offers?.id}`
                        : item?.type === "SubCategory"
                        ? `/product-filter/sub-category/${item?.sub_category?.slug}`
                        : item?.type === "ChildCategory"
                        ? `/product-filter/child-category/${item?.child_category?.slug}`
                        : "#"
                }
            >
                <div className={twMerge("brand-card overflow-hidden hover:cursor-pointer", className)}>
                    <div className="image min-h-[140px] overflow-hidden">
                        <ImageURL className={"hover:scale-[104%] h-full w-full  transition-all duration-[0.5s] object-cover"} image={item?.image} />
                    </div>
                    <div>
                        <h4>{item?.name}</h4>
                        <p>{item?.description}</p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default BrandCard;
