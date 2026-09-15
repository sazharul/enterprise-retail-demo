import React, {useState} from "react";
import NavbarHoverIcon from "../../../../assets/NavbarHoverIcon/NavbarHoverIcon.svg";

const CategoryTitle = ({title, hoveredCategory, setHoveredCategory}) => {
    const [categoryTitle, setCategoryTitle] = useState(false);

    return (
        <div
            onMouseEnter={() => {
                setCategoryTitle(true);
                setHoveredCategory(title);
            }}
            onMouseLeave={() => setCategoryTitle(false)}
            className="relative"
        >
            <div className={`absolute w-full flex justify-center ${title === hoveredCategory ? "block" : "hidden"}`}>
                <img src={NavbarHoverIcon} alt="hover icon"/>
            </div>
            <h5
                className={`hover:cursor-pointer whitespace-nowrap py-3 px-3 text-center text-sm font-medium leading-normal tracking-tighter ${
                    title === hoveredCategory ? "text-[#5DC9F4]" : "text-[#000000A6]"
                }`}
            >
                {title}
            </h5>
        </div>
    );
};

export default CategoryTitle;
