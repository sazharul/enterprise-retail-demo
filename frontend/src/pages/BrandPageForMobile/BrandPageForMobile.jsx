import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import {useForm} from "react-hook-form";
import searchIcon from "../../assets/DropDownWithSearchAndList/ion_search.svg";
import {useBrandListForFilterQuery} from "../../redux/features/brandListForFilter/brandListForFilterApi";
import {useBrandListQuery} from "../../redux/features/productFilter/productFilterApi";
import ImageURL from "../../components/ImageURL/ImageURL";
import {usePopularBrandQuery} from "../../redux/features/popularBrand/popularBrandApi.js";

const BrandPageForMobile = () => {
    const {data: brandListForFilterQuery} = useBrandListForFilterQuery();
    //const {data: brandListWithImage, isLoading} = useBrandListQuery(undefined);

    // Using popularBrandApi hook to fetch popular brands
    const {data: popularBrandData, isLoading} = usePopularBrandQuery();

    // Initialize state with a fallback to an empty array in case brandListForFilterQuery?.data is undefined
    const [brandList, setBrandList] = useState([]);
    const [FilteredBrandList, setFilteredBrandList] = useState([]);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const {register, handleSubmit, watch} = useForm();

    const onSubmit = (data) => {
    };

    const watchSearch = watch("search");

    useEffect(() => {
        // When the brandListForFilterQuery has data, update the brandList state
        if (brandListForFilterQuery?.data) {
            setBrandList([...brandListForFilterQuery.data]);
            setFilteredBrandList([...brandListForFilterQuery.data]); // Set the filtered list as well initially
        }
    }, [brandListForFilterQuery]);

    useEffect(() => {
        if (watchSearch?.length > 0) {
            setFilteredBrandList(brandList.map((brand) => ({
                ...brand,
                list: brand.list.filter((item) =>
                    item.title.toLowerCase().startsWith(watchSearch.toLowerCase())
                ),
            })).filter(brand => brand.list.length > 0));
            console.log(FilteredBrandList);
        } else {
            setFilteredBrandList(brandList);
        }
    }, [watchSearch, brandList]);

    const data = [
        {
            id: 1,
            caption: "A",
            list: [
                {id: 11, title: "apple"},
                {id: 12, title: "almond"},
            ],
        },
        {
            id: 2,
            caption: "B",
            list: [
                {id: 21, title: "ball"},
                {id: 22, title: "banana"},
            ],
        },
        {
            id: 3,
            caption: "C",
            list: [
                {id: 31, title: "cat"},
                {id: 32, title: "carrot"},
            ],
        },
        {
            id: 4,
            caption: "D",
            list: [
                {id: 41, title: "dog"},
                {id: 42, title: "date"},
            ],
        },
        {
            id: 5,
            caption: "E",
            list: [
                {id: 51, title: "elephant"},
                {id: 52, title: "eggplant"},
            ],
        },
        {
            id: 6,
            caption: "F",
            list: [
                {id: 61, title: "fox"},
                {id: 62, title: "fig"},
            ],
        },
        {
            id: 7,
            caption: "G",
            list: [
                {id: 71, title: "giraffe"},
                {id: 72, title: "grape"},
            ],
        },
        {
            id: 8,
            caption: "H",
            list: [
                {id: 81, title: "horse"},
                {id: 82, title: "honeydew"},
            ],
        },
        {
            id: 9,
            caption: "I",
            list: [
                {id: 91, title: "iguana"},
                {id: 92, title: "ice cream"},
            ],
        },
        {
            id: 10,
            caption: "J",
            list: [
                {id: 101, title: "jaguar"},
                {id: 102, title: "jelly"},
            ],
        },
        {
            id: 11,
            caption: "K",
            list: [
                {id: 111, title: "koala"},
                {id: 112, title: "kiwi"},
            ],
        },
        {
            id: 12,
            caption: "L",
            list: [
                {id: 121, title: "lion"},
                {id: 122, title: "lemon"},
            ],
        },
        {
            id: 13,
            caption: "M",
            list: [
                {id: 131, title: "monkey"},
                {id: 132, title: "melon"},
            ],
        },
        {
            id: 14,
            caption: "N",
            list: [
                {id: 141, title: "newt"},
                {id: 142, title: "nutmeg"},
            ],
        },
        {
            id: 15,
            caption: "O",
            list: [
                {id: 151, title: "owl"},
                {id: 152, title: "orange"},
            ],
        },
        {
            id: 16,
            caption: "P",
            list: [
                {id: 161, title: "penguin"},
                {id: 162, title: "pear"},
            ],
        },
        {
            id: 17,
            caption: "Q",
            list: [
                {id: 171, title: "quokka"},
                {id: 172, title: "quince"},
            ],
        },
        {
            id: 18,
            caption: "R",
            list: [
                {id: 181, title: "rhino"},
                {id: 182, title: "raspberry"},
            ],
        },
        {
            id: 19,
            caption: "S",
            list: [
                {id: 191, title: "snake"},
                {id: 192, title: "strawberry"},
            ],
        },
        {
            id: 20,
            caption: "T",
            list: [
                {id: 201, title: "tiger"},
                {id: 202, title: "tomato"},
            ],
        },
        {
            id: 21,
            caption: "U",
            list: [
                {id: 211, title: "umbrella bird"},
                {id: 212, title: "ugli fruit"},
            ],
        },
        {
            id: 22,
            caption: "V",
            list: [
                {id: 221, title: "vulture"},
                {id: 222, title: "vanilla"},
            ],
        },
        {
            id: 23,
            caption: "W",
            list: [
                {id: 231, title: "whale"},
                {id: 232, title: "watermelon"},
            ],
        },
        {
            id: 24,
            caption: "X",
            list: [
                {id: 241, title: "x-ray tetra"},
                {id: 242, title: "xylophone"},
            ],
        },
        {
            id: 25,
            caption: "Y",
            list: [
                {id: 251, title: "yak"},
                {id: 252, title: "yogurt"},
            ],
        },
        {
            id: 26,
            caption: "Z",
            list: [
                {id: 261, title: "zebra"},
                {id: 262, title: "zucchini"},
            ],
        },
    ];

    const alphabetList = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];

    return (
        <div className="container mx-auto px-[10px] overflow-hidden overflow-y-auto relative slim-scroll">
            {/* right side start */}
            <div className="bg-[#F5F5F5] w-full">
                <div className="border-b-[1px] py-3">
                    <h4 className="text-center">Popular Brands</h4>
                </div>
                {/* brand images start */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 md:p-8">
                    {popularBrandData?.status === true &&
                        popularBrandData?.data?.map((item, index) => (
                            <Link
                                key={index}
                                to={`/product-filter?brand=${item?.slug}`}
                                className="block transition-transform transform hover:scale-105"
                            >
                                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <ImageURL
                                        image={item?.image || '/path/to/placeholder/image.jpg'}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Link>
                        ))}
                </div>
                {/* brand images end */}
            </div>
            {/* right side end */}
            {/* left side start */}
            <div className="bg-white w-full">
                <div className="border-b-[1px] p-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative">
                            <input
                                type="text"
                                {...register("search")}
                                placeholder="Search Brands"
                                className="input w-full ps-9 py-[6px] bg-[#F5F5F5] rounded-sm"
                            />
                            <button className="absolute top-[10px] left-2" type="submit">
                                <img src={searchIcon} alt=""/>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="relative">
                    <div className="max-h-[330px] overflow-hidden overflow-y-auto slim-scroll">
                        {FilteredBrandList.map((items, i) => (
                            <div key={i} id={items.caption + 1} className="px-5 bg-white">
                                <h5 className="mt-4 text-black text-lg font-medium leading-normal">{items.caption}</h5>
                                <div className="mb-5">
                                    {items.list.map((item, index) => (
                                        <Link key={index} to={`/product-filter?brand=${item?.slug}`}>
                                            <p className="text-[#00000080] text-sm font-normal leading-normal mb-2">{item.title}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col absolute top-2 right-2 overflow-hidden overflow-y-auto slim-scroll">
                            {/* {alphabetList.map((item, index) => (
                                // <ScrollButton key={index} to={item + 1} name={item} />
                            ))} */}
                        </div>
                    </div>
                </div>
            </div>
            {/* left side end */}
        </div>
    );
};

export default BrandPageForMobile;
