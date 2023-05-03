import React from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Tooltip } from "@mui/material";
const Notification = () => {
    return (
        <Tooltip title="Thông báo">
            <div className="md:p-2 cursor-pointer">
                <NotificationsOutlinedIcon></NotificationsOutlinedIcon>
            </div>
        </Tooltip>
    );
};

export default Notification;
