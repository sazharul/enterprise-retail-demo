/* eslint-disable react/prop-types */
import {useState} from "react";
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";

const Description = ({description}) => {
    const [isReadMore, setIsReadMore] = useState(false);
    return (
        <div className="p-2 md:p-5">
            <div className=" text-[#000000] text-sm font-medium leading-5">
                {description && <div dangerouslySetInnerHTML={{__html: description}}/>}
            </div>
            {/* <div className="border-t-[1px] py-3 flex items-center justify-center gap-2 text-black text-center  text-sm font-semibold leading-5">
                {isReadMore ? (
                    <div onClick={() => setIsReadMore(false)} className="flex items-center gap-2 hover:cursor-pointer">
                        <p className="text-center">Read Less</p>
                        <FaAngleUp />
                    </div>
                ) : (
                    <div onClick={() => setIsReadMore(true)} className="flex items-center gap-2 hover:cursor-pointer">
                        <p className="text-center">Read More</p>
                        <FaAngleDown />
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default Description;
