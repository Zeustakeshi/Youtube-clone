import React from "react";
import { NavLink } from "react-router-dom";
import { INavbarItem } from "../../../interfaces/Navbar.interface";

const Navbar = () => {
    return (
        <nav className="z-30 flex justify-start items-center gap-3 h-[80px] top-[80px] sticky bg-white ">
            {new Array(8).fill(0).map((item, index) => {
                return <NavItem key={index}></NavItem>;
            })}
        </nav>
    );
};

const NavItem = () => {
    return (
        <NavLink
            to="/"
            className="inline-block px-3 py-1 rounded-md bg-slate-100 text-sm"
        >
            Tất cả
        </NavLink>
    );
};

export default Navbar;
