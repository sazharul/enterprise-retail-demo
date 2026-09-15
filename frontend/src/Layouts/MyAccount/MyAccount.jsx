import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import SecondNavBar from "../../components/SecondNavBar/SecondNavBar";
import MyAccountSideMenu from "../../pages/MyAccount/MyAccountSideMenu/MyAccountSideMenu";
import { Drawer, Space } from "antd";
import { IoClose } from "react-icons/io5";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LogicProviderContext } from "../../providers/LogicProvider";

const MyAccount = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const { handleTrendingClose, handleNavbarRelatedSearchRefClose } = useContext(LogicProviderContext);
    return (
        <div onClick={handleTrendingClose} className="overflow-hidden">
            <div onClick={handleNavbarRelatedSearchRefClose}>
                <div className="fixed z-20 w-full bg-white">
                    <Navbar />
                </div>
                <div className="mb-2 md:mb-8 pt-[95px] md:pt-[150px]  ">{/* <SecondNavBar title="My Account" /> */}</div>
                <div className="block md:hidden">
                    <MyAccountSideMenu />
                </div>

                {/* <div className="block md:hidden">
                    <Drawer
                        title="Product Filter"
                        placement={"left"}
                        width={"85%"}
                        closable={false}
                        onClose={onClose}
                        open={open}
                        extra={
                            <Space>
                                <button className="mt-2" onClick={onClose}>
                                    <IoClose size={22} />
                                </button>
                            </Space>
                        }
                    >
                        <MyAccountSideMenu onClose={onClose} />
                    </Drawer>
                    <div className="z-10 container mx-auto mb-2 px-2">
                        <button onClick={() => showDrawer()} className="btn bg-primary-color text-white p-2 rounded">
                            <HiOutlineMenuAlt2 />
                        </button>
                        <MainButton title={<HiOutlineMenuAlt2 />} handleSubmit={showDrawer} className={"px-4 py-2 mt-3 z-20"} />
                    </div>
                </div> */}

                <div className="container mx-auto min-h-[calc(100vh-55vh)]">
                    <div className="flex gap-3 lg:gap-[52px]">
                        <div className="hidden md:block w-5/12 md:w-5/12 lg:w-4/12 2xl:w-3/12">
                            <MyAccountSideMenu />
                        </div>

                        <div className="w-full px-2 min-h-[calc(100vh-70vh)] mb-10 md:mb-20">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <Footer />
                <ScrollRestoration />
            </div>
        </div>
    );
};

export default MyAccount;
