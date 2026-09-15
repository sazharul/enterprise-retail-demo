import {useState, useEffect} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import {
    MdKeyboardArrowDown,
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import {NavLink} from "react-router-dom";

import './DropDownBtn.scss'; // Import your SCSS styles

const DropDownBtn = ({title, menuData}) => {
    const [isDropdown, setDropdown] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    useEffect(() => {
        // fetch('your-api-endpoint')
        //   .then((response) => response.json())
        //   .then((data) => setMenuData(data));
    }, []);

    const handleMenuEnter = (menuIndex) => {
        setActiveMenu(menuIndex);
    };

    const handleSubMenuEnter = (menuIndex, subMenuIndex) => {
        setActiveMenu(menuIndex);
        setActiveSubMenu(subMenuIndex);
    };

    const handleMenuLeave = () => {
        setActiveMenu(null);
        setActiveSubMenu(null);
        setDropdown(false);
    };

    const handleSubMenuLeave = () => {
        setActiveSubMenu(null);
    };

    return (
        <div className="dropdown-main">
            <div
                onMouseEnter={() => setDropdown(true)}
                className="dropdown-header"
            >
                <div className="menu-icon">
                    <AiOutlineMenu/>
                    <span className="menu-title">{title}</span>
                </div>

                <MdKeyboardArrowDown size={22}/>
            </div>

            {isDropdown && (
                <div className={`dropdown-content   ${isDropdown ? "block" : "hidden"} `} onMouseLeave={handleMenuLeave}>
                    <div className="menu-list">
                        <ul>
                            {menuData?.map((menuItem, menuIndex) => (
                                <li
                                    key={menuIndex}
                                    className="menu-item"
                                    onMouseEnter={() => handleMenuEnter(menuIndex)}
                                >
                  <span>
                    {activeMenu === menuIndex ? (
                        <span className="menu-item-text active-menu-item">
                        {menuItem.name} <MdOutlineKeyboardArrowDown size={22}/>
                      </span>
                    ) : (
                        <span className="menu-item-text">
                        {menuItem.name}
                            <MdOutlineKeyboardArrowRight size={22}/>
                      </span>
                    )}
                  </span>
                                    {menuItem.subItems && (
                                        <>
                                            {activeMenu === menuIndex && (
                                                <div className="submenu" onMouseLeave={handleSubMenuLeave}>
                                                    <ul className="submenu-list">
                                                        {menuItem.subItems?.map(
                                                            (subMenuItem, subMenuIndex) => (
                                                                <li
                                                                    key={subMenuIndex}
                                                                    className="submenu-item"
                                                                    onMouseEnter={() =>
                                                                        handleSubMenuEnter(menuIndex, subMenuIndex)
                                                                    }
                                                                >
                                  <span>
                                    {activeSubMenu === subMenuIndex ? (
                                        <span className="submenu-item-text active-submenu-item">
                                        {subMenuItem.name}
                                            <MdOutlineKeyboardArrowDown size={22}/>
                                      </span>
                                    ) : (
                                        <span className="submenu-item-text">
                                        {subMenuItem.name}
                                            <MdOutlineKeyboardArrowRight size={22}/>
                                      </span>
                                    )}
                                  </span>
                                                                    {subMenuItem.subSubItems && (
                                                                        <>
                                                                            {activeSubMenu === subMenuIndex && (
                                                                                <div className="subsubmenu">
                                                                                    <ul className="subsubmenu-list">
                                                                                        {subMenuItem.subSubItems?.map(
                                                                                            (
                                                                                                subSubMenuItem,
                                                                                                subSubMenuIndex
                                                                                            ) => (
                                                                                                <li
                                                                                                    key={subSubMenuIndex}
                                                                                                    className="subsubmenu-item"
                                                                                                >
                                                                                                    <NavLink to={subSubMenuItem.link}>
                                                    <span className="subsubmenu-item-text">
                                                      {subSubMenuItem.name}
                                                    </span>
                                                                                                    </NavLink>
                                                                                                </li>
                                                                                            )
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDownBtn;
