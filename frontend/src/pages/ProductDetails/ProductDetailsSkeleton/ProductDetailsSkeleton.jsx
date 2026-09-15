import {Skeleton} from "antd";
import "./ProductDetailsSkeleton.scss";

const ProductDetailsSkeleton = () => {
    return (
        <div className="container mx-auto px-[10px] pt-10 w-full">
            <div className="w-full ProductDetailsSkeleton">
                <div className=" w-full mx-auto flex justify-center"></div>
                <div className="md:flex justify-between gap-10  md:mt-3 md:mb-14">
                    <div className="mb-6 mx-auto flex justify-center">

                        <Skeleton.Image active/>
                    </div>

                    <Skeleton
                        active
                        paragraph={{
                            rows: 10,
                        }}
                    />

                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;
