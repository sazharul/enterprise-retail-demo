import {useParams} from "react-router-dom";
import CenterAlignCard from "../../../components/allCards/CenterAlignCard/CenterAlignCard";
import {useOfferProductsByCategoryMutation} from "../../../redux/features/offers/offersApi";
import {useContext, useEffect, useState} from "react";
import HomeSkeleton from "../../Home/HomeSkeleton/HomeSkeleton";
import CardSkeletonLoading from "../../ProductFilterPage/CardSkeletonLoading/CardSkeletonLoading";
import CardSkeleton from "../../../components/allCards/CardSkeleton/CardSkeleton";
import {Pagination} from "antd";
import {LogicProviderContext} from "../../../providers/LogicProvider";

const CampaignGridView = () => {
    const {id, campaignCategoryId} = useParams();
    const [current, setCurrent] = useState(1);
    const {windowWidth} = useContext(LogicProviderContext);

    let paginationValue;
    if (windowWidth <= 640) {
        paginationValue = 4;
    } else if (windowWidth <= 768) {
        paginationValue = 4;
    } else if (windowWidth <= 1024) {
        paginationValue = 6;
    } else if (windowWidth <= 1280) {
        paginationValue = 8;
    } else if (windowWidth <= 1535) {
        paginationValue = 10;
    } else if (windowWidth >= 1536) {
        paginationValue = 10;
    }

    const [pagination, setPagination] = useState(paginationValue);
    const [productCount, setProductCount] = useState(0);
    const onChange = (page) => {
        setCurrent(page);
        // window.scrollTo(0, 0);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Smooth scrolling animation
        });
    };
    const [offerProductsByCategoryMutation, {data: offerProductListData, isLoading: offerProductListLoading}] = useOfferProductsByCategoryMutation();
    useEffect(() => {
        const fetchOfferListData = async () => {
            const offerBodyData = {
                offer_id: id,
                pagination: pagination,
                category_id: campaignCategoryId,
                page_number: current
            };

            try {
                const response = await offerProductsByCategoryMutation(offerBodyData);

                setProductCount(response?.data?.data?.data?.products?.total);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
        fetchOfferListData();
    }, [id, campaignCategoryId, current]);

    const paginationStyles = {
        borderRadius: "20px", // Adjust the border-radius value as needed
    };

    if (offerProductListLoading) {
        return (
            <div
                className="grid justify-items grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-y-4 md:gap-5 min-h-[calc(100vh-90vh)] container mx-auto mb-5">
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
            </div>
        );
    }

    return (
        <>
            <h4 className="text-[#000000CC] px-[10px] text-center font-inter text-[20px]  md:text-[32px] font-bold leading-normal mb-2 md:mb-4 font-serif">{offerProductListData?.data?.data?.name}</h4>
            {offerProductListData?.status && Array?.isArray(offerProductListData?.data?.data?.products?.data) && offerProductListData?.data?.data?.products?.data?.length > 0 && (
                <>
                    <div
                        className="grid justify-items grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-y-4 md:gap-5 min-h-[calc(100vh-90vh)] container mx-auto mb-5">
                        {offerProductListData?.data?.data?.products?.data?.map((item, i) => (
                            <div key={i} className="min-w-min px-[10px]">
                                <CenterAlignCard item={item}/>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center my-2">
                        <Pagination showSizeChanger={false} current={current} onChange={onChange} pageSize={pagination} total={productCount} style={paginationStyles}/>
                    </div>
                </>
            )}

            {offerProductListData?.data?.data?.products?.data?.length < 1 && <p className="text-center flex justify-center items-center text-red-400 text-xl mb-10">No product found</p>}
        </>
    );
};

export default CampaignGridView;
