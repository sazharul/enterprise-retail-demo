import React, {useState} from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import BeautyAdviceCard from "../../components/allCards/BeautyAdviceCard/BeautyAdviceCard";
import {Pagination} from "antd";
import {ScrollRestoration} from "react-router-dom";
import useBeautyAdviceBlog from "../../hooks/useBeautyAdviceBlog";
import {Bars} from "react-loader-spinner";

const BeautyAdvice = () => {
    const [current, setCurrent] = useState(3);

    const {blogData, isLoading} = useBeautyAdviceBlog();
    const onChange = (page) => {
        setCurrent(page);
    };
    const paginationStyles = {
        borderRadius: "20px", // Adjust the border-radius value as needed
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-[10px] mb-10 md:mb-20">
            <Breadcrumbs className={"mt-2 md:mt-5"} first={"Home"} second={"Beauty Advice"}/>

            <h4 className="font-semibold text-xl md:text-3xl text-center mb-3">Beauty Advice</h4>
            <div className="bg-[#FFF2F799] p-2 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {blogData.status === true && blogData?.data.map((blog, index) => <BeautyAdviceCard key={index} {...blog} blog={blog}/>)}

                    {/* <BeautyAdviceCard />
                    <BeautyAdviceCard />
                    <BeautyAdviceCard />
                    <BeautyAdviceCard />
                    <BeautyAdviceCard />
                    <BeautyAdviceCard /> */}
                </div>
                {/* <div className="w-full my-5 lg:my-14 flex flex-col gap-y-2 md:flex-row justify-between items-center">
                    <p className="text-sm font-medium">Page 1 of 20</p>
                    <Pagination current={current} onChange={onChange} total={50} style={paginationStyles} />
                    <p></p>
                </div> */}
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default BeautyAdvice;
