import {LoadingOutlined} from "@ant-design/icons";
import {Alert, Divider, Input, Spin} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {BsCheck} from "react-icons/bs";
import {FaArrowLeftLong, FaStarOfLife} from "react-icons/fa6";
import {Link, ScrollRestoration, useNavigate, useParams} from "react-router-dom";
import DropDownListAndSelect from "../../components/DropDownListAndSelect/DropDownListAndSelect";
import ImageURL from "../../components/ImageURL/ImageURL";
import Button from "../../components/ui/Button";
import useAuthUser from "../../hooks/useAuthUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCartData from "../../hooks/useCartData";
import useUserAddress from "../../hooks/useUserAddress";
import {LogicProviderContext} from "../../providers/LogicProvider";
import {useOrderMutation} from "../../redux/features/order/orderApi";
import {useCityQuery} from "../../redux/features/pathao/pathaoApi";
import {useGetRewardPointsDataQuery} from "../../redux/features/rewardPoints/rewardPointsApi";
import {useShippingChargeQuery} from "../../redux/features/shippingCharge/shippingChargeApi";
import {cartTotalDiscountPrice, cartTotalPrice} from "../../utilities/cartTotalPriceAndDiscount";
import {
    getCouponCodeFromStorage,
    getCouponDiscountAmountFromStorage,
    removeCouponDataFromStorage
} from "../../utilities/couponHandler";
import {getRewardPointsFromStorage, removeRewardPointsFromStorage} from "../../utilities/rewardPointsHandler";
import showToast from "../../utilities/showToast";
import {Modal} from "antd";
import {IoCall} from "react-icons/io5";
import {MdEmail} from "react-icons/md";
import {ImLocation2} from "react-icons/im";
import {ProgressBar} from "react-loader-spinner";
import {TbEdit} from "react-icons/tb";
import {RiDeleteBin6Line} from "react-icons/ri";

const {TextArea} = Input;

