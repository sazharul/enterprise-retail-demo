import {Icon} from "@iconify/react/dist/iconify.js";
import React from "react";
import {IoIosStar} from "react-icons/io";
import {Link} from "react-router-dom";
import Typewriter from "typewriter-effect";
import useAuthUser from "../../../hooks/useAuthUser";
import {useGetContactQuery} from "../../../redux/features/contact/contactApi";

const SlimNavbarForTopArea = () => {
    const {userData} = useAuthUser();
    const {data: getContactQuery, isLoading} = useGetContactQuery(undefined);

    return (
        <div
            // style={{ background: "linear-gradient(90deg, #D90068 3.51%, #EF0073 38.69%, #9E42E7 71.85%, #820CDE 99.99%)" }}
            style={{
                backgroundImage: `url("${import.meta.env.VITE_ASSET_URL || "http://localhost:8002"}/${getContactQuery?.data?.top_image}")`,
            }}
            className="h-[36px] bg-gradient-to-tr  bg-cover"
        >
            <div className="container mx-auto px-[10px] h-full flex justify-between items-center text-white font-semibold text-sm">
                <div>
                    {/* <p>Great Festive Sale Deals You Can’t Miss</p> */}
                    <Typewriter
                        options={{
                            strings: [getContactQuery?.data?.top_text],
                            autoStart: true,
                            //   increase speed
                            delay: 50,
                            loop: true,
                            pauseFor: 3000,
                        }}
                    />
                </div>
                <div className=" flex items-center gap-3 lg:gap-5">
                    <Link to={"/my-account/my-wallet"}>
                        <div className="flex items-center gap-2 hover:cursor-pointer">
                            <div className="border-2  rounded-full  w-min p-[2px] ">
                                <IoIosStar size={12}/>
                            </div>
                            {userData?.data?.reward_points} Points
                        </div>
                    </Link>
                    <div className="h-4 border-l-[2px]"></div>

                    <a href={getContactQuery?.data?.google_link} target="_blank" rel="noreferrer">
                        <div className="flex items-center gap-2 hover:cursor-pointer">
                            <Icon icon="heroicons:device-phone-mobile-20-solid" width="20" height="20"/> <p>Get App</p>
                        </div>
                    </a>
                    <div className="h-4 border-l-[2px]"></div>
                    <Link to={"/store-and-event-location"}>
                        <div className="flex items-center gap-[6px]  hover:cursor-pointer">
                            <Icon icon="humbleicons:location" width="22" height="22"/>
                            <p>Store & Events</p>
                        </div>
                    </Link>
                    <div className="h-4 border-l-[2px]"></div>
                    <Link to={"/frequently-asked-questions"}>
                        <div className="flex items-center gap-2 hover:cursor-pointer">
                            <Icon icon="material-symbols:help-outline" width="22" height="22"/> <p>Help</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SlimNavbarForTopArea;
