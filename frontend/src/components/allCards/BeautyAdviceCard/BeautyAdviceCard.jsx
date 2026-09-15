/* eslint-disable react/prop-types */
import React from "react";
import ImageURL from "../../ImageURL/ImageURL";
import cardImg from "../../../assets/BeautyAdviceCard/Rectangle 4039.png";
import {Link} from "react-router-dom";
import moment from "moment";

const BeautyAdviceCard = ({blog}) => {
    return (
        <>
            <Link to={`/beauty-advice-details/${blog?.id}`}>
                <div className="bg-white hover:cursor-pointer" style={{boxShadow: "0px 2px 6px 0px rgba(12, 107, 144, 0.06)"}}>
                    <div className="w-full">
                        <ImageURL className={" max-h-full w-full object-center min-h-[200px]"} image={blog?.image}/>
                    </div>
                    <div className="p-4">
                        <p className="text-sm font-medium mb-2 md:mb-4">{moment(blog?.created_at).format("MMM DD, YYYY")}</p>
                        <p className="text-black font-Inter text-lg font-medium leading-6  mb-2 md:mb-4">{blog?.title}</p>
                        {blog?.description && (
                            <div
                                className="text-black font-Inter text-xs font-medium leading-5 border-b-[1px] pb-2 mb-2 md:mb-4"
                                dangerouslySetInnerHTML={{
                                    __html: blog.description.length > 150 ? `${blog.description.slice(0, 150)}...` : blog.description,
                                }}
                            />
                        )}

                        <p className="text-[#000000A6] font-Inter text-sm font-medium leading-6">
                            Posted by <span className="text-[#000000CC] font-bold">GlowCart</span>
                        </p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default BeautyAdviceCard;
