import React from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Tooltip } from "@mui/material";

const ButtonSettingHeader = () => {
    return (
        <Tooltip title="Cài đặt">
            <button className=" rounded-full hover:bg-gray-100 cursor-pointer md:w-[40px] md:h-[40px] w-[30px] h-[30px] flex justify-center items-center transition-all text-slate-800">
                <MoreVertOutlinedIcon fontSize="small" />
            </button>
        </Tooltip>
    );
};

export default ButtonSettingHeader;
