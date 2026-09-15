import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa6";
import { SearchSelectLabelLess } from "../../../components/SearchSelectLabelLess/SearchSelectLabelLess";
import Button from "../../../components/ui/Button";
import {Bars} from "react-loader-spinner";
import axios from "axios";

const ReturnAndCancel = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [returnRefundPolicy, setReturnRefundPolicy] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                const response = await axios.get('/returnrefund');
                if (response.data.status) {
                    setReturnRefundPolicy(response.data.data.document);
                } else {
                    console.error("Failed to retrieve policy");
                }
            } catch (error) {
                console.error("Error fetching policy:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicy();
    }, []);

    const onSubmit = (data) => {
        // Handle form submission here
    };

    if (loading) {
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
        <>
            <div style={{ boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)" }} className="rounded-lg bg-white">
                <div className="py-3 ps-3 md:py-5 md:ps-8 border-b-[0.5px] border-[#ECECEC]">
                    <h3 className="text-black text-opacity-80 font-inter text-xl lg:text-2xl font-semibold leading-[33.5px]">
                        Return & Refund Policy
                    </h3>
                </div>

                <div className="pt-3 px-3 md:mb-3 md:pt-6 md:px-8 pb-10">
                    <div dangerouslySetInnerHTML={{ __html: returnRefundPolicy }}></div>
                </div>
            </div>
        </>
    );
};

export default ReturnAndCancel;