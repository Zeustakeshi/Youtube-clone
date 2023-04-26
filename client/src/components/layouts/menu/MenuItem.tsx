import { Label } from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";
import { IMenuItem } from "../../../interfaces/Menu.interface";

const MenuItem: React.FC<IMenuItem> = ({ Icon, label, to = "/", isOpen }) => {
    return (
        <NavLink
            to={to}
            className={`flex ${
                isOpen
                    ? "justify-start gap-4 px-2 text-sm  min-w-[200px]"
                    : "flex-col text-[12px] justify-center gap-1 min-w-[80px]"
            }  items-center w-full py-3 rounded-lg hover:bg-slate-200`}
        >
            <div className="">{Icon}</div>
            <p className="text-center">{label}</p>
        </NavLink>
    );
};

export default MenuItem;
