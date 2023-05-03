import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
const ButtonLogin = () => {
    const navigation = useNavigate();
    return (
        <Tooltip title="Đăng nhập">
            <button
                onClick={() => navigation("/auth")}
                className="flex justify-center items-center md:gap-2 gap-1 md:px-2 md:py-1 p-1 rounded-full border border-gray-300 cursor-pointer text-sm text-blue-500 font-medium"
            >
                <AccountCircleOutlinedIcon fontSize="small" />
                <span>Đăng nhập</span>
            </button>
        </Tooltip>
    );
};

export default ButtonLogin;
