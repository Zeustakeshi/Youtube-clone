import React from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Tooltip } from "@mui/material";
const Notification = () => {
    return (
        <div className="p-2 cursor-pointer">
            <Tooltip title="Thông báo">
                <NotificationsOutlinedIcon></NotificationsOutlinedIcon>
            </Tooltip>
        </div>
    );
};

export default Notification;