const Checkout = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const {userAddress, isUserAddressLoading, refetchAddress} = useUserAddress();
    // const [selectedCheckboxes, setSaveInformationForNextTime] = useState(false);
    const [saveInformationForNextTime, setSaveInformationForNextTime] = useState(false);
    const [termsAndConditions, setTermsAndConditions] = useState(false);
    const [shippingMethod, setShippingMethod] = useState("insideDhaka");
    // setRemoveValue
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [onlySSLPaymentForOutsideDhaka, setOnlySSLPaymentForOutsideDhaka] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [zoneList, setZoneList] = useState([]);
    const [selectedZone, setSelectedZone] = useState({});
    const [areaList, setAreaList] = useState([]);
    const [selectedArea, setSelectedArea] = useState({});
    const [isZoneLoading, setIsZoneLoading] = useState(false);
    const [isAreaLoading, setIsAreaLoading] = useState(false);
    const [sslCommerzFullData, setSslCommerzFullData] = useState({});
    const [shippingFee, setShippingFee] = useState(0);
    const {cartData, isCartLoading, isCartFetching, cartErrorDetail, cartRefetch} = useCartData();
    const {data: cityQuery, isLoading: isCityListLoading} = useCityQuery();
    // const { data: ZoneQuery, isLoading: isZoneListLoading } = useZoneQuery(selectedCity?.selected_item_id, { skip: !selectedCity.selected_item_id });
    // const { data: areaQuery, isLoading: isAreaListLoading } = useAreaQuery(selectedZone?.selected_item_id, { skip: !selectedZone.selected_item_id });
    const {data: shippingChargeQuery} = useShippingChargeQuery(undefined);
    const {data: getRewardPointsDataQuery} = useGetRewardPointsDataQuery();
    const storedCouponDiscountAmount = getCouponDiscountAmountFromStorage();
    const savedRewardPoints = getRewardPointsFromStorage();
    const savedCouponCode = getCouponCodeFromStorage();
    const {productId, sizeOrShadeId} = useParams();
    const {userData} = useAuthUser();
    // delivery charge
    const [fullDataOfArea, setFullDataOfArea] = useState([]);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    //

    const [orderMutation, {data: orderedData, isLoading: postOrderLoading}] = useOrderMutation();
    const {open, setOpen, setWishListDrawerOpen} = useContext(LogicProviderContext);

    // useEffect(() => {
    //     if (shippingMethod == "insideDhaka") {
    //         setShippingFee(parseInt(shippingChargeQuery?.data?.inside_city));
    //     } else {
    //         setShippingFee(parseInt(shippingChargeQuery?.data?.outside_city));
    //     }
    // }, [shippingChargeQuery, shippingMethod]);

    useEffect(() => {
        // find selectedArea from areaList
        let areaSelectedItem = fullDataOfArea?.find((item) => item?.area_id == selectedArea.selected_item_id);
        if (areaSelectedItem) {
            setDeliveryCharge(parseFloat(areaSelectedItem?.delivery_charge) ?? 0);
            setShippingFee(parseFloat(areaSelectedItem?.delivery_charge) ?? 0);
        } else {
            setDeliveryCharge(parseFloat(fullDataOfArea[0]?.delivery_charge) ?? 0);
            setShippingFee(parseFloat(fullDataOfArea[0]?.delivery_charge) ?? 0);
        }
        if (areaSelectedItem?.is_cod_available === 0 || areaSelectedItem?.is_cod_available === "0") {
            setOnlySSLPaymentForOutsideDhaka(true);
            setPaymentMethod("SSL");
        } else {
            setOnlySSLPaymentForOutsideDhaka(false);
        }

    }, [selectedArea, selectedZone, fullDataOfArea]);


    useEffect(() => {
        if (cityQuery?.status === true) {
            const result = cityQuery?.data?.map((item) => ({
                value: item.city_id,
                label: item.city_name,
            }));
            setCityList(result);
        }
    }, [cityQuery]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    // defaultAddressFromDB
    const [defaultAddressFromDB, setDefaultAddressFromDB] = useState(null);

    useEffect(() => {
        setDefaultAddressFromDB(userAddress?.data?.find((address) => address?.status == 1));
    }, [userAddress]);

    useEffect(() => {
        setValue("name", defaultAddressFromDB?.name ? defaultAddressFromDB?.name : userData?.data?.name);
        setValue("phone", defaultAddressFromDB?.phone ? defaultAddressFromDB?.phone : userData?.data?.phone);
        setValue("email", defaultAddressFromDB?.email ? defaultAddressFromDB?.email : userData?.data?.email);
        setValue("address", defaultAddressFromDB?.address ? defaultAddressFromDB?.address : "");
        if (defaultAddressFromDB?.city_id) {
            setSelectedCity({
                selected_item_id: defaultAddressFromDB?.city_id,
                selected_item_name: defaultAddressFromDB?.city_name,
            });
        }
        if (defaultAddressFromDB?.zone_id) {
            setSelectedZone({
                selected_item_id: defaultAddressFromDB?.zone_id,
                selected_item_name: defaultAddressFromDB?.zone_name,
            });
        }
        if (defaultAddressFromDB?.area_id) {
            setSelectedArea({
                selected_item_id: defaultAddressFromDB?.area_id,
                selected_item_name: defaultAddressFromDB?.area_name,
            });
        }

        setIsDropdownVisible(true);

    }, [defaultAddressFromDB]);

    useEffect(() => {
        if (selectedCity?.selected_item_id) {
            setIsZoneLoading(true);
            setZoneList([]);
            setAreaList([]);
            // if (selectedCity?.selected_item_name == "Dhaka") {
            //     setShippingMethod("insideDhaka");
            //     setOnlySSLPaymentForOutsideDhaka(false);
            // } else {
            //     setShippingMethod("outSideDhaka");
            //     setPaymentMethod("SSL");
            //     setOnlySSLPaymentForOutsideDhaka(true);
            // }
            axiosSecure
                .get(`get-zone-list/${selectedCity.selected_item_id}`)
                .then((res) => {
                    if (res.data.status) {
                        const result = res.data.data.map((item) => ({
                            value: item.zone_id,
                            label: item.zone_name,
                        }));
                        setZoneList(result);
                        setIsZoneLoading(false);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching zones:", error);
                });
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedZone?.selected_item_id) {
            setIsAreaLoading(true);
            setAreaList([]);
            axiosSecure
                .get(`get-area-list/${selectedZone?.selected_item_id}`)
                .then((res) => {
                    if (res.data.status === true) {
                        setFullDataOfArea(res.data.data);
                        const result = res.data.data.map((item) => ({
                            value: item.area_id,
                            label: item.area_name,
                        }));
                        setAreaList(result);
                        setIsAreaLoading(false);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching zones:", error);
                });
        }
    }, [selectedZone]);

    const buyNowProduct = cartData?.data?.cartData?.filter((item) => item?.product_id == productId);
    const buyNowProductWithShade = buyNowProduct?.filter((item) => item?.shade_id == sizeOrShadeId);
    const buyNowProductWithSize = buyNowProduct?.filter((item) => item?.size_id == sizeOrShadeId);
    const buyNowProductFiltered = buyNowProductWithShade?.concat(buyNowProductWithSize);
    let cartDataArray = cartData?.data?.cartData;
    const subTotalPrice = cartTotalPrice(productId ? buyNowProductFiltered : cartDataArray);
    const discountTotalPrice = cartTotalDiscountPrice(productId ? buyNowProductFiltered : cartDataArray);

    // useEffect(() => {
    //     if (cartDataArray?.length < 1) {
    //         showToast("Please add product to cart first", "info");
    //         navigate("/");
    //     }
    // }, [cartDataArray]);

    useEffect(() => {
        // Check if loading has finished and cartDataArray is available
        if (!isCartFetching && !isCartLoading) {
            const cartDataArray = cartData?.data?.cartData;
            if (!cartDataArray || cartDataArray.length < 1) {
                showToast("Add product to cart first", "info");
                navigate("/");
            }
        }
    }, [cartData, isCartLoading, navigate]);


    const onSubmit = (data) => {
        if (selectedCity?.selected_item_id == undefined) {
            showToast("Please select the correct City", "error");
        } else if (selectedZone?.selected_item_id == undefined) {
            showToast("Please select the correct Zone", "error");
        } else if (selectedArea?.selected_item_id == undefined) {
            showToast("Please select the correct Area", "error");
        } else {
            if (cartData?.status) {
                const stockAvailableProducts = cartData.data.cartData.filter((item) => item.stock_status === 1);
                const cartIdArray = stockAvailableProducts?.map((item) => item?.id);
                const listOfCartIds = cartIdArray.filter(element => element !== undefined);
                const addressDetails = {
                    ...data,
                    city_id: selectedCity?.selected_item_id,
                    city_name: selectedCity?.selected_item_name,
                    zone_id: selectedZone?.selected_item_id,
                    zone_name: selectedZone?.selected_item_name,
                    area_id: selectedArea?.selected_item_id,
                    area_name: selectedArea?.selected_item_name,
                };
                const fullOrderData = {
                    order_details: JSON.stringify(productId ? [buyNowProductFiltered?.[0]?.id] : listOfCartIds),
                    billing_shipping_details: JSON.stringify(addressDetails),
                    order_notes: data?.order_notes,
                    coupon_code: savedCouponCode ? savedCouponCode : null,
                    reward_point: savedRewardPoints ? savedRewardPoints : 0,
                    payment_status: "pending",
                    payment_method: paymentMethod.toLowerCase(),
                    shipping_charge: shippingFee,
                    store_address: saveInformationForNextTime == true ? 1 : 0,
                    order_from: "web",
                };

                // setSslCommerzFullData(fullOrderData);
                // if (paymentMethod == "COD") {
                const fetchOrderData = async () => {
                    try {
                        const response = await orderMutation(fullOrderData);
                        if (response.data?.status) {
                            cartRefetch();
                            removeRewardPointsFromStorage();
                            removeCouponDataFromStorage();
                            if (paymentMethod == "SSL") {
                                window.location.replace(response.data?.ssl_url);
                            }
                            // showToast(response?.data?.message);

                            navigate(`/order-confirmed?order_id=${response?.data?.data?.order_no}`);
                        } else {
                            showToast(response?.data?.message, "error");
                        }
                    } catch (error) {
                        console.error("Error fetching data:", error.message);
                    }
                };
                fetchOrderData();
                // }
            }
        }
    };

    const [isAddressPopupVisible, setIsAddressPopupVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isResponseLoading, setIsResponseLoading] = useState(false);
    // addresses
    const [addresses, setAddresses] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(true);

    const showAddressPopup = () => {
        setIsAddressPopupVisible(true);
    };

    const closeAddressPopup = () => {
        setIsAddressPopupVisible(false);
    };

    const handleUseAddress = (address) => {
        setSelectedAddress(address);
        closeAddressPopup();  // Close the popup after selecting the address
    };

    return (
        <div className="container mx-auto px-[10px] mb-10 md:mb-20">
            <div className="flex justify-between my-3 md:my-6">
                <h3 className="text-black font-inter text-2xl md:text-[30px] font-semibold leading-10">Checkout</h3>
                <span onClick={() => setOpen(true)}
                      className="flex gap-1 items-center text-[#0094CF] font-inter text-sm font-medium leading-normal hover:cursor-pointer">
                    <FaArrowLeftLong/>
                    <p>Back to Cart</p>
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} style={{boxShadow: "0px 0px 24px 0px rgba(228, 237, 240, 0.65)"}}
                  className=" bg-[#FFF] rounded-lg flex flex-col md:flex-row">
                {/* left side start */}
                <div
                    className="w-full md:w-6/12 md:border-e-[0.5px] border-[#ECECEC] py-4 px-2 xs:py-6 xs:px-5 lg:py-[30px] lg:px-[32px]">


                    <div className="flex justify-between items-center md:mb-0">
                        <h3 className="text-black font-inter text-[20px] font-semibold leading-[20px] mb-4">
                            Shipping Information
                        </h3>

                        {/* For web, show the change address button to the right */}
                        <div className="hidden md:block">
                            <Button onClick={showAddressPopup} type="button">
                                Change Shipping Address
                            </Button>
                        </div>
                    </div>

                    {/* For mobile, show the change address button */}
                    <div className="block md:hidden mb-5">
                        <Button onClick={showAddressPopup} type='button' className="w-full">Change Shipping
                            Address</Button>
                    </div>

                    <div>
                        <div className="mb-5">
                            <label>
                                <span className="flex text-sm font-medium mb-3">
                                    Full Name
                                    <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                </span>
                            </label>
                            <input
                                {...register("name", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 50,
                                    pattern: /^[A-Za-z\s\-,'.]+$/,
                                })}
                                type="text"
                                placeholder="Enter your full name"
                                className="p-2 w-full rounded-sm bg-white border-[0.5px] text-[14px] border-[#bfbfbf]"
                            />
                            {errors.fullName && errors.fullName.type === "required" &&
                                <span className="text-red-600">Full Name is required</span>}
                            {errors.fullName && errors.fullName.type === "minLength" &&
                                <span className="text-red-600">Full Name should be at least 2 characters long</span>}
                            {errors.fullName && errors.fullName.type === "maxLength" &&
                                <span className="text-red-600">Full Name should not exceed 50 characters</span>}
                            {errors.fullName && errors.fullName.type === "pattern" &&
                                <span className="text-red-600">Please enter a valid Full Name</span>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                            {
                                isDropdownVisible &&
                                <>
                                    <div className="mb-5">
                                        <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Phone Number
                                        <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                    </span>
                                        </label>
                                        <input
                                            {...register("phone", {
                                                required: true,
                                                pattern: /^0\d{10}$/, // Regular expression for 11 digits starting with 0
                                            })}
                                            type="number" // Change type to text to allow leading zeros
                                            placeholder="Phone number"
                                            className="p-2 w-full rounded-sm bg-white border-[0.5px] text-[14px] border-[#bfbfbf]"
                                        />
                                        {errors.phone && errors.phone.type === "pattern" &&
                                            <p className="text-red-500">Phone number must start with 0 and be 11
                                                digits</p>}
                                        {errors.phone && errors.phone.type === "required" &&
                                            <span className="text-red-600">This field is required</span>}
                                    </div>
                                    <div className="mb-5">
                                        <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Email (Optional)
                                        {/* <FaStarOfLife size={6} className="text-[#F40F6F]" /> */}
                                    </span>
                                        </label>
                                        <input
                                            {...register("email", {
                                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for basic email format validation
                                            })}
                                            // onChange={() => setErrorFromAPI(null)}
                                            type="email"
                                            placeholder="Enter your email"
                                            className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-[14px] font-normal leading-normal  tracking-[-0.14px]"
                                        />
                                        {errors.email && errors.email.type === "pattern" &&
                                            <p className="text-red-500">Please enter a valid email address</p>}
                                        {errors.email && errors.email.type === "required" &&
                                            <span className="text-red-600">This field is required</span>}
                                    </div>

                                    <div className="mb-5 relative">
                                        <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        City
                                        <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                    </span>
                                        </label>
                                        {defaultAddressFromDB?.city_id ? "" :
                                            <DropDownListAndSelect options={cityList}
                                                                   placeholder={"Select City"}
                                                                   setSelectedValue={setSelectedCity}
                                                //setRemoveValue={setSelectedZone}
                                            />}
                                        {defaultAddressFromDB?.city_id && (
                                            <DropDownListAndSelect
                                                options={cityList}
                                                placeholder={"Select City"}
                                                defaultValue={{
                                                    value: defaultAddressFromDB?.city_id,
                                                    label: defaultAddressFromDB?.city_name,
                                                }}
                                                setSelectedValue={setSelectedCity}
                                                //setRemoveValue={setSelectedZone}
                                            />
                                        )}
                                        <div className="absolute bottom-0 w-full">
                                            {isCityListLoading && (
                                                <div className="w-full">
                                                    <Spin indicator={<LoadingOutlined style={{fontSize: 15}}/>}
                                                          className="w-full" size="small">
                                                        <Alert className="w-full h-10" message="" type="info"/>
                                                    </Spin>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-5 relative">
                                        <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Zone
                                        <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                    </span>
                                        </label>
                                        {defaultAddressFromDB?.zone_id ? "" :
                                            <DropDownListAndSelect options={zoneList}
                                                                   placeholder={"Please select the city to choose the zone."}
                                                                   setSelectedValue={setSelectedZone}
                                                //setRemoveValue={setSelectedArea}
                                            />}
                                        {defaultAddressFromDB?.zone_id && (
                                            <DropDownListAndSelect
                                                options={zoneList}
                                                placeholder={"Select Zone"}
                                                defaultValue={{
                                                    value: defaultAddressFromDB?.zone_id,
                                                    label: defaultAddressFromDB?.zone_name,
                                                }}
                                                setSelectedValue={setSelectedZone}
                                                //setRemoveValue={setSelectedArea}
                                            />
                                        )}
                                        <div className="absolute bottom-0 w-full">
                                            {isZoneLoading && (
                                                <div className="w-full">
                                                    <Spin indicator={<LoadingOutlined style={{fontSize: 15}}/>}
                                                          className="w-full" size="small">
                                                        <Alert className="w-full h-10" message="" type="info"/>
                                                    </Spin>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-5 relative">
                                        <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Area
                                        <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                    </span>
                                        </label>
                                        {defaultAddressFromDB?.area_id ? "" :
                                            <DropDownListAndSelect options={areaList}
                                                                   placeholder={"Please select the zone to choose the area."}
                                                                   setSelectedValue={setSelectedArea}/>}
                                        {defaultAddressFromDB?.area_id && (
                                            <DropDownListAndSelect
                                                options={areaList}
                                                placeholder={"Select Area"}
                                                defaultValue={{
                                                    value: defaultAddressFromDB?.area_id,
                                                    label: defaultAddressFromDB?.area_name,
                                                }}
                                                setSelectedValue={setSelectedArea}
                                            />
                                        )}
                                        <div className="absolute bottom-0 w-full">
                                            {isAreaLoading && (
                                                <div className="w-full">
                                                    <Spin indicator={<LoadingOutlined style={{fontSize: 15}}/>}
                                                          className="w-full" size="small">
                                                        <Alert className="w-full h-10" message="" type="info"/>
                                                    </Spin>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>

                        <div className="mb-5">
                            <label>
                                <span className="text-sm flex font-medium mb-3 text-black">
                                    Address
                                    <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                                </span>
                            </label>
                            <input
                                type="text"
                                {...register("address", {
                                    required: true,
                                    minLength: 8,
                                })}
                                placeholder="Enter your detailed address"
                                className="p-2 w-full rounded-sm bg-white border-[0.5px] text-[14px] border-[#bfbfbf]"
                            />
                            {errors.address && errors.address.type === "required" &&
                                <span className="text-red-600">This field is required</span>}
                            {errors.address && errors.address.type === "minLength" &&
                                <span className="text-red-600">Address must be at least 8 characters</span>}
                        </div>
                    </div>
                    <label
                        className="flex items-center hover:cursor-pointer gap-3 text-[#252728] font-inter text-sm font-normal leading-normal w-fit h-min mb-5"
                        onChange={() => setSaveInformationForNextTime((prev) => !prev)}>
                        <div className="relative flex items-center">
                            <input type="checkbox"
                                   className={`rounded h-4 w-4 ${saveInformationForNextTime == true ? "bg-[#5DC9F4] text-white" : "bg-white"} border border-[#0094CF] appearance-none`}/>
                            <BsCheck size={16} className="absolute top-0 text-white"/>
                        </div>
                        <p className="text-[#000000CC] font-inter text-sm font-medium leading-normal tracking-tighter">Save
                            this information for next time</p>
                    </label>
                    <div>
                        <h3 className="text-black font-inter text-xl font-semibold leading-[40px] md:mb-3">Shipping
                            Fee</h3>
                        {/*<h3 className="text-black font-inter text-xl font-semibold leading-[40px] md:mb-3">Choose Shipping Method</h3>*/}

                        <label
                            className="flex items-center hover:cursor-pointer gap-3 text-[#252728] font-inter text-sm font-normal leading-normal w-fit h-min mb-5"
                            //   onChange={() => setShippingMethod("insideDhaka")}
                        >
                            <div className="relative flex items-center">
                                <input type="checkbox" checked
                                       className={`rounded-full h-4 w-4 bg-[#5DC9F4] text-white border border-[#0094CF] appearance-none`}/>
                                <BsCheck size={16} className="absolute top-0 text-white"/>
                            </div>
                            <p className="text-black font-inter text-sm font-semibold leading-normal">
                                <span className="ps-1 whitespace-nowrap">Shipping charge: ৳ {deliveryCharge}</span>
                            </p>
                        </label>
                        {/*<label*/}
                        {/*    className="flex items-center hover:cursor-pointer gap-3 text-[#252728] font-inter text-sm font-normal leading-normal w-fit h-min mb-5"*/}
                        {/*    //   onChange={() => setShippingMethod("outSideDhaka")}*/}
                        {/*>*/}
                        {/*    <div className="relative flex items-center">*/}
                        {/*        <input type="checkbox"*/}
                        {/*               className={`rounded-full h-4 w-4 ${shippingMethod == "outSideDhaka" ? "bg-[#5DC9F4] text-white" : "bg-white"} border border-[#0094CF] appearance-none`}/>*/}
                        {/*        <BsCheck size={16} className="absolute top-0 text-white"/>*/}
                        {/*    </div>*/}
                        {/*    <p className="text-black font-inter text-sm font-semibold leading-normal">*/}
                        {/*        Outside Dhaka*/}
                        {/*        <span className="ps-1 whitespace-nowrap">(Delivery charge: ৳ {parseInt(shippingChargeQuery?.data?.outside_city).toFixed(0)})</span>*/}
                        {/*    </p>*/}
                        {/*</label>*/}
                        <div>
                            <p className="text-black font-inter text-sm font-medium leading-normal mb-1 md:mb-3">Order
                                Notes (Optional)</p>

                            <textarea name="order_notes" {...register("order_notes")} placeholder="Write your message"
                                      rows="4" className="border text-[14px] rounded w-full p-2"></textarea>
                        </div>
                    </div>
                </div>
                {/* left side end */}
                {/* right side start */}
                <div className="w-full md:w-6/12 p-2 xs:p-5 s lg:p-8">
                    <div className="p-3 md:p-4 bg-[#EEFAFF] rounded-md">
                        <div
                            className="bg-[#fff] rounded-4px] py-2 px-2 xs:py-3 xs:px-3 lg:py-5 lg:px-6 mb-4 rounded-[4px]">
                            <h3 className="text-black font-inter text-xl font-semibold leading-normal md:mb-2">Your
                                Order Summary</h3>
                            {/* per item start */}
                            {cartData?.status == true &&
                                (productId ? (
                                    <>
                                        {buyNowProductFiltered?.map((item, index) => (
                                            <div key={index} className="flex items-center border-b-[0.3px]  py-3">
                                                <div className="w-full">
                                                    <p className="text-[#000000CC] font-inter text-sm font-medium leading-[18px] tracking-[-0.14px] mb-[6px] w-11/12">
                                                        {item?.product?.name && (item?.product?.name?.length > 35 ? `${item?.product?.name.slice(0, 35)}...` : item?.product?.name)}
                                                        {item?.combo_product?.name && (item?.combo_product?.name?.length > 35 ? `${item?.combo_product?.name.slice(0, 35)}...` : item?.combo_product?.name)}
                                                    </p>
                                                    <div className="flex items-center">
                                                        <span
                                                            className="text-[#000000a6] font-inter text-xs font-normal leading-normal flex items-center gap-1">
                                                            Qty: <p
                                                            className="text-black font-inter text-xs font-semibold leading-normal">{item?.quantity}</p>
                                                        </span>{" "}
                                                        {item?.shade?.id ? (
                                                            <>
                                                                <Divider type="vertical"/>
                                                                <div className="flex items-center gap-1">
                                                                    <div className="h-4 w-4  rounded overflow-hidden">
                                                                        <ImageURL image={item?.shade?.image}
                                                                                  className={"object-fill w-full h-full"}/>
                                                                    </div>
                                                                    <p className="text-[#000000CC]  font-inter text-xs font-medium leading-normal">{item?.shade?.name}</p>
                                                                </div>
                                                            </>
                                                        ) : item?.size?.id ? (
                                                            <>
                                                                <Divider type="vertical"/>
                                                                <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                                                                    <span
                                                                        className="text-[#000000CC] font-medium">{item?.size?.name}</span>
                                                                </p>
                                                            </>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className="text-[#000000CC] text-right font-inter text-sm font-semibold leading-normal whitespace-nowrap">
                                                    {item?.product && (
                                                        <div className="flex gap-2 items-center">
                                                            {/* <p className="text-[#000000A6] text-sm  md:text-xs font-medium line-through">
                                                                ৳
                                                                {item?.shade?.product_shade?.shade_price
                                                                    ? parseFloat(item?.shade?.product_shade?.shade_price * item?.quantity).toFixed(2)
                                                                    : parseFloat(item?.size?.product_size?.size_price * item?.quantity).toFixed(2)}
                                                            </p> */}
                                                            <p className="text-black text-xs md:text-base font-bold leading-normal">
                                                                ৳
                                                                {item?.shade?.product_shade?.discounted_price
                                                                    ? parseFloat(item?.shade?.product_shade?.discounted_price * item?.quantity).toFixed(2)
                                                                    : parseFloat(item?.size?.product_size?.discounted_price * item?.quantity).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {item?.combo_product?.discounted_price && (
                                                        <p className="text-black text-xs md:text-base font-bold leading-normal">৳{(parseFloat(item?.combo_product?.discounted_price) * parseFloat(item?.quantity)).toFixed(2)}</p>
                                                    )}
                                                </div>
                                                {/* <p className="text-[#000000CC] text-right font-inter text-sm font-semibold leading-normal whitespace-nowrap">
                                                        ৳ 1,450
                                                    </p> */}
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {cartData?.data?.cartData?.map((item, index) => (
                                            <div key={index} className="flex items-center border-b-[0.3px]  py-3">
                                                <div className="w-full">
                                                    <p className="text-[#000000CC] font-inter text-sm font-medium leading-[18px] tracking-[-0.14px] mb-[6px] w-11/12">
                                                        {item?.product?.name && (item?.product?.name?.length > 35 ? `${item?.product?.name.slice(0, 35)}...` : item?.product?.name)}
                                                        {item?.combo_product?.name && (item?.combo_product?.name?.length > 35 ? `${item?.combo_product?.name.slice(0, 35)}...` : item?.combo_product?.name)}
                                                    </p>
                                                    <div className="flex items-center">
                                                        <span
                                                            className="text-[#000000a6] font-inter text-xs font-normal leading-normal flex items-center gap-1">
                                                            Qty: <p
                                                            className="text-black font-inter text-xs font-semibold leading-normal">{item?.quantity}</p>
                                                        </span>{" "}
                                                        {item?.shade?.id ? (
                                                            <>
                                                                <Divider type="vertical"/>
                                                                <div className="flex items-center gap-1">
                                                                    <div className="h-4 w-4  rounded overflow-hidden">
                                                                        <ImageURL image={item?.shade?.image}
                                                                                  className={"object-fill w-full h-full"}/>
                                                                    </div>
                                                                    <p className="text-[#000000CC]  font-inter text-xs font-medium leading-normal">{item?.shade?.name}</p>
                                                                </div>
                                                            </>
                                                        ) : item?.size?.id ? (
                                                            <>
                                                                <Divider type="vertical"/>
                                                                <p className="whitespace-nowrap text-[#000000A6] text-opacity-65 font-inter text-xs font-normal leading-normal">
                                                                    <span
                                                                        className="text-[#000000CC] font-medium">{item?.size?.name}</span>
                                                                </p>
                                                            </>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className="text-[#000000CC] text-right font-inter text-sm font-semibold leading-normal whitespace-nowrap">
                                                    {item?.product && (
                                                        <div className="flex gap-2 items-center">
                                                            {/* <p className="text-[#000000A6] text-sm  md:text-xs font-medium line-through">
                                                                ৳
                                                                {item?.shade?.product_shade?.shade_price
                                                                    ? parseFloat(item?.shade?.product_shade?.shade_price * item?.quantity).toFixed(2)
                                                                    : parseFloat(item?.size?.product_size?.size_price * item?.quantity).toFixed(2)}
                                                            </p> */}
                                                            <p className="text-black text-xs md:text-base font-bold leading-normal">
                                                                ৳
                                                                {/* {item?.shade?.product_shade?.discounted_price
                                                                    ? parseFloat(item?.shade?.product_shade?.discounted_price * item?.quantity).toFixed(2)
                                                                    : parseFloat(item?.size?.product_size?.discounted_price * item?.quantity).toFixed(2)} */}
                                                                {(parseFloat(item?.discounted_price) * parseFloat(item?.quantity)).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {item?.combo_product?.discounted_price && (
                                                        <p className="text-black text-xs md:text-base font-bold leading-normal">৳{(parseFloat(item?.combo_product?.discounted_price) * parseFloat(item?.quantity)).toFixed(2)}</p>
                                                    )}
                                                </div>
                                                {/* <p className="text-[#000000CC] text-right font-inter text-sm font-semibold leading-normal whitespace-nowrap">
                                    ৳ 1,450
                                </p> */}
                                            </div>
                                        ))}
                                    </>
                                ))}

                            {/* per item end*/}

                            <div className="border-b-[0.3px]">
                                <div className="flex justify-between my-1 xs:my-3">
                                    <p className="text-black font-inter text-sm md:text-base font-medium leading-normal">Items
                                        Subtotal</p>
                                    <p className="text-black text-right font-inter text-sm md:text-base font-semibold leading-normal">৳ {(subTotalPrice - discountTotalPrice).toFixed(2)}</p>
                                </div>
                                {/* <div className="flex justify-between my-1 xs:my-3">
                                    <p className="text-black font-inter text-sm md:text-base font-medium leading-normal">Discount</p>
                                    <p className="text-black text-right font-inter text-sm md:text-base font-semibold leading-normal">৳ -{discountTotalPrice.toFixed(2)}</p>
                                </div> */}

                                {cartData?.data?.uptoSaleDiscount > 0 && (
                                    <div className="flex justify-between my-1 xs:my-3">
                                        <p className="text-black font-inter text-sm md:text-base font-medium leading-normal">Discount
                                            (Upto sale offer)</p>
                                        <p className="text-black text-right font-inter text-sm md:text-base font-semibold leading-normal">৳
                                            -{(cartData?.data?.uptoSaleDiscount).toFixed(2)}</p>
                                    </div>
                                )}

                                {storedCouponDiscountAmount > 0 && (
                                    <div className="flex justify-between my-1 xs:my-3">
                                        <p className="text-black font-inter text-sm md:text-base font-medium leading-normal">Coupon
                                            Discount</p>
                                        <p className="text-black text-right font-inter text-sm md:text-base font-semibold leading-normal">৳
                                            -{storedCouponDiscountAmount}</p>
                                    </div>
                                )}
                                {savedRewardPoints > 0 && (
                                    <div className="flex justify-between my-1 xs:my-3">
                                        <p className="text-black font-inter text-sm md:text-base font-medium leading-normal">Reward
                                            points discount</p>
                                        <p className="text-black text-right font-inter text-sm md:text-base font-semibold leading-normal">৳
                                            -{savedRewardPoints * getRewardPointsDataQuery?.data?.reward_point_value}</p>
                                    </div>
                                )}

                                <div className="flex justify-between my-1 xs:my-3">
                                    <p className="text-black font-inter text-sm md:text-base font-medium leading-normal">
                                        Shipping Fee
                                        {/*<span className="text-[#000000CC] ">{shippingMethod == "insideDhaka" ? <span className="ps-1">(Inside Dhaka)</span> :*/}
                                        {/*    <span className="ps-1">(Outside Dhaka)</span>}</span>*/}
                                    </p>
                                    <p className="text-black text-right font-inter text-sm md:text-base font-semibold leading-normal">
                                        {shippingFee}
                                    </p>
                                </div>

                                {cartData?.data?.eligible_delivery_free && (
                                    <div className="flex justify-between my-1 xs:my-3">
                                        <p className="text-black font-inter text-sm md:text-base font-medium leading-normal">Shipping
                                            Discount</p>
                                        <p className="text-black text-right font-inter text-sm md:text-base font-semibold leading-normal">
                                            ৳ - {shippingFee}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between my-2 xs:my-3">
                                <p className="text-black font-inter text-lg font-semibold leading-normal tracking-[-0.18px]">Grand
                                    Total</p>
                                <p className="text-black text-right font-inter text-lg font-bold leading-normal">
                                    ৳
                                    {(
                                        subTotalPrice -
                                        discountTotalPrice -
                                        cartData?.data?.uptoSaleDiscount -
                                        storedCouponDiscountAmount -
                                        savedRewardPoints * getRewardPointsDataQuery?.data?.reward_point_value +
                                        shippingFee -
                                        (cartData?.data?.eligible_delivery_free && shippingFee)
                                    ).toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#fff] rounded-4px] pt-2 px-2 md:pt-5 md:px-6 rounded-[4px] mb-[17px]">
                            <h3 className="text-black font-inter text-xl font-semibold leading-normal md:mb-2">Choose
                                Payment Method</h3>
                            <label className="flex items-start gap-2 border-b-[0.3px] py-3 hover:cursor-pointer"
                                   onChange={() => setPaymentMethod("SSL")}>
                                <div className="relative flex items-center mt-[6px]">
                                    <input type="checkbox"
                                           className={`rounded-full h-4 w-4 ${paymentMethod == "SSL" ? "bg-[#5DC9F4] text-white" : "bg-white"} border border-[#0094CF] appearance-none`}/>
                                    <BsCheck size={16} className="absolute top-0 text-white"/>
                                </div>
                                <div>
                                    <p className="text-black font-inter xs:text-lg font-medium leading-normal">Online
                                        payment via SslCommerz</p>
                                    <p className="text-[#00000099] font-inter text-xs font-normal leading-[18px]">The
                                        largest payment gateway aggregator in Bangladesh and a pioneer in the
                                        FinTech industry since 2010</p>
                                </div>
                            </label>
                            {onlySSLPaymentForOutsideDhaka ? (
                                <label className="flex items-start gap-2 py-3 hover:cursor-not-allowed">
                                    <div className="relative flex items-center mt-[6px]">
                                        <input type="checkbox"
                                               className={`rounded-full h-4 w-4 ${paymentMethod == "COD" ? "bg-[#5DC9F4] text-white" : "bg-white"} border border-[#0094CF] appearance-none`}/>
                                        <BsCheck size={16} className="absolute top-0 text-white"/>
                                    </div>
                                    <div>
                                        <div className="flex items-center flex-wrap">
                                            <p className="text-black font-inter xs:text-lg font-medium leading-normal whitespace-nowrap">Cash
                                                on delivery </p>
                                            <p className="text-[10px] xs:text-sm xs:ms-1 whitespace-nowrap text-red-400">(COD
                                                is not available)</p>
                                        </div>
                                        <p className="text-[#00000099] font-inter text-xs font-normal leading-[18px]">Pay
                                            with cash upon delivery</p>
                                    </div>
                                </label>
                            ) : (
                                <label className="flex items-start gap-2 py-3 hover:cursor-pointer"
                                       onChange={() => setPaymentMethod("COD")}>
                                    <div className="relative flex items-center mt-[6px]">
                                        <input type="checkbox"
                                               className={`rounded-full h-4 w-4 ${paymentMethod == "COD" ? "bg-[#5DC9F4] text-white" : "bg-white"} border border-[#0094CF] appearance-none`}/>
                                        <BsCheck size={16} className="absolute top-0 text-white"/>
                                    </div>
                                    <div>
                                        <p className="text-black font-inter xs:text-lg font-medium leading-normal">Cash
                                            on delivery (COD)</p>
                                        <p className="text-[#00000099] font-inter text-xs font-normal leading-[18px]">Pay
                                            with cash upon delivery</p>
                                    </div>
                                </label>
                            )}
                        </div>

                        <label
                            className="flex items-start hover:cursor-pointer gap-3 text-[#252728] font-inter text-sm font-normal leading-normal w-fit h-min mb-5"
                            onChange={() => setTermsAndConditions((prev) => !prev)}>
                            <div className="relative flex items-center mt-[6px]">
                                <input type="checkbox"
                                       className={`rounded h-4 w-4 ${termsAndConditions == true ? "bg-[#5DC9F4] text-white" : "bg-white"} border border-[#0094CF] appearance-none`}/>
                                <BsCheck size={16} className="absolute top-0 text-white"/>
                            </div>
                            <p className="text-[#000000CC] font-inter text-base font-normal leading-normal">
                                I’ve read and accept the <span
                                className="text-black font-semibold">T&Cs</span> and <span
                                className="text-black font-semibold"> Privacy Policy</span>
                            </p>
                        </label>
                        <>
                            {termsAndConditions && paymentMethod && cartDataArray?.length > 0 ? (
                                <Button type={"submit"} className={"mb-2 py-3 w-full "}>
                                    Place Order
                                </Button>
                            ) : (
                                <div
                                    className={"mb-2 py-3 w-full text-center text-sm text-white hover:cursor-not-allowed bg-[#d4f3ff]"}>Place
                                    Order</div>
                            )}
                        </>
                    </div>
                </div>
                {/* right side end*/}
            </form>

            {/* Ant Design Modal for Address selection */}
            <Modal
                title="Select Shipping Address"
                visible={isAddressPopupVisible}
                onCancel={closeAddressPopup}
                footer={null}
            >
                <div>
                    <div className="pt-3 pb-3 px-1 xs:px-3 md:mb-3 md:pt-3 lg:pt-6 md:px-6 lg:px-8">
                        {/* per order start  */}
                        {userAddress?.status === true && userAddress?.data?.length > 0 ? (
                            <>
                                {userAddress?.data?.map((address) => (
                                    <div key={address.id}
                                         className="border border-[#E2E8F0] bg-[#fff] rounded-lg p-6 relative mb-3">
                                        <div className="border-b-2 border-[#ECECEC] pb-1">
                                            <p className="text-black font-inter text-lg font-medium leading-normal mb-5">{address.name}</p>

                                            <span
                                                className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                                                <IoCall size={12}/>
                                                <p>{address.phone}</p>
                                            </span>

                                            {address?.email && (
                                                <span
                                                    className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                                                    <MdEmail size={14}/>
                                                    <p>{address.email}</p>
                                                </span>
                                            )}

                                            <span
                                                className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                                                <ImLocation2 size={12}/>
                                                <p><b>Address : </b>{address.address}</p>
                                            </span>

                                            {address?.city_name && (
                                                <span
                                                    className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                                                    <ImLocation2 size={12}/>
                                                    <p><b>City Namee : </b>{address.city_name}</p>
                                                </span>
                                            )}

                                            {address?.zone_name && (
                                                <span
                                                    className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                                                    <ImLocation2 size={12}/>
                                                    <p><b>Zone Name : </b>{address.zone_name}</p>
                                                </span>
                                            )}

                                            {address?.area_name && (
                                                <span
                                                    className="flex items-center gap-3 text-black font-inter text-sm font-medium leading-normal mb-3">
                                                    <ImLocation2 size={12}/>
                                                    <p><b>Area Name : </b>{address.area_name}</p>
                                                </span>
                                            )}

                                        </div>
                                        <div className="flex flex-wrap items-center gap-1">
                                            <label
                                                className="flex items-center hover:cursor-pointer gap-3 text-[#252728] font-inter text-sm font-normal leading-normal w-fit h-min mt-3"
                                            >
                                                <Button onClick={() => {
                                                    setIsDropdownVisible(false);

                                                    setDefaultAddressFromDB(address);

                                                    // close model
                                                    closeAddressPopup();
                                                }}>Use this shipping address</Button>
                                            </label>
                                            {isResponseLoading && address?.id == selectedCheckboxes &&
                                                <ProgressBar visible={true} height="30" width="50" color="#5DC9F4"
                                                             ariaLabel="progress-bar-loading" wrapperStyle={{}}
                                                             wrapperClass=""/>}
                                        </div>

                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="min-h-[calc(100vh-70vh)]">
                                <p className="text-red-500 text-center mt-5 text-xl">No address has been added yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>

            <ScrollRestoration/>
        </div>
    );
};

export default Checkout;
