import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
const ButtonLogin = () => {
    const navigation = useNavigate();
    return (
        <button
            onClick={() => navigation("/auth")}
            className="flex justify-center items-center gap-2 px-2 py-1 rounded-full border border-gray-300 cursor-pointer text-sm text-blue-500 font-medium"
        >
            <AccountCircleOutlinedIcon fontSize="small" />
            <span>Đăng nhập</span>
        </button>
    );
};

export default ButtonLogin;
