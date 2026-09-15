import React, {useEffect, useRef, useState} from "react";
import {Bars} from "react-loader-spinner";
import {ScrollRestoration, useLocation, useParams} from "react-router-dom";
import ImageURL from "../../components/ImageURL/ImageURL";
import CenterAlignCardFilter from "../../components/allCards/CenterAlignCard/CenterAlignCardFilter.jsx";
import axios from "axios";

const Campaign = () => {
    const [isCategoryFilter, setIsCategoryFilter] = useState(false);
    const location = useLocation();
    const [productData, setProductData] = useState([]);
    const [offerInfoData, setOfferInfoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const hasMoreRef = useRef(true);
    const currentPage = useRef(1);
    const [page, setPage] = useState(1);

    const fetchOfferListData = async (pageNumber, id) => {
        const offerBodyData = {
            offer_id: id,
            pagination: 15,
            pageNumber: pageNumber,
        };

        setLoading(true);
        axios.post(`${import.meta.env.VITE_NODE_API_URL || "http://localhost:4001/api/node"}/offer-products`, offerBodyData).then(function (response) {
            const newProducts = response.data.data.products.data;

            if (response.data.data.products.current_page === 1) {
                setOfferInfoData(response.data.data.offerInfoData);
                setProductData(newProducts);
            } else {
                // Check for duplicates by comparing existing products and new ones
                setProductData(prevData => {
                    const allProducts = [...prevData, ...newProducts];
                    const uniqueProducts = [];
                    const seenProductIds = new Set();

                    // Keep only unique products by ID
                    allProducts.forEach(product => {
                        if (!seenProductIds.has(product.id)) {
                            uniqueProducts.push(product);
                            seenProductIds.add(product.id);
                        }
                    });

                    return uniqueProducts;
                });
            }

            currentPage.current = response.data.data.products.current_page;

            if (response.data.data.products.next_page_url === null) {
                hasMoreRef.current = false;
            } else {
                hasMoreRef.current = true;
            }
            setLoading(false);
        }).catch(function (error) {
            console.log(error);
            setLoading(false);
        });
    };

    // When the id changes or on component mount, fetch the data
    useEffect(() => {
        const path = location.pathname.split('/');
        const id = path[path.length - 1];
        fetchOfferListData(1, id);  // Always fetch the first page when the id changes
    }, [location]); // Depend on id to refetch products when it changes

    let scrollTimeout = null;

    // Function to fetch more data when scrolling reaches the bottom
    const handleScroll = () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const isMobile = window.innerWidth <= 768;
            const bottom = document.documentElement.scrollHeight - (isMobile ? 1000 : 550); // 1000 for mobile, 550 for desktop

            if (scrollPosition >= bottom && hasMoreRef.current && !loading) {
                setLoading(true);
                setPage(prevPage => {
                    const nextPage = currentPage.current + 1;
                    // scroll to before position
                    window.scrollTo({
                        top: scrollPosition,
                        left: 0,
                        behavior: "smooth", // Smooth scrolling animation
                    });

                    const {id} = useParams();
                    fetchOfferListData(nextPage, id); // Fetch the next set of products
                    return nextPage;
                });
            }
        }, 200); // Delay of 200ms to prevent rapid fire requests
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    return (
        <>
            <div>
                <div className="my-3 container mx-auto px-[10px] mb-8">
                    <ImageURL
                        className={"w-full object-fill h-[120px] md:h-[220px]"}
                        image={window.innerWidth >= 768 ? offerInfoData?.banner_web : offerInfoData?.banner_mobile}
                    />
                </div>

                <div className="my-3 container mx-auto px-[10px] mb-10">
                    {productData?.length > 0 && (
                        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 md:gap-5 min-h-[calc(100vh-90vh)]">
                            {productData?.map((item, i) => (
                                <CenterAlignCardFilter key={i} item={item}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {loading && (
                <div className="flex justify-center items-center space-x-3 p-6 bg-white rounded-lg shadow-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                    <p className="text-lg font-semibold text-gray-700">Loading...</p>
                </div>
            )}
        </>
    );
};

export default Campaign;
