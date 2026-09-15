import {Menu} from "antd";
import {NavLink} from "react-router-dom";
import "./MultiLayerMenu.css";

const {SubMenu} = Menu;

const renderSubSubMenu = (menuItem, subItems, subSubItem, onClose) => {
    return subSubItem.map((item) => {
        return (
            <Menu.Item key={item.name} className="no-border-inline-end">
                <NavLink
                    to={`/product-filter/child-category/${item?.slug}`}
                    className={({isActive}) => (isActive ? "text-red-500" : "")}
                    onClick={onClose} // Add onClick here to trigger close
                >
                    {item.name}
                </NavLink>
            </Menu.Item>
        );
    });
};

const renderSubMenu = (menuItem, subItems, onClose) => {
    return subItems.map((subItem) => {
        if (subItem.subcategory) {
            return (
                <SubMenu key={subItem.name} title={subItem.name}>
                    {renderSubSubMenu(menuItem, subItem, subItem.subcategory, onClose)}
                </SubMenu>
            );
        } else {
            return (
                <Menu.Item key={subItem.name} className="no-border-inline-end">
                    <NavLink
                        //  to={`/category/${menuItem.slug}/${subItems?.slug}/${subItem?.slug}`}
                        className={({isActive}) => (isActive ? "text-red-500" : "")}
                        onClick={onClose} // Add onClick here to trigger close
                    >
                        {subItem.name}
                    </NavLink>
                </Menu.Item>
            );
        }
    });
};

const MultiLayerMenu = ({menuData, onClose}) => {
    // Receive onClose as prop
    return (
        <div className="">
            <Menu style={{border: "none"}} defaultOpenKeys={["sub1"]} mode={"inline"} theme={"light"}>
                {Array.isArray(menuData) && menuData?.map((item) => {
                    if (item.subcategory) {
                        return (
                            <SubMenu key={item.name} title={item.name}>
                                {/* {renderSubMenu(item.subcategory, onClose)} */}
                                {renderSubMenu(item, item.subcategory, onClose)} {/* Pass onClose here */}
                            </SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item key={item.name}>
                                <NavLink
                                    to={item?.slug}
                                    activeClassName="active-link"
                                    onClick={onClose} // Add onClick here to trigger close
                                >
                                    {item.name}
                                </NavLink>
                            </Menu.Item>
                        );
                    }
                })}
            </Menu>
        </div>
    );
};

export default MultiLayerMenu;
