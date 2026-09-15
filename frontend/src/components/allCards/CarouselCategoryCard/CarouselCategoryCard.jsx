/* eslint-disable react/prop-types */
import {twMerge} from "tailwind-merge";
// import "./EggCard.scss";
import ImageURL from "../../ImageURL/ImageURL";
import {useContext} from "react";
import {LogicProviderContext} from "../../../providers/LogicProvider";
import backgroundImg from "../../../assets/CarouselCategoryCard/background.webp";
import {Link, useParams} from "react-router-dom";

const CarouselCategoryCard = ({className, item}) => {
    const {id} = useParams();
    //
    return (
        <>
            <Link to={`/campaign/${id}/${item?.id}?category=${item?.id}`}>
                <div>
                    <div
                        className={twMerge(
                            ` bg-contain bg-center object-cover bg-no-repeat h-[270px] w-[270px]  flex justify-center items-center overflow-hidden hover:cursor-pointer`,
                            className
                        )}
                        style={{
                            backgroundImage: `url("${backgroundImg}")`,
                        }}
                    >
                        <ImageURL
                            className={
                                " max-h-[178px] max-w-[160px] hover:scale-[105%] transition-all"
                            }
                            image={item?.image}
                        />
                    </div>
                    {/* <p className="text-center">{item?.name}</p> */}
                </div>
            </Link>
        </>
    );
};

export default CarouselCategoryCard;
