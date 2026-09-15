import {Skeleton} from "antd";
import './CardSkeleton.scss'

const CardSkeleton = () => {
    return (
        <div className="w-full md:max-w-[280px] overflow-hidden">
            <div className="p-2 mb-2">
                <Skeleton.Image className="" active/>
            </div>
            <Skeleton active={true} shape={"circle"}/>
            <div className="flex items-center gap-2 mt-2">

                <Skeleton.Button active={true} shape={"square"}/>
                <div className="skeleton-button ">

                    <Skeleton.Button active={true} shape={"square"}/>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
