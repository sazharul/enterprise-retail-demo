import axios from "axios";
import {createContext, useEffect, useRef, useState} from "react";

export const LogicProviderContext = createContext(null);

const LogicProvider = ({children}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);
    const [wishListDrawerOpen, setWishListDrawerOpen] = useState(false);
    const [applyCouponOpen, setApplyCouponOpen] = useState(false);
    const [applyRewardPointOpen, setApplyRewardPointOpen] = useState(false);
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const [reviewModalData, setReviewModalData] = useState({});
    const [isHelpfulRefetch, setIsHelpfulRefetch] = useState(false);
    const [showTrendingSearch, setShowTrendingSearch] = useState(false);
    const [mobileShowTrendingSearch, setMobileShowTrendingSearch] = useState(false);
    const [showSearchNameList, setShowSearchNameList] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    let paginationValue;
    if (windowWidth <= 640) {
        paginationValue = 12;
    } else if (windowWidth <= 768) {
        paginationValue = 12;
    } else if (windowWidth <= 1024) {
        paginationValue = 12;
    } else if (windowWidth <= 1280) {
        paginationValue = 12;
    } else if (windowWidth <= 1535) {
        paginationValue = 12;
    } else if (windowWidth >= 1536) {
        paginationValue = 12;
    }


    const handleShowReviewModal = (item) => {
        setReviewModalData(item);
        setReviewModalOpen(true);
    };
    const handleCancelReviewModal = () => {
        setReviewModalOpen(false);
    };


    const trendingRef = useRef(null)
    const navbarRelatedSearchRef = useRef(null)
    const mobileTrendingRef = useRef(null)
    const mobileNavbarRelatedSearchRef = useRef(null)

    const handleTrendingClose = (e) => {
        if (!trendingRef?.current?.contains(e.target)) {
            setShowTrendingSearch(false);
        }
        if (!mobileTrendingRef?.current?.contains(e.target)) {
            setMobileShowTrendingSearch(false);
        }
    }

    const handleNavbarRelatedSearchRefClose = (e) => {
        if (!navbarRelatedSearchRef?.current?.contains(e.target)) {
            setShowSearchNameList(false);
        }
    }

    const infoProvider = {
        windowWidth,
        paginationValue,
        open,
        setOpen,
        showDrawer,
        wishListDrawerOpen,
        setWishListDrawerOpen,
        applyCouponOpen,
        setApplyCouponOpen,
        applyRewardPointOpen,
        setApplyRewardPointOpen,
        handleShowReviewModal,
        handleCancelReviewModal,
        isReviewModalOpen,
        reviewModalData,
        isHelpfulRefetch,
        setIsHelpfulRefetch,
        trendingRef,
        navbarRelatedSearchRef,
        mobileTrendingRef,
        mobileNavbarRelatedSearchRef,
        handleTrendingClose,
        handleNavbarRelatedSearchRefClose,
        showTrendingSearch,
        setShowTrendingSearch,
        mobileShowTrendingSearch,
        setMobileShowTrendingSearch,
        showSearchNameList,
        setShowSearchNameList
    };

    return (
        <LogicProviderContext.Provider value={infoProvider}>
            {children}
        </LogicProviderContext.Provider>
    );
};

export default LogicProvider;
