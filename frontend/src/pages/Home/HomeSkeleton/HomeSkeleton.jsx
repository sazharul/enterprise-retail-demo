import {Skeleton} from "antd";
import "./HomeSkeleton.scss";

const HomeSkeleton = () => {
    return (
        <div className="container mx-auto px-[10px] pt-10 w-full">
            <div className="w-full">
                <div className="banner-skeleton w-full mx-auto flex justify-center">
                    <Skeleton.Image
                        active
                    />
                </div>
                <div className="flex gap-8 mt-14 mb-10">
                    <Skeleton
                        active
                        paragraph={{
                            rows: 8,
                        }}
                    />
                    <Skeleton
                        active
                        paragraph={{
                            rows: 8,
                        }}
                    />
                    <Skeleton
                        active
                        paragraph={{
                            rows: 8,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeSkeleton;
