import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {FaStarOfLife} from "react-icons/fa6";
import {SearchSelectLabelLess} from "../../../components/SearchSelectLabelLess/SearchSelectLabelLess";
import Button from "../../../components/ui/Button";
import {useNavigate, useParams} from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import showToast from "../../../utilities/showToast";
import useUserAddress from "../../../hooks/useUserAddress";
import {BsCheck} from "react-icons/bs";
import {ReactSelect} from "../../../components/ReactSelect/ReactSelect";
import {Bars} from "react-loader-spinner";
import {useAreaQuery, useCityQuery, useZoneQuery} from "../../../redux/features/pathao/pathaoApi";
import DropDownListAndSelect from "../../../components/DropDownListAndSelect/DropDownListAndSelect";
import {Alert, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const EditAddress = () => {
    const [isEmailErrorFromApi, setIsEmailErrorFromApi] = useState("");
    const [isPhoneErrorFromApi, setIsPhoneErrorFromApi] = useState("");
    const [isResponseLoading, setIsResponseLoading] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState(false);
    const {userAddress, isUserAddressLoading, refetchAddress} = useUserAddress();
    const [cityList, setCityList] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [zoneList, setZoneList] = useState([]);
    const [selectedZone, setSelectedZone] = useState({});
    const [areaList, setAreaList] = useState([]);
    const [selectedArea, setSelectedArea] = useState({});
    const [isZoneLoading, setIsZoneLoading] = useState(false);
    const [isAreaLoading, setIsAreaLoading] = useState(false);
    const {data: cityQuery, isLoading: isCityListLoading} = useCityQuery();
    // const { data: ZoneQuery, isLoading: isZoneListLoading } = useZoneQuery(selectedCity?.selected_item_id, { skip: !selectedCity.selected_item_id });
    // const { data: areaQuery, isLoading: isAreaListLoading } = useAreaQuery(selectedZone?.selected_item_id, { skip: !selectedZone.selected_item_id });

    useEffect(() => {
        if (cityQuery?.status === true) {
            const result = cityQuery?.data?.map((item) => ({
                value: item.city_id,
                label: item.city_name,
            }));
            setCityList(result);
        }
    }, [cityQuery]);

    // useEffect(() => {
    //     if (ZoneQuery?.status === true) {
    //         const result = ZoneQuery?.data?.map((item) => ({
    //             value: item.zone_id,
    //             label: item.zone_name,
    //         }));
    //         setZoneList(result);
    //     }
    // }, [selectedCity, ZoneQuery]);

    // useEffect(() => {
    //     if (areaQuery?.status === true) {
    //         const result = areaQuery?.data?.map((item) => ({
    //             value: item.area_id,
    //             label: item.area_name,
    //         }));
    //         setAreaList(result);
    //     }
    // }, [selectedZone, areaQuery]);

    useEffect(() => {
        if (selectedCity?.selected_item_id) {
            setIsZoneLoading(true);
            setZoneList([]);
            setAreaList([]);
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

    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    const selectedAddressForEdit = userAddress?.data?.find((address) => address?.id == id);


    useEffect(() => {
        setValue("name", selectedAddressForEdit?.name);
        setValue("phone", selectedAddressForEdit?.phone);
        setValue("email", selectedAddressForEdit?.email);
        setValue("address", selectedAddressForEdit?.address);
        if (selectedAddressForEdit?.city_id) {
            setSelectedCity({
                selected_item_id: selectedAddressForEdit?.city_id,
                selected_item_name: selectedAddressForEdit?.city_name,
            });
        }
        if (selectedAddressForEdit?.zone_id) {
            setSelectedZone({
                selected_item_id: selectedAddressForEdit?.zone_id,
                selected_item_name: selectedAddressForEdit?.zone_name,
            });
        }
        if (selectedAddressForEdit?.area_id) {
            setSelectedArea({
                selected_item_id: selectedAddressForEdit?.area_id,
                selected_item_name: selectedAddressForEdit?.area_name,
            });
        }
    }, [selectedAddressForEdit]);

    const onSubmit = (data) => {
        let status;
        if (userAddress?.data && userAddress?.data?.length < 1) {
            status = 1;
        } else {
            status = selectedCheckboxes === true ? 1 : 0;
        }

        if (selectedCity?.selected_item_id == undefined) {
            showToast("Please select the correct City", "error");
        } else if (selectedZone?.selected_item_id == undefined) {
            showToast("Please select the correct Zone", "error");
        } else if (selectedArea?.selected_item_id == undefined) {
            showToast("Please select the correct Area", "error");
        } else {
            const addressData = {
                ...data,
                city_id: selectedCity?.selected_item_id,
                city_name: selectedCity?.selected_item_name,
                zone_id: selectedZone?.selected_item_id,
                zone_name: selectedZone?.selected_item_name,
                area_id: selectedArea?.selected_item_id,
                area_name: selectedArea?.selected_item_name,
                status: status,
            };
            setIsResponseLoading(true);
            axiosSecure
                .post(`edit_address/${id}`, addressData)
                .then((res) => {
                    if (res.data.status === true) {
                        setIsResponseLoading(false);
                        // addTokenToLocalStorage(res.data.data.token);
                        showToast(res?.data?.message);
                        refetchAddress();
                        navigate("/my-account/my-addresses");
                    } else {
                        setIsResponseLoading(false);
                        // Handle other cases if needed
                        showToast(res?.data?.data?.error, "error");
                    }
                })
                .catch((error) => {
                    setIsResponseLoading(false);
                    let errorMessageList = error.response.data.data;
                    showToast(errorMessageList?.error, "error");
                    showToast(errorMessageList?.district_id, "error");
                    showToast(errorMessageList?.city_id, "error");
                });
        }
    };

    return (
        <>
            <div style={{boxShadow: "0px 0px 8px 0px rgba(228, 237, 240, 0.65)"}} className="rounded-lg bg-white">
                <div className="py-3 ps-2 xs:ps-4 md:py-5 md:ps-8 border-b-[0.5px] border-[#ECECEC]">
                    <h3 className="text-black text-opacity-80 font-inter text-xl lg:text-2xl font-semibold leading-[33.5px]">My Addresses</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="pt-2 px-2 xs:px-3 md:mb-3 md:pt-6 md:px-8">
                    <p className="text-black font-Inter text-lg font-medium leading-normal mb-3 md:mb-5">Edit Address</p>
                    <div className="md:w-11/12 lg:w-10/12 xl:w-9/12">
                        <div className="mb-3">
                            <label>
                <span className="flex text-sm font-medium mb-1">
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
                            {errors.name && errors.name.type === "required" && <span className="text-red-600">Full Name is required</span>}
                            {errors.name && errors.name.type === "minLength" && (
                                <span className="text-red-600">Full Name should be at least 2 characters long</span>
                            )}
                            {errors.name && errors.name.type === "maxLength" && <span className="text-red-600">Full Name should not exceed 50 characters</span>}
                            {errors.name && errors.name.type === "pattern" && <span className="text-red-600">Please enter a valid Full Name (text only)</span>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                            <div className="mb-3">
                                <label>
                  <span className="flex text-sm font-medium mb-1">
                    Phone
                    <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                  </span>
                                </label>
                                <input
                                    {...register("phone", {
                                        required: true,
                                        pattern: /^0\d{10}$/, // Regular expression for 11 digits starting with 0
                                    })}
                                    onChange={() => setIsPhoneErrorFromApi("")}
                                    type="number" // Change type to text to allow leading zeros
                                    placeholder="Enter your phone number"
                                    className="p-2 w-full rounded-sm text-[14px] bg-white border-[0.5px] border-[#bfbfbf]"
                                />
                                {isPhoneErrorFromApi && <p className="text-red-500">{isPhoneErrorFromApi}</p>}
                                {errors.phone && errors.phone.type === "pattern" && <p className="text-red-500">Phone number must start with 0 and be 11 digits</p>}
                                {errors.phone && errors.phone.type === "required" && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label>
                  <span className="flex text-sm font-medium mb-1">
                    Email (Optional)
                      {/* <FaStarOfLife size={6} className="text-[#F40F6F]" /> */}
                  </span>
                                </label>
                                <input
                                    {...register("email", {
                                        // required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for basic email format validation
                                    })}
                                    onChange={() => setIsEmailErrorFromApi("")}
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf] text-black  text-[14px] font-normal leading-normal  tracking-[-0.14px]"
                                />
                                {isEmailErrorFromApi && <p className="text-red-500">{isEmailErrorFromApi}</p>}
                                {errors.email && errors.email.type === "pattern" && <p className="text-red-500">Please enter a valid email address</p>}
                                {errors.email && errors.email.type === "required" && <span className="text-red-600">This field is required</span>}
                            </div>
                            {/* <div className="mb-5">
                                <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        City
                                        <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                    </span>
                                </label>
                                <ReactSelect
                                    data={cityList}
                                    defaultValue={{ value: selectedAddressForEdit?.city_id, label: selectedAddressForEdit?.city_name }}
                                    isDisabled={isCityListLoading || isZoneListLoading}
                                    isClearable={false}
                                    setSelectedValue={setSelectedCity}
                                />
                            </div> */}

                            <div className="mb-5 relative">
                                <label>
                  <span className="flex text-sm font-medium mb-1">
                    City
                    <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                  </span>
                                </label>
                                {selectedAddressForEdit?.city_id ? (
                                    ""
                                ) : (
                                    <DropDownListAndSelect
                                        options={cityList}
                                        placeholder={"Select City"}
                                        setSelectedValue={setSelectedCity}
                                        setRemoveValue={setSelectedZone}
                                    />
                                )}
                                {selectedAddressForEdit?.city_id && (
                                    <DropDownListAndSelect
                                        options={cityList}
                                        placeholder={"Select City"}
                                        defaultValue={{value: selectedAddressForEdit?.city_id, label: selectedAddressForEdit?.city_name}}
                                        setSelectedValue={setSelectedCity}
                                        setRemoveValue={setSelectedZone}
                                    />
                                )}
                                <div className="absolute bottom-0 w-full">
                                    {isCityListLoading && (
                                        <div className="w-full">
                                            <Spin indicator={<LoadingOutlined style={{fontSize: 15}}/>} className="w-full" size="small">
                                                <Alert className="w-full h-10" message="" type="info"/>
                                            </Spin>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* <div className="mb-5">
                                <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Zone
                                        <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                    </span>
                                </label>
                                <ReactSelect
                                    data={zoneList}
                                    defaultValue={{ value: selectedAddressForEdit?.zone_id, label: selectedAddressForEdit?.zone_name }}
                                    isDisabled={isZoneListLoading || selectedCity?.selected_item_id ? false : true}
                                    isClearable={false}
                                    setSelectedValue={setSelectedZone}
                                />
                            </div> */}

                            <div className="mb-5 relative">
                                <label>
                  <span className="flex text-sm font-medium mb-1">
                    Zone
                    <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                  </span>
                                </label>
                                {selectedAddressForEdit?.zone_id ? (
                                    ""
                                ) : (
                                    <DropDownListAndSelect
                                        options={zoneList}
                                        placeholder={"Please select the city to choose the zone."}
                                        setSelectedValue={setSelectedZone}
                                        setRemoveValue={setSelectedArea}
                                    />
                                )}
                                {selectedAddressForEdit?.zone_id && (
                                    <DropDownListAndSelect
                                        options={zoneList}
                                        placeholder={"Select Zone"}
                                        defaultValue={{value: selectedAddressForEdit?.zone_id, label: selectedAddressForEdit?.zone_name}}
                                        setSelectedValue={setSelectedZone}
                                        setRemoveValue={setSelectedArea}
                                    />
                                )}
                                <div className="absolute bottom-0 w-full">
                                    {isZoneLoading && (
                                        <div className="w-full">
                                            <Spin indicator={<LoadingOutlined style={{fontSize: 15}}/>} className="w-full" size="small">
                                                <Alert className="w-full h-10" message="" type="info"/>
                                            </Spin>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* <div className="mb-5">
                                <label>
                                    <span className="flex text-sm font-medium mb-3">
                                        Area
                                        <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                    </span>
                                </label>
                                <ReactSelect
                                    data={areaList}
                                    defaultValue={{ value: selectedAddressForEdit?.area_id, label: selectedAddressForEdit?.area_name }}
                                    isDisabled={isAreaListLoading || selectedZone?.selected_item_id ? false : true}
                                    isClearable={false}
                                    setSelectedValue={setSelectedArea}
                                />
                            </div> */}
                            <div className="mb-5 relative">
                                <label>
                  <span className="flex text-sm font-medium mb-1">
                    Area
                    <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                  </span>
                                </label>
                                {selectedAddressForEdit?.area_id ? (
                                    ""
                                ) : (
                                    <DropDownListAndSelect
                                        options={areaList}
                                        placeholder={"Please select the zone to choose the area."}
                                        setSelectedValue={setSelectedArea}
                                    />
                                )}
                                {selectedAddressForEdit?.area_id && (
                                    <DropDownListAndSelect
                                        options={areaList}
                                        placeholder={"Select Area"}
                                        defaultValue={{
                                            value: selectedAddressForEdit?.area_id,
                                            label: selectedAddressForEdit?.area_name,
                                        }}
                                        setSelectedValue={setSelectedArea}
                                    />
                                )}
                                <div className="absolute bottom-0 w-full">
                                    {isAreaLoading && (
                                        <div className="w-full">
                                            <Spin indicator={<LoadingOutlined style={{fontSize: 15}}/>} className="w-full" size="small">
                                                <Alert className="w-full h-10" message="" type="info"/>
                                            </Spin>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* {isCityListLoading && (
                                <div className="mb-3 md:mb-5 flex items-end justify-center pb-2">
                                    <Bars
                                        height="40"
                                        width="80"
                                        color="#5DC9F4"
                                        ariaLabel="bars-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </div>
                            )}
                            {isZoneListLoading && (
                                <div className="mb-3 md:mb-5 flex items-end justify-center pb-2">
                                    <Bars
                                        height="40"
                                        width="80"
                                        color="#5DC9F4"
                                        ariaLabel="bars-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </div>
                            )}
                            {isAreaListLoading && (
                                <div className="mb-3 md:mb-5 flex items-end justify-center pb-2">
                                    <Bars
                                        height="40"
                                        width="80"
                                        color="#5DC9F4"
                                        ariaLabel="bars-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </div>
                            )} */}
                        </div>
                        <div className="mb-3">
                            <label>
                <span className="text-sm flex font-medium mb-1 text-black">
                  Address
                  <FaStarOfLife size={6} className="text-[#F40F6F]"/>
                </span>
                            </label>
                            <input
                                type="text"
                                // defaultValue={BAddress}
                                {...register("address", {
                                    required: true,
                                    minLength: 8,
                                })}
                                // onChange={(e) => setValue("b_address", e.target.value)}
                                placeholder="Enter your detailed address"
                                className="p-2 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                            />

                            {errors.address && errors.address.type === "required" && <span className="text-red-600">This field is required</span>}
                            {errors.address && errors.address.type === "minLength" && <span className="text-red-600">Address must be at least 8 characters</span>}
                        </div>
                    </div>

                    <label
                        className="flex items-center hover:cursor-pointer gap-3 text-[#252728] font-inter text-sm font-normal leading-normal w-fit h-min mb-5"
                        onChange={() => setSelectedCheckboxes((prev) => !prev)}
                    >
                        <div className="relative flex items-center">
                            {/* <input
                                        type="checkbox"
                                        className={`rounded h-4 w-4 ${
                                            selectedCheckboxes == (address?.status) ? "bg-[#5DC9F4] text-white" : "bg-white"
                                        } border border-[#0094CF] appearance-none`}
                                    /> */}
                            <input
                                type="checkbox"
                                className={`rounded h-4 w-4 ${
                                    selectedCheckboxes == true ? "bg-[#5DC9F4] text-white" : "bg-white"
                                } border border-[#0094CF] appearance-none`}
                            />
                            <BsCheck size={16} className="absolute top-0 text-white"/>
                        </div>
                        <p className="text-[#000000CC] font-inter text-sm font-medium leading-normal tracking-tighter">Set as default shipping address</p>
                    </label>

                    <Button className="border mb-5 md:mb-10 px-8">Save</Button>
                </form>
            </div>
        </>
    );
};

export default EditAddress;
