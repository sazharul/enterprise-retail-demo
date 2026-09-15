/* eslint-disable react/prop-types */
import {DownOutlined} from "@ant-design/icons";
import {Collapse} from "antd";
import React, {useEffect, useState} from "react";
import {BsCheck} from "react-icons/bs";
import {useForm} from "react-hook-form";
import "./DropDownMenuItem.scss";
import {useLocation, useNavigate} from "react-router-dom";

const DropDownMenuItem = ({items, title, isSearch = true, setSelectedItems}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [brandList, setBrandList] = useState([...items]);
    const [FilteredBrandList, setFilteredBrandList] = useState(brandList);
    const {register, handleSubmit, watch} = useForm();
    const onSubmit = (data) => {
    };
    const watchSearch = watch("search");
    useEffect(() => {
        if (watchSearch?.length > 0) {
            setFilteredBrandList(brandList.filter((brand) => brand.name.toLowerCase().includes(watchSearch.toLowerCase())));
        } else {
            setFilteredBrandList(brandList);
        }
    }, [watchSearch, brandList]);
    useEffect(() => {
        // Get the existing search parameters
        const searchParams = new URLSearchParams(location.search);
        const selectedCheckboxValues = searchParams.getAll(title.toLowerCase());

        // Set the initial state based on the URL parameters
        setSelectedCheckboxes(selectedCheckboxValues.map((value) => parseInt(value, 10)));
    }, [location.search, title]);

    const handleCheckboxChange = (key, title) => {
        const isSelected = selectedCheckboxes.includes(key);
        let updatedCheckboxes;

        if (!isSelected) {
            updatedCheckboxes = [...selectedCheckboxes, key];
        } else {
            updatedCheckboxes = selectedCheckboxes.filter((item) => item !== key);
        }

        // Get the existing search parameters
        const searchParams = new URLSearchParams(location.search);

        // Remove existing parameters for the given title
        searchParams.delete(title.toLowerCase());

        // Add updated parameters
        updatedCheckboxes.forEach((checkbox) => {
            searchParams.append(title.toLowerCase(), checkbox);
        });

        // Update the URL
        navigate(`${location?.pathname}?${searchParams.toString()}`);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Smooth scrolling animation
        });
        // Update state
        // setSelectedCheckboxes(updatedCheckboxes);
    };
    // let collapseOpen = selectedCheckboxes?.length > 0
    // 
    useEffect(() => {
        setSelectedItems([...selectedCheckboxes]);
    }, [selectedCheckboxes]);

    return (
        <div className="w-full rounded-sm bg-white">
            <div className="border-b-[1px]">
                {selectedCheckboxes?.length > 0 && (
                    <Collapse
                        defaultActiveKey={["1"]}
                        bordered={false}
                        size="small"
                        className="bg-white"
                        items={[
                            {
                                key: "1",
                                label: <p className={`ps-2 font-inter text-base font-medium leading-normal ${selectedCheckboxes?.length > 0 ? "text-[#41A9E7]" : "text-black"}`}>{title}</p>,
                                children: (
                                    <div className="">
                                        {isSearch && (
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <input type="text" placeholder="Search..." {...register("search")} className="w-full rounded-sm border border-[#00000040] p-2 mb-2"/>
                                            </form>
                                        )}

                                        <div className="max-h-[308px] overflow-hidden overflow-y-auto sidebar-scroll-control">
                                            {FilteredBrandList.map((Brand, i) => (
                                                <label
                                                    key={i}
                                                    className="flex items-center hover:cursor-pointer gap-3 text-[#252728] font-inter text-sm font-normal leading-normal w-fit h-min ms-1 mb-3"
                                                    onChange={() => handleCheckboxChange(Brand.id, title)}
                                                >
                                                    <div className="relative flex items-center">
                                                        <input type="checkbox"
                                                               className={`rounded h-4 w-4 ${selectedCheckboxes.includes(Brand.id) ? "bg-[#5DC9F4] text-white" : "bg-white"} border border-[#0094CF] appearance-none`}/>
                                                        <BsCheck size={16} className="absolute top-0 text-white"/>
                                                    </div>
                                                    {Brand?.name} {Brand?.products_count ? <span>({Brand.products_count})</span> : "(0)"}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ),
                            },
                        ]}
                        expandIcon={({isActive}) => <DownOutlined className="text-black font-bold" rotate={isActive ? 180 : 0}/>}
                        expandIconPosition="end"
                    />
                )}
                {selectedCheckboxes?.length > 0 || (
                    <Collapse
                        // defaultActiveKey={defaultActiveKey}
                        bordered={false}
                        size="small"
                        className="bg-white"
                        items={[
                            {
                                key: "1",
                                label: <p className={`ps-2 font-inter text-base font-medium leading-normal ${selectedCheckboxes?.length > 0 ? "text-[#41A9E7]" : "text-black"}`}>{title}</p>,
                                children: (
                                    <div className="">
                                        {isSearch && (
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <input type="text" placeholder="Search..." {...register("search")} className="w-full rounded-sm border border-[#00000040] p-2 mb-2"/>
                                            </form>
                                        )}

                                        <div className="max-h-[308px] overflow-hidden overflow-y-auto sidebar-scroll-control">
                                            {FilteredBrandList.map((Brand, i) => (
                                                <label
                                                    key={i}
                                                    className="flex items-center hover:cursor-pointer gap-3 text-[#252728] font-inter text-sm font-normal leading-normal w-fit h-min ms-1 mb-3"
                                                    onChange={() => handleCheckboxChange(Brand.id, title)}
                                                >
                                                    <div className="relative flex items-center">
                                                        <input type="checkbox"
                                                               className={`rounded h-4 w-4 ${selectedCheckboxes.includes(Brand.id) ? "bg-[#5DC9F4] text-white" : "bg-white"} border border-[#0094CF] appearance-none`}/>
                                                        <BsCheck size={16} className="absolute top-0 text-white"/>
                                                    </div>
                                                    {Brand?.name} {Brand?.products_count ? <span>({Brand.products_count})</span> : null}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ),
                            },
                        ]}
                        expandIcon={({isActive}) => <DownOutlined className="text-black font-bold" rotate={isActive ? 180 : 0}/>}
                        expandIconPosition="end"
                    />
                )}
            </div>
        </div>
    );
};

export default DropDownMenuItem;
