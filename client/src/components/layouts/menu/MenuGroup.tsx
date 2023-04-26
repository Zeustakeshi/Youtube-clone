import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IMenuGroup, IMenuItem } from "../../../interfaces/Menu.interface";
import { RootState } from "../../../redux/store";
import MenuItem from "./MenuItem";
const MenuGroup: React.FC<IMenuGroup> = ({
    items,
    hidden,
    name,
    maxItem = 5,
    showMoreLabel = "Thêm",
    children,
}) => {
    const [menuItems, setMenuItems] = useState<IMenuItem[]>(() =>
        items.slice(0, maxItem)
    );
    const { menuSize } = useSelector((state: RootState) => state.app);

    const handleToggleLoadMore = (e: any) => {
        e.stopPropagation();
        if (items.length !== menuItems.length) {
            setMenuItems(items);
        } else {
            setMenuItems(items.slice(0, maxItem));
        }
    };

    if (hidden && menuSize === "mini") return <></>;
    return (
        <div className="w-full border-b border-b-slate-300 py-2 last:border-none">
            {name && (
                <h4 className="text-slate-800 text-sm font-medium px-2 py-2">
                    {name}
                </h4>
            )}
            <div
                className={`w-full flex flex-col justify-start ${
                    menuSize === "large" ? "item-start" : "items-center"
                } gap-0 `}
            >
                {children
                    ? children
                    : menuItems.map((item, index) => {
                          return (
                              <MenuItem
                                  isOpen={menuSize === "large"}
                                  key={index}
                                  Icon={item.Icon}
                                  label={item.label}
                                  to={item.to}
                              ></MenuItem>
                          );
                      })}
            </div>
            {!children && items.length >= maxItem && (
                <button
                    onClick={handleToggleLoadMore}
                    className="flex justify-between items-center mx-auto text-sm text-slate-500 p-2 w-full"
                >
                    <span className="text-slate-700">
                        {items.length !== menuItems.length
                            ? showMoreLabel
                            : "Ẩn bớt"}
                    </span>
                    {items.length !== menuItems.length ? (
                        <KeyboardArrowDownOutlinedIcon />
                    ) : (
                        <KeyboardArrowUpOutlinedIcon />
                    )}
                </button>
            )}
        </div>
    );
};

export default MenuGroup;
