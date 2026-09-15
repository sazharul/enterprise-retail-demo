import {createBrowserRouter} from "react-router-dom";
import Main from "../Layouts/Main/Main";
import MyAccount from "../Layouts/MyAccount/MyAccount";
import AllReviewPage from "../pages/AllReviewPage/AllReviewPage";
import AllReviewPageWithNoReview from "../pages/AllReviewPageWithNoReview/AllReviewPageWithNoReview";
import BeautyAdvice from "../pages/BeautyAdvice/BeautyAdvice";
import BeautyAdviceDetails from "../pages/BeautyAdviceDetails/BeautyAdviceDetails";
import BrandPageForMobile from "../pages/BrandPageForMobile/BrandPageForMobile";
import BuyingGuides from "../pages/BuyingGuides/BuyingGuides";
import Campaign from "../pages/Campaign/Campaign";
import Checkout from "../pages/Checkout/Checkout";
import ContactUs from "../pages/ContactUs/ContactUs";
import FrequentlyAskedQuestions from "../pages/FrequentlyAskedQuestions/FrequentlyAskedQuestions";
import Home from "../pages/Home/Home";
import EmailOTPVerification from "../pages/Login/EmailOTPVerification/EmailOTPVerification";
import ForgotPassword from "../pages/Login/ForgotPassword/ForgotPassword";
import LoginWithEmail from "../pages/Login/LoginWithEmail/LoginWithEmail";
import LoginWithPhone from "../pages/Login/LoginWithPhone/LoginWithPhone";
import OTPVerification from "../pages/Login/OTPVerification/OTPVerification";
import PhoneOTPVerification from "../pages/Login/PhoneOTPVerification/PhoneOTPVerification";
import ResetPassword from "../pages/Login/ResetPassword/ResetPassword";
import SignUp from "../pages/Login/SignUp/SignUp";
import AddNewAddress from "../pages/MyAccount/AddNewAddress/AddNewAddress";
import EditAddress from "../pages/MyAccount/EditAddress/EditAddress";
import MyAddresses from "../pages/MyAccount/MyAddresses/MyAddresses";
import MyOrderDetails from "../pages/MyAccount/MyOrderDetails/MyOrderDetails";
import MyOrders from "../pages/MyAccount/MyOrders/MyOrders";
import MyProfile from "../pages/MyAccount/MyProfile/MyProfile";
import MyRatingAndReviews from "../pages/MyAccount/MyRatingAndReviews/MyRatingAndReviews";
import MyWallet from "../pages/MyAccount/MyWallet/MyWallet";
import Notifications from "../pages/MyAccount/Notifications/Notifications";
import ReturnAndCancel from "../pages/MyAccount/ReturnAndCancel/ReturnAndCancel";
import UpdatePassword from "../pages/MyAccount/UpdatePassword/UpdatePassword";
import UpdatePersonalDetails from "../pages/MyAccount/UpdatePersonalDetails/UpdatePersonalDetails";
import OrderConfirmed from "../pages/OrderConfirmed/OrderConfirmed";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProductDetailsWithOffer from "../pages/ProductDetailsWithOffer/ProductDetailsWithOffer";
import ProductDetailsWithSize from "../pages/ProductDetailsWithSize/ProductDetailsWithSize";
import ProductFilterPage from "../pages/ProductFilterPage/ProductFilterPage";
import StoreAndEventDetails from "../pages/StoreAndEventDetails/StoreAndEventDetails";
import StoreAndEventLocations from "../pages/StoreAndEventLocations/StoreAndEventLocations";
import WhoWeAre from "../pages/WhoWeAre/WhoWeAre";
import ComboProductDetails from "../pages/ComboProductDetails/ComboProductDetails";
import TermConditions from "../pages/TermConditions/TermConditions";
import PrivacyPolicies from "../pages/PrivacyPolicies/PrivacyPolicies";
import CancellationPolicy from "../pages/CancellationPolicy/CancellationPolicy";
import ShippingPolicies from "../pages/ShippingPolicies/ShippingPolicies";
import OrderFailed from "../pages/OrderFailed/OrderFailed";
import HomeNode from "../pages/Home/HomeNode";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        //   errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/home-node",
                element: <HomeNode/>,
            },
            {
                path: "/product/:id",
                element: <ProductDetails/>,
            },
            {
                path: "/combo-product-details/:id",
                element: <ComboProductDetails/>,
            },
            {
                path: "/product-details-with-size",
                element: <ProductDetailsWithSize/>,
            },
            {
                path: "/product-details-with-offer",
                element: <ProductDetailsWithOffer/>,
            },
            {
                path: "/all-review/:id",
                element: <AllReviewPage/>,
            },
            {
                path: "/all-review-with-no-review",
                element: <AllReviewPageWithNoReview/>,
            },
            {
                path: "/login-with-email",
                element: <LoginWithEmail/>,
            },
            {
                path: "/login-with-phone",
                element: <LoginWithPhone/>,
            },
            {
                path: "/otp-verification-phone",
                element: <PhoneOTPVerification/>,
            },
            {
                path: "/sign-up",
                element: <SignUp/>,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword/>,
            },
            {
                path: "/otp-verification",
                element: <OTPVerification/>,
            },
            {
                path: "/otp-verification-email",
                element: <EmailOTPVerification/>,
            },
            {
                path: "/reset-password",
                element: <ResetPassword/>,
            },

            {
                path: "/campaign/:id",
                element: <Campaign/>,
            },
            {
                path: "/campaign/:id/:campaignCategoryId",
                element: <Campaign/>,
            },
            {
                path: "/product-filter",
                element: <ProductFilterPage/>,
            },
            {
                path: "/product-filter/category/:categoryId",
                element: <ProductFilterPage/>,
            },
            {
                path: "/product-filter/sub-category/:subCategoryId",
                element: <ProductFilterPage/>,
            },
            {
                path: "/product-filter/child-category/:childCategoryId",
                element: <ProductFilterPage/>,
            },
            {
                path: "/brand-page-for-mobile",
                element: <BrandPageForMobile/>,
            },
            {
                path: "/checkout",
                element: <Checkout/>,
            },
            {
                path: "/buy-now/checkout/:productId/:sizeOrShadeId",
                element: <Checkout/>,
            },
            {
                path: "/order-confirmed",
                element: <OrderConfirmed/>,
            },
            {
                path: "/store-and-event-location",
                element: <StoreAndEventLocations/>,
            },
            {
                path: "/store-and-event-details",
                element: <StoreAndEventDetails/>,
            },
            {
                path: "/contact-us",
                element: <ContactUs/>,
            },
            {
                path: "/frequently-asked-questions",
                element: <FrequentlyAskedQuestions/>,
            },
            {
                path: "/who-we-are",
                element: <WhoWeAre/>,
            },
            {
                path: "/terms-and-condition",
                element: <TermConditions/>,
            },
            {
                path: "/privacy-policies",
                element: <PrivacyPolicies/>,
            },
            {
                path: "/cancellation-policies",
                element: <CancellationPolicy/>,
            },
            {
                path: "/shipping-policies",
                element: <ShippingPolicies/>,
            },
            {
                path: "/beauty-advice",
                element: <BeautyAdvice/>,
            },
            {
                path: "/beauty-advice-details/:id",
                element: <BeautyAdviceDetails/>,
            },
            {
                path: "/buying-guides",
                element: <BuyingGuides/>,
            },
            {
                path: "/success",
                element: <OrderConfirmed/>,
            },
            {
                path: "/failed",
                element: <OrderFailed/>,
            },
            {
                path: "/cancelled",
                element: <OrderFailed/>,
            },
        ],
    },
    {
        path: "/my-account",
        element: <MyAccount/>,
        //   errorElement: <ErrorPage />,
        children: [
            {
                path: "/my-account/my-profile",
                element: <MyProfile/>,
            },
            {
                path: "/my-account/my-profile/update-personal-details",
                element: <UpdatePersonalDetails/>,
            },
            {
                path: "/my-account/my-profile/update-password",
                element: <UpdatePassword/>,
            },
            {
                path: "/my-account/my-wallet",
                element: <MyWallet/>,
            },
            {
                path: "/my-account/my-orders",
                element: <MyOrders/>,
            },
            {
                path: "/my-account/my-orders/order-details/:id",
                element: <MyOrderDetails/>,
            },
            {
                path: "/my-account/return-and-cancel",
                element: <ReturnAndCancel/>,
            },
            {
                path: "/my-account/my-rating-and-reviews",
                element: <MyRatingAndReviews/>,
            },
            {
                path: "/my-account/notifications",
                element: <Notifications/>,
            },
            {
                path: "/my-account/my-addresses",
                element: <MyAddresses/>,
            },
            {
                path: "/my-account/my-addresses/add-new-address",
                element: <AddNewAddress/>,
            },
            {
                path: "/my-account/my-addresses/edit-address/:id",
                element: <EditAddress/>,
            },
        ],
    },
]);
