import React from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const SecondNavBar = ({title}) => {
    return (
        <div
            // style={{
            //     background: "linear-gradient(5deg, #D4F3FF 3.89%, #D4F3FF 88.53%)",
            // }}
            className="h-28 w-full bg-cover md:p-0 back bg-[#D4F3FF]"
        >
            <div className="flex pt-4 container mx-auto h-full">
                <div className="mx-2 md:mx-3">
                    <div className="mb-5">
                        <Breadcrumbs first={"Home"} second={"My Account"} secondLink={"/my-account/my-profile"}/>
                    </div>
                    <h2 className="text-3xl font-semibold leading-[40px] text-black">{title}</h2>
                </div>
            </div>
        </div>
    );
};

export default SecondNavBar;
