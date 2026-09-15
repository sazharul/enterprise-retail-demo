import React, {useState} from "react";
import DropDownForSort from "../DropDownForSort/DropDownForSort";
import DropDownMenuItem from "../DropDownMenuItem/DropDownMenuItem";
import {
    useBenefitListQuery,
    useBrandListQuery,
    useCategoryListQuery,
    useColorListQuery,
    useConcernListQuery,
    useCountryListQuery,
    useCoverageListQuery,
    useFinishListQuery,
    useFormulationListQuery,
    useGenderListQuery,
    useIngredientListQuery,
    usePackSizeListQuery,
    usePreferenceListQuery,
    useSkinTypeListQuery,
} from "../../../redux/features/productFilter/productFilterApi";
import DropDownMenuItemSlug from "../DropDownMenuItem/DropDownMenuItemSlug.jsx";

const LeftSideFilterArea = ({link, starRatingList}) => {

    const [selectedBrands, setSelectedBrands] = useState([]);

    const {data: brandList, isLoading} = useBrandListQuery(undefined);
    const {data: colorList} = useColorListQuery(undefined);
    const {data: categoryList} = useCategoryListQuery(undefined);
    const {data: preferenceList} = usePreferenceListQuery(undefined);
    const {data: formulationList} = useFormulationListQuery(undefined);
    const {data: finishList} = useFinishListQuery(undefined);
    const {data: countryList} = useCountryListQuery(undefined);
    const {data: genderList} = useGenderListQuery(undefined);
    const {data: coverageList} = useCoverageListQuery(undefined);
    const {data: skinTypeList} = useSkinTypeListQuery(undefined);
    const {data: benefitList} = useBenefitListQuery(undefined);
    const {data: concernList} = useConcernListQuery(undefined);
    const {data: ingredientList} = useIngredientListQuery(undefined);
    const {data: packSizeList} = usePackSizeListQuery(undefined);

    const priceList = [
        {
            id: 1,
            name: "0 - 499",
        },
        {
            id: 2,
            name: "500 - 999",
        },
        {
            id: 3,
            name: "1000 - 1499",
        },
        {
            id: 4,
            name: "1500 - 1999",
        },
        {
            id: 5,
            name: "2000 & Above",
        },
    ];

    return (
        <>
            {/* left side menu start */}
            <div className="mb-2">
                <DropDownForSort title={"Sort By:"} link={link}/>
            </div>

            {brandList?.status == true && <DropDownMenuItemSlug items={brandList?.data} title={"Brand"} setSelectedItems={setSelectedBrands} link={link}/>}

            <DropDownMenuItem isSearch={false} items={priceList} title={"Price"} setSelectedItems={setSelectedBrands} link={link}/>
            {starRatingList?.length > 0 && <DropDownMenuItem isSearch={false} items={starRatingList} title={"Avg Customer Rating"} setSelectedItems={setSelectedBrands} link={link}/>}
            {colorList?.status == true && <DropDownMenuItem items={colorList?.data} title={"Color"} setSelectedItems={setSelectedBrands} link={link}/>}

            {categoryList?.status == true && <DropDownMenuItemSlug items={categoryList?.data} title={"Category"} setSelectedItems={setSelectedBrands} link={link}/>}

            {preferenceList?.status == true && <DropDownMenuItem items={preferenceList?.data} title={"Preference"} setSelectedItems={setSelectedBrands} link={link}/>}
            {formulationList?.status == true && <DropDownMenuItem items={formulationList?.data} title={"Formulation"} setSelectedItems={setSelectedBrands} link={link}/>}
            {finishList?.status == true && <DropDownMenuItem items={finishList?.data} title={"Finish"} setSelectedItems={setSelectedBrands} link={link}/>}
            {countryList?.status == true && <DropDownMenuItem items={countryList?.data} title={"Country"} setSelectedItems={setSelectedBrands} link={link}/>}
            {genderList?.status == true && <DropDownMenuItem items={genderList?.data} title={"Gender"} setSelectedItems={setSelectedBrands} link={link}/>}
            {coverageList?.status == true && <DropDownMenuItem items={coverageList?.data} title={"Coverage"} setSelectedItems={setSelectedBrands} link={link}/>}
            {skinTypeList?.status == true && <DropDownMenuItem items={skinTypeList?.data} title={"Skin type"} setSelectedItems={setSelectedBrands} link={link}/>}
            {benefitList?.status == true && <DropDownMenuItem items={benefitList?.data} title={"Benefit"} setSelectedItems={setSelectedBrands} link={link}/>}
            {concernList?.status == true && <DropDownMenuItem items={concernList?.data} title={"Concern"} setSelectedItems={setSelectedBrands} link={link}/>}
            {ingredientList?.status == true && <DropDownMenuItem items={ingredientList?.data} title={"Ingredient"} setSelectedItems={setSelectedBrands} link={link}/>}
            {packSizeList?.status == true && <DropDownMenuItem items={packSizeList?.data} title={"Pack size"} setSelectedItems={setSelectedBrands} link={link}/>}

            {/* left side menu end*/}
        </>
    );
};

export default LeftSideFilterArea;
