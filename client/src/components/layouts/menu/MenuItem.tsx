import React from "react";
import { NavLink } from "react-router-dom";
import { ICollapsedMenuItem } from "../../../interfaces/Menu.interface";

const MenuItem: React.FC<ICollapsedMenuItem> = ({
    Icon,
    label,
    to = "/",
    isOpen,
}) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex ${
                    isOpen
                        ? "justify-start gap-4 px-2 text-sm  min-w-[200px]"
                        : "flex-col text-[12px] justify-center gap-1 min-w-[80px]"
                }  
                ${isActive ? "bg-slate-200" : ""}
                
                items-center w-full py-3 rounded-lg hover:bg-slate-200`
            }
        >
            <div className="">{Icon}</div>
            <p className="text-center">{label}</p>
        </NavLink>
    );
};

export default MenuItem;
