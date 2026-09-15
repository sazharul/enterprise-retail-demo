import React from "react";
import {BsBagCheck} from "react-icons/bs";
import {CiWallet} from "react-icons/ci";
import {GoPerson} from "react-icons/go";
import {GrMap} from "react-icons/gr";
import {IoIosNotificationsOutline} from "react-icons/io";
import {MdOutlineReviews} from "react-icons/md";
import {SlLogout} from "react-icons/sl";
import {TbShoppingBagX} from "react-icons/tb";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCartData from "../../../hooks/useCartData";
import {useGetWishListQuery} from "../../../redux/features/wishList/wishListApi";
import {Icon} from "@iconify/react/dist/iconify.js";

const MyAccountSideMenu = ({onClose}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const {cartRefetch} = useCartData();
    const {refetch: wishListRefetch} = useGetWishListQuery();
    const isMyProfile = location.pathname.includes("my-profile");
    const isMyWallet = location.pathname.includes("my-wallet");
    const isMyOrders = location.pathname.includes("my-orders");
    // const isOrderDetails = location.pathname.includes("order-details");
    const isReturnAndCancel = location.pathname.includes("return-and-cancel");
    const isMyRatingAndReviews = location.pathname.includes("my-rating-and-reviews");
    const isNotifications = location.pathname.includes("notifications");
    const isMyAddresses = location.pathname.includes("my-addresses");

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log me out!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .get("logout")
                    .then((res) => {
                        if (res.data.status == true) {
                            localStorage.removeItem("authToken");
                            cartRefetch();
                            wishListRefetch()
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "SignOut successful",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            navigate("/");
                        } else {
                            // Handle other cases if needed
                        }
                    })
                    .catch((error) => {
                    });

                // navigate("/");

                // Swal.fire({
                //   title: "Logged Out!",
                //   text: "You have been successfully logged out.",
                //   icon: "success",
                // });
            }
        });
    };

    return (
        <div className="w-full">
            <ul className="w-full">
                <NavLink to={"/my-account/my-profile"}>
                    <li onClick={onClose} className="w-full">
            <span
                className={`flex items-center gap-3 py-[11px] ps-5 rounded-sm ${
                    isMyProfile
                        ? "bg-[#D4F3FF] bg-opacity-[0.5] text-black text-[14px] font-medium leading-5"
                        : "text-black text-opacity-80 text-[14px] font-medium leading-5"
                }`}
            >
              <GoPerson/>
              My Profile
            </span>
                    </li>
                </NavLink>
                <NavLink to={"/my-account/my-wallet"}>
                    <li onClick={onClose} className="w-full">
            <span
                className={`flex items-center gap-3 py-[11px] ps-5 rounded-sm ${
                    isMyWallet
                        ? "bg-[#D4F3FF] bg-opacity-[0.5] text-black text-[14px] font-medium leading-5"
                        : "text-black text-opacity-80 text-[14px] font-medium leading-5"
                }`}
            >
              <CiWallet/>
              My Wallet
            </span>
                    </li>
                </NavLink>
                <NavLink to={"/my-account/my-orders"}>
                    <li onClick={onClose} className="w-full">
            <span
                className={`flex items-center gap-3 py-[11px] ps-5 rounded-sm ${
                    isMyOrders
                        ? "bg-[#D4F3FF] bg-opacity-[0.5] text-black text-[14px] font-medium leading-5"
                        : "text-black text-opacity-80 text-[14px] font-medium leading-5"
                }`}
            >
              <BsBagCheck/>
              My Orders
            </span>
                    </li>
                </NavLink>
                <NavLink to={"/my-account/return-and-cancel"}>
                    <li onClick={onClose} className="w-full">
            <span
                className={`flex items-center gap-3 py-[11px] ps-5 rounded-sm ${
                    isReturnAndCancel
                        ? "bg-[#D4F3FF] bg-opacity-[0.5] text-black text-[14px] font-medium leading-5"
                        : "text-black text-opacity-80 text-[14px] font-medium leading-5"
                }`}
            >
              <TbShoppingBagX/>
              Return & Refund Policy
            </span>
                    </li>
                </NavLink>
                <NavLink to={"/my-account/my-rating-and-reviews"}>
                    <li onClick={onClose} className="w-full">
            <span
                className={`flex items-center gap-3 py-[11px] ps-5 rounded-sm ${
                    isMyRatingAndReviews
                        ? "bg-[#D4F3FF] bg-opacity-[0.5] text-black text-[14px] font-medium leading-5"
                        : "text-black text-opacity-80 text-[14px] font-medium leading-5"
                }`}
            >
              <MdOutlineReviews/>
              My Ratings & Reviews
            </span>
                    </li>
                </NavLink>
                <NavLink to={"/my-account/notifications"}>
                    <li onClick={onClose} className="w-full">
            <span
                className={`flex items-center gap-3 py-[11px] ps-5 rounded-sm ${
                    isNotifications
                        ? "bg-[#D4F3FF] bg-opacity-[0.5] text-black text-[14px] font-medium leading-5"
                        : "text-black text-opacity-80 text-[14px] font-medium leading-5"
                }`}
            >
              {/* <IoIosNotificationsOutline size={18} /> */}
                {/* <Icon icon="basil:notification-outline" width="15" height="18" /> */}
                <Icon icon="clarity:notification-line" width="14" height="14"/>
              Notifications
            </span>
                    </li>
                </NavLink>
                <NavLink to={"/my-account/my-addresses"}>
                    <li onClick={onClose} className="w-full">
            <span
                className={`flex items-center gap-3 py-[11px] ps-5 rounded-sm ${
                    isMyAddresses
                        ? "bg-[#D4F3FF] bg-opacity-[0.5] text-black text-[14px] font-medium leading-5"
                        : "text-black text-opacity-80 text-[14px] font-medium leading-5"
                }`}
            >
              <GrMap/>
              My Addresses
            </span>
                    </li>
                </NavLink>
                <li onClick={handleLogOut} className="w-full">
          <span className="hover:cursor-pointer flex items-center gap-3 py-[11px] ps-5 rounded-sm text-black text-opacity-80 text-[14px] font-medium leading-5">
            <SlLogout/>
            Logout
          </span>
                </li>
            </ul>
        </div>
    );
};

export default MyAccountSideMenu;
