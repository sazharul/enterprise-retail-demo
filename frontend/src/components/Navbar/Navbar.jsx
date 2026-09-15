import {useState} from "react";
import ApplyCouponCart from "../ApplyCouponCart/ApplyCouponCart";
import ApplyRewardPoints from "../ApplyRewardPoints/ApplyRewardPoints";
import CartDrawer from "../CartDrawer/CartDrawer";
import WishListDrawer from "../WishListDrawer/WishListDrawer";
import MobileNavBar from "./MobileNavBar/MobileNavBar";
import "./NavBar.scss";
import PcNavBar from "./PcNavBar/PcNavBar";
import SlimNavbarForTopArea from "./SlimNavbarForTopArea/SlimNavbarForTopArea";

const Navbar = () => {
    return (
        <>
            {/* for pc start*/}
            <div className="large-screen">

                <SlimNavbarForTopArea/>
                <PcNavBar/>
            </div>
            {/* for pc end*/}
            {/* for mobile start*/}
            <div className="small-screen">
                <MobileNavBar/>
            </div>
            {/* for mobile end*/}
            {/* My bag drawer start */}
            <CartDrawer/>
            {/* My bag drawer end */}
            {/* My bag drawer start */}
            <WishListDrawer/>
            {/* My bag drawer end */}
            {/* Apply Coupon drawer start */}
            <ApplyCouponCart/>
            {/* Apply Coupon drawer end */}
            {/* Apply Reward Points start */}
            <ApplyRewardPoints/>
            {/* Apply Reward Points end */}
        </>
    );
};

export default Navbar;
