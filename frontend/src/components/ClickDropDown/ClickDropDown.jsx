import {Fade} from "react-awesome-reveal";
import {NavLink} from "react-router-dom";

const ClickDropDown = ({title, items}) => {
    return (
        <>
            <ul>
                {items?.map((item, i) => (
                    <Fade key={i} duration="1500">
                        <li className="my-2 md:w-28 rounded-md w-full capitalize text-sm">
                            <NavLink
                                // className={({ isActive }) =>
                                //     isActive ? "text-blue-600 font-bold" : ""
                                // }
                                to={`/`}
                                // to={`/products/${item}`}
                            >
                                {item}
                            </NavLink>
                        </li>
                    </Fade>
                ))}
            </ul>
        </>
    );
};

export default ClickDropDown;
