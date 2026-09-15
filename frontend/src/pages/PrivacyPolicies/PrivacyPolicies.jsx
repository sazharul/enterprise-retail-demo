import React from "react";
import {Bars} from "react-loader-spinner";
import {ScrollRestoration} from "react-router-dom";
import {usePrivacyPolicyQuery} from "../../redux/features/companyPolicy/companyPolicyApi";

const PrivacyPolicies = () => {
    const {data, isLoading} = usePrivacyPolicyQuery()

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-55vh)]">
                <Bars height="40" width="80" color="#5DC9F4" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div>
        );
    }
    return (
        <div className="container mx-auto px-[10px] md:mt-10 min-h-[calc(100vh-50vh)]">
            {
                data?.status == true && <div dangerouslySetInnerHTML={{__html: data?.data?.document}}/>
            }
            <ScrollRestoration/>
        </div>
    );
};

export default PrivacyPolicies;
