import {RightOutlined} from "@ant-design/icons";
import {Collapse} from "antd";
import React from "react";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import {ScrollRestoration} from "react-router-dom";
import {useGetFAQQuery} from "../../redux/features/faqs/faqsApi";
import {Bars} from "react-loader-spinner";

const text = `
– GlowCart brings 100% genuine high end & drugstore products which are directly sourced from the brands & authorized distributors for our customers.
`;

const FrequentlyAskedQuestions = () => {
    const {data: getFAQQuery, isLoading} = useGetFAQQuery();
    // 
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars
                    height="40"
                    width="80"
                    color="#5DC9F4"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }
    return (
        <div className="container mx-auto px-[10px] mb-10 md:mb-20">
            <div className="flex justify-center my-3 md:my-6">
                <h3 className="text-black font-inter text-xl font-semibold leading-normal">Frequently Asked Questions</h3>
            </div>
            <div style={{boxShadow: "0px 0px 24px 0px rgba(228, 237, 240, 0.65)"}} className=" bg-[#FFF] rounded-lg flex justify-center">
                <div className="w-full xs:w-10/12 pt-2 pb-4 px-2">
                    {getFAQQuery?.status && getFAQQuery?.data?.map((item, i) => <div key={i} className="border-b-[1px]">
                        <Collapse
                            bordered={false}
                            size="small"
                            className="bg-white"
                            items={[
                                {
                                    key: "1",
                                    label: <p className="text-black font-inter text-base font-semibold leading-normal">{item?.question}</p>,
                                    children: <p className="text-[#000000A6] font-inter text-sm font-medium leading-5">{item?.answer}</p>,
                                },
                            ]}
                            expandIcon={({isActive}) => <RightOutlined rotate={isActive ? 90 : 0}/>}
                            expandIconPosition="end"
                        />
                    </div>)

                    }

                    {/* <div className="border-b-[1px]">
                        <Collapse
                            bordered={false}
                            size="small"
                            className="bg-white"
                            items={[
                                {
                                    key: "1",
                                    label: (
                                        <p className="text-black font-inter text-base font-semibold leading-normal">How do I place order at GlowCart Store?</p>
                                    ),
                                    children: <p className="text-[#000000A6] font-inter text-sm font-medium leading-5">{text}</p>,
                                },
                            ]}
                            expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}
                            expandIconPosition="end"
                        />
                    </div> */}
                </div>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default FrequentlyAskedQuestions;
