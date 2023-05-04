import React from "react";
import { INavbarProps, INavItem } from "../../../interfaces/Navbar.interface";
import NavItem from "./NavItem";

export const NavBar: React.FC<INavbarProps> = ({
    setActive,
    active,
    items,
}) => {
    return (
        <nav className="hiden-scrollbar sticky top-[80px] bg-white z-40 flex justify-start items-center gap-4 px-5 py-3 overflow-x-auto w-screen md:w-full ">
            {items.map((item, index) => {
                return (
                    <NavItem
                        key={index}
                        data={item}
                        isActive={item.label === active.label}
                        onClick={() => setActive(item)}
                    ></NavItem>
                );
            })}
        </nav>
    );
};
