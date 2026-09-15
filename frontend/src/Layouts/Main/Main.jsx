import React, {useContext, useEffect, useState} from "react";
import "../../scss/styles.scss";
import {Outlet} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Main.css";
import ChatSystem from "../../components/ChatSystem/ChatSystem";
import useAuthUser from "../../hooks/useAuthUser";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getToken, onMessage} from "firebase/messaging";
import {messaging} from "../../firebase/firebase.config";
import Message from "../../components/Message/Message";
import {useGetNotificationsQuery, useStoreTokenMutation} from "../../redux/features/notifications/notificationsApi";
import {LogicProviderContext} from "../../providers/LogicProvider";
import {Fade, Flip} from "react-awesome-reveal";
import logo from "../../assets/footer/footerLogo.svg";
import useHomeData from "../../hooks/useHomeData";

const Main = () => {
    const {userData} = useAuthUser();
    const [storeTokenMutation, {data: storeTokenData}] = useStoreTokenMutation();
    const {isLoading: IsHomeLoading} = useHomeData();
    const {refetch: notificationListRefetch} = useGetNotificationsQuery();
    const {handleTrendingClose, handleNavbarRelatedSearchRefClose} = useContext(LogicProviderContext);
    const [initialLoading, setInitialLoading] = useState(true);

    async function requestPermission() {
        try {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                const token = await getToken(messaging, {
                    vapidKey: "demo-vapid-key-not-used",
                });

                if (token) {
                    const storeToken = { token: token };
                    try {
                        const response = await storeTokenMutation(storeToken);
                        console.log("Token stored successfully:", response);
                    } catch (error) {
                        console.error("Error storing FCM token:", error.message);
                    }
                } else {
                    console.log("No registration token available.");
                }
            } else {
                console.log("Notifications permission denied.");
            }
        } catch (error) {
            console.error("Error requesting notifications permission:", error);
        }
    }

    useEffect(() => {
        requestPermission();
    }, []);

    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("Message received: ", payload);
            toast(<Message notification={payload.notification} />);
            notificationListRefetch();
        });

        // Cleanup listener on component unmount
        return () => {
            unsubscribe();
        };
    }, [notificationListRefetch]);

    useEffect(() => {
        setTimeout(() => {
            setInitialLoading(false);
        }, 8000);
    }, []);

    return (
        <div className={`relative h-screen ${IsHomeLoading ? 'overflow-hidden' : ''}`}>
            <div onClick={handleTrendingClose} className="overflow-hidden">
                <div onClick={handleNavbarRelatedSearchRefClose}>
                    <div className="fixed z-20 w-full bg-white">
                        <Navbar/>
                    </div>
                    <div className="pt-[95px] md:pt-[146px]">
                        <Outlet/>
                    </div>
                    {userData?.status === true && <ChatSystem/>}

                    <Footer/>
                    <ToastContainer/>
                </div>
            </div>
            {/*{IsHomeLoading && (*/}
            {/*    <div className="absolute text-red-500 bg-black opacity-30 z-50 top-0 left-0 h-full w-full inset-0  flex items-center justify-center">*/}
            {/*        <img src={logo} className=" animate-heartbeat" alt="Loading..."/>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default Main;
