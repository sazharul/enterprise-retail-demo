import "./LeftAlignCard.scss";
import img4 from "../../../assets/card-image/Rectangle 892 (1)-min.png";
import ImageURL from "../../ImageURL/ImageURL";
import {IoStar} from "react-icons/io5";

const LeftAlignCard = ({item}) => {
    //
    return (
        <div className="left-align-card ">
            <div className="image relative">
                <div className="h-[200px] overflow-hidden">
                    <ImageURL
                        className={"h-full w-full object-fill"}
                        image={item?.image}
                    />
                </div>
                <div className="absolute top-0 left-0 ">
                    <h4 className=" text-[#8513DF] text-xs font-medium bg-[#ECDDFF] px-[10px] py-1 rounded-ee-md">
                        Offer
                    </h4>
                </div>
                <div className="absolute bottom-0 right-0 rounded-ss-[4px] px-[10px] py-1 bg-[#FFF2D9] flex gap-1 justify-center items-center text-xs font-medium">
                    <IoStar className="text-[#FFAC0A]"/>
                    <h4 className="text-[#FFAC0A]">4.4</h4>
                    <h4 className="text-[#00000099]">(253)</h4>
                </div>
                {/* <img src={img4} alt="" /> */}
            </div>
            <div>
                <h5>
                    {item?.name &&
                        (item?.name?.length > 35
                            ? `${item?.name?.slice(0, 35)}...`
                            : item?.name)}
                </h5>
                <p className="mb-2">4.2ml</p>

                <div className="price pb-4">
                    <span>৳550</span>
                    <span>৳550</span>
                    <span>(-25%)</span>
                </div>
            </div>
        </div>
    );
};

export default LeftAlignCard;
