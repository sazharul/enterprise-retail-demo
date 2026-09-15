import img4 from "../../../assets/card-image/Rectangle 892 (1)-min.png";
import ImageURL from "../../ImageURL/ImageURL";
import {IoStar} from "react-icons/io5";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const ComboCard = ({item}) => {
    return (
        <>
            <Link to={`/combo-product-details/${item?.combo_product_id}`}>
                <div
                    style={{boxShadow: "0px 2px 6px 0px rgba(12, 107, 144, 0.10)"}}
                    className="rounded overflow-hidden md:max-w-[350px] hover:cursor-pointer"
                >
                    <div className="relative">
                        <div className="h-64 overflow-hidden">
                            <ImageURL
                                className={"h-full w-full object-fill"}
                                image={item?.combo_products?.image}
                            />
                        </div>
                        <div className="absolute top-0 left-0 ">
                            <h4 className=" text-[#8513DF] text-xs font-medium bg-[#ECDDFF] px-[10px] py-1 rounded-ee-md">
                                Combo
                            </h4>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-black text-center font-Inter text-base font-medium leading-5">
                            {item?.combo_products?.name &&
                                (item?.combo_products?.name?.length > 35
                                    ? `${item?.combo_products?.name?.slice(0, 35)}...`
                                    : item?.combo_products?.name)}
                        </h5>

                        <h2 className="text-center text-lg font-semibold tracking-[-1.12px] leading-[42px]">
                            ৳{item?.combo_products?.discounted_price}
                        </h2>
                    </div>
                </div>
            </Link>
        </>
    );
};

ComboCard.propTypes = {
    item: PropTypes.shape({
        combo_product_id: PropTypes.string,
        combo_products: PropTypes.shape({
            name: PropTypes.string,
            image: PropTypes.string, // Add other properties of combo_products as needed
            discounted_price: PropTypes.string, // Add other properties of combo_products as needed
        }),
    }),
};

export default ComboCard;
