import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import React from "react";
import { IButtonToggleMenu } from "../../interfaces/button.interface";

const ButtonToggleMenu: React.FC<IButtonToggleMenu> = ({
    className = "",
    onClick = (e: any) => {},
}) => {
    return (
        <button
            onClick={onClick}
            className={`rounded-full p-2 transition-all text-slate-900 hover:bg-gray-100 ${className}`}
        >
            <MenuRoundedIcon fontSize="small"> </MenuRoundedIcon>
        </button>
    );
};

export default ButtonToggleMenu;
