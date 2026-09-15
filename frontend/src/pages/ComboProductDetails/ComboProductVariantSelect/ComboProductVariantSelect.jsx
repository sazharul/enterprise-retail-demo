import React, {useEffect, useState} from "react";
import {FaAngleDown, FaCheck} from "react-icons/fa6";
import ImageURL from "../../../components/ImageURL/ImageURL";
import Button from "../../../components/ui/Button";
import {Link} from "react-router-dom";

const ComboProductVariantSelect = ({itemList, index, setComboArray}) => {
    const [shadeName, setShadeName] = useState(false);
    const [selectedShadeIndex, setSelectedShadeIndex] = useState(0);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
    const [selectedShade, setSelectedShade] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [mainPrice, setMainPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    // const [comboArray, setComboArray] = useState([]);

    //
    //
    //

    useEffect(() => {
        if (selectedProduct) {
            setComboArray((prevComboArray) => {
                const updatedComboArray = prevComboArray.filter((item) => item.product_id !== selectedProduct.product_id);
                //
                //
                return [
                    ...updatedComboArray,
                    {
                        product_id: selectedProduct.product_id,
                        size_id: selectedProduct.size_id,
                        shade_id: selectedProduct.shade_id,
                    },
                ];
            });
        }
    }, [selectedProduct]);

    const handleSelectedShadeData = (id) => {
        // Assuming your product_shades array is stored in a variable called products
        const selectedShade = itemList?.combo_product_infos?.find((shade) => shade.shade_id == id);
        //
        if (selectedShade) {
            setSelectedShade(selectedShade);
            setSelectedProduct({
                ...selectedShade,
                selectedProductId: selectedShade.shade.id,
            });
            setSelectedImage(selectedShade?.shade?.image);
            setMainPrice(selectedShade?.shade_price);
            setDiscountedPrice(selectedShade?.discounted_price);
        }
    };

    const handleSelectedSizeData = (id) => {
        const selectedSize = itemList?.combo_product_infos?.find((size) => size.size_id == id);
        //
        if (selectedSize) {
            setSelectedSize(selectedSize);
            setSelectedProduct({
                ...selectedSize,
                selectedProductId: selectedSize.size.id,
            });
            setSelectedImage(selectedSize?.shade?.image);
            setMainPrice(selectedSize?.size_price);
            setDiscountedPrice(selectedSize?.discounted_price);
        }
    };

    useEffect(() => {
        if (itemList && itemList?.product?.variation_type == "shade") {
            const initialSelectedShadeId = itemList?.combo_product_infos[0]?.shade_id;
            if (initialSelectedShadeId) {
                handleSelectedShadeData(initialSelectedShadeId);
            }
        } else if (itemList && itemList?.product?.variation_type == "size") {
            const initialSelectedSizeId = itemList?.combo_product_infos[0]?.size_id;
            if (initialSelectedSizeId) {
                handleSelectedSizeData(initialSelectedSizeId);
            }
        }
    }, [itemList]);

    return (
        <div>
            {itemList?.product?.variation_type === "shade" ? (
                <div className="mb-4">
                    <Link to={`/product-details/${itemList?.product?.id}`}>
                        <p className="mb-1 sm:text-xl md:text-xl font-medium md:mb-3 md:leading-[28px] hover:cursor-pointer">
                            <span className="me-1">{index + 1}.</span>
                            {itemList?.product?.name}
                        </p>
                    </Link>
                    <div className="flex items-start gap-2">
                        {/* <div className="w-28 h-24 bg-red-500 rounded-md"></div> */}
                        <div className="w-28 h-24 rounded-md overflow-hidden">
                            <ImageURL image={selectedImage} className={"w-28 h-24 object-fill"}/>
                        </div>
                        <div className="border h-24 overflow-hidden overflow-y-auto slim-scroll p-2 w-full flex gap-2 flex-wrap">
                            {itemList?.combo_product_infos.map((item, index) => (
                                <div
                                    // className="w-9 h-9 rounded hover:cursor-pointer overflow-hidden relative"
                                    className={` rounded hover:cursor-pointer overflow-hidden relative ${
                                        item?.shade?.id == selectedShade?.shade_id
                                            ? "shadow-[rgba(0,0,15,0.5)_0px_0px_2px_2px] border-[2px] border-white w-[37px] h-[37px]"
                                            : "w-9 h-9"
                                    }`}
                                    key={index}
                                >
                                    <div
                                        className={`${
                                            index == selectedShadeIndex ? "block" : "hidden"
                                        } absolute top-0 left-0 w-full h-full flex justify-center items-center`}
                                    >
                                        <FaCheck className="text-white"/>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setSelectedShadeIndex(index);
                                            handleSelectedShadeData(item?.shade?.id);
                                        }}
                                    >
                                        <ImageURL image={item?.shade?.image} className={"w-9 h-9 object-fill"}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className="w-full border-[0.5px] my-2 md:my-3"></div> */}
                </div>
            ) : (
                <div className="mb-4">
                    <Link to={`/product-details/${itemList?.product?.id}`}>
                        <p className="mb-1 sm:text-xl md:text-xl font-medium md:mb-3 md:leading-[28px] hover:cursor-pointer">
                            <span className="me-1">{index + 1}.</span>
                            {itemList?.product?.name}
                        </p>
                    </Link>
                    <div className="flex items-start flex-wrap gap-2">
                        {itemList?.combo_product_infos?.map((item, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    setSelectedSizeIndex(index);
                                    handleSelectedSizeData(item?.size_id);
                                }}
                                className={`text-base font-medium px-2 py-1 rounded-md text-black tracking-[-0.16px] ${
                                    index == selectedSizeIndex ? "bg-primary-color text-white" : ""
                                }`}
                                variant="bordered"
                            >
                                {item?.size?.name}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            <div className="w-full border-[0.1px] my-2 md:my-3 border-[#ECECEC]"></div>
        </div>
    );
};

export default ComboProductVariantSelect;
