/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge";
// import "./EggCard.scss";
import ImageURL from "../../ImageURL/ImageURL";
import { useContext } from "react";
import { LogicProviderContext } from "../../../providers/LogicProvider";
import eggCardImage from "../../../assets/eggCard/egg-card.png";
import { Link } from "react-router-dom";

const EggCard = ({ className, item }) => {
    return (
        <div>
            <Link to={`/product-filter?category=${JSON.parse(item?.categories)?.slug}`}>
                <div
                    className={twMerge(` bg-contain bg-center object-cover bg-no-repeat md:h-[282px] md:w-[235px] h-[132px] w-[115px] mx-auto flex justify-center items-center overflow-hidden hover:cursor-pointer`, className)}
                    style={{
                        backgroundImage: `url("${eggCardImage}")`,
                    }}
                >
                    <ImageURL className={" md:max-h-[170px] md:max-w-[150px] max-h-[190px] max-w-[80px] hover:scale-[105%] transition-all"} image={item?.image} />
                </div>
                <p className="text-center">{JSON.parse(item?.categories)?.name}</p>
            </Link>
        </div>
    );
};

export default EggCard;
