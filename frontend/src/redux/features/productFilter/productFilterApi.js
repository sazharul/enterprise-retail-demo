import {nodeBaseApi} from "../../api/nodeBaseApi";

const productFilterApi = nodeBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        productListWithCategory: builder.mutation({
            query: (data) => {
                return {
                    url: `/products-cat?page=${data?.pageNumber}`,
                    method: "POST",
                    body: data,
                }
            },
        }),
        productListWithFilter: builder.mutation({
            query: (data) => {
                return {
                    url: `/products?page=${data?.pageNumber}`,
                    method: "POST",
                    body: data,
                }
            },
        }),
        trendingSearch: builder.mutation({
            query: (data) => {
                return {
                    url: `trending-search`,
                    method: "POST",
                    body: data,
                }
            },
        }),
        searchNameList: builder.mutation({
            query: (data) => {
                return {
                    url: `products-name`,
                    method: "POST",
                    body: data,
                }
            },
        }),
        brandList: builder.query({
            query: () => ({
                url: "/brand", // brand
                method: "GET",
            }),
        }),
        colorList: builder.query({
            query: () => ({
                url: "/color", //product/color
                method: "GET",
            }),
        }),
        categoryList: builder.query({
            query: () => ({
                url: "category",
                method: "GET",
            }),
        }),
        preferenceList: builder.query({
            query: () => ({
                url: "/preference",
                method: "GET",
            }),
        }),
        formulationList: builder.query({
            query: () => ({
                url: "/formulation",
                method: "GET",
            }),
        }),
        finishList: builder.query({
            query: () => ({
                url: "/finish",
                method: "GET",
            }),
        }),
        countryList: builder.query({
            query: () => ({
                url: "/country",
                method: "GET",
            }),
        }),
        genderList: builder.query({
            query: () => ({
                url: "/gender",
                method: "GET",
            }),
        }),
        coverageList: builder.query({
            query: () => ({
                url: "/coverage",
                method: "GET",
            }),
        }),
        skinTypeList: builder.query({
            query: () => ({
                url: "/skin-type",
                method: "GET",
            }),
        }),
        benefitList: builder.query({
            query: () => ({
                url: "/benefit",
                method: "GET",
            }),
        }),
        concernList: builder.query({
            query: () => ({
                url: "/concern",
                method: "GET",
            }),
        }),
        ingredientList: builder.query({
            query: () => ({
                url: "/ingredient",
                method: "GET",
            }),
        }),
        packSizeList: builder.query({
            query: () => ({
                url: "/pack-size",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useProductListWithCategoryMutation,
    useProductListWithFilterMutation,
    useTrendingSearchMutation,
    useSearchNameListMutation,
    useBrandListQuery,
    useColorListQuery,
    useCategoryListQuery,
    usePreferenceListQuery,
    useFormulationListQuery,
    useFinishListQuery,
    useCountryListQuery,
    useGenderListQuery,
    useCoverageListQuery,
    useSkinTypeListQuery,
    useBenefitListQuery,
    useConcernListQuery,
    useIngredientListQuery,
    usePackSizeListQuery,
} = productFilterApi;
