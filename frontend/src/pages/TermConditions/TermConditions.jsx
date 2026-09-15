import React from "react";
import {Bars} from "react-loader-spinner";
import {ScrollRestoration} from "react-router-dom";
import {useTermConditionQuery} from "../../redux/features/companyPolicy/companyPolicyApi";

const TermConditions = () => {
    const {data: termConditionQuery, isLoading: termConditionQueryLoading} = useTermConditionQuery()

    if (termConditionQueryLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }
    return (
        <div className="container mx-auto px-[10px] md:mt-10 min-h-[calc(100vh-50vh)]">
            {
                termConditionQuery?.status == true && <div dangerouslySetInnerHTML={{__html: termConditionQuery?.data?.document}}/>
            }
            <ScrollRestoration/>
        </div>
    );
};

export default TermConditions;
