import React from "react";
import { useSelector } from "react-redux";
import { IMenuData, IMenuItem } from "../../../../interfaces/Menu.interface";
import { RootState, store } from "../../../../redux/store";
import Avatar from "../../../avatar/Avatar";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

export enum MenuType {
    YOUR_CHANNEL = "YOUR_CHANNEL",
    ADD_ACCOUNT = "ADD_ACCOUNT",
    LOGOUT = "LOGOUT",
    CHANGE_THEME = "CHANGE_THEME",
    CHANGE_THEME_LIGHT = "CHANGE_THEME_LIGHT",
    CHANGE_THEME_DARK = "CHANGE_THEME_DARK",
    CHANGE_LANG_VI = "CHANGE_LANG_VI",
    CHANGE_LANG_EN = "CHANGE_LANG_EN",
    SETTING = "SETTING",
}

const HeaderAccount = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <div className="flex justify-start items-center gap-4 py-2">
            <div>
                <Avatar src={user.avatar} size={40}></Avatar>
            </div>
            <div className=" flex flex-col justify-start items-start text-sm">
                <div>{user.username}</div>
                <div>{user.email}</div>
            </div>
        </div>
    );
};

export const AccountMenuData: IMenuData = {
    header: <HeaderAccount></HeaderAccount>,
    data: [
        {
            type: MenuType.YOUR_CHANNEL,
            title: "Kênh của bạn",
            to: `/channel`,
            icon: <PhotoCameraFrontIcon fontSize="small" />,
        },
        {
            title: "Chuyển đổi tài khoản",
            icon: <AccountBoxOutlinedIcon fontSize="small" />,
            children: {
                header: "Tài khoản",
                data: [
                    {
                        type: MenuType.ADD_ACCOUNT,
                        icon: <PersonAddAltOutlinedIcon fontSize="small" />,
                        title: "Thêm tài khoản",
                        to: "/history",
                    },
                    {
                        type: MenuType.LOGOUT,
                        title: "Đăng xuất",
                        icon: <LogoutOutlinedIcon fontSize="small" />,
                    },
                ],
            },
        },
        {
            type: MenuType.LOGOUT,
            title: "Đăng xuất",
            icon: <LogoutOutlinedIcon fontSize="small" />,
        },
        {
            type: MenuType.CHANGE_THEME,
            title: "Giao diện",
            icon: <DarkModeOutlinedIcon fontSize="small" />,
            children: {
                header: "Giao diện",
                data: [
                    {
                        title: "Giao diện sáng",
                        type: MenuType.CHANGE_THEME_LIGHT,
                    },
                    {
                        title: "Giao diện tối",
                        type: MenuType.CHANGE_THEME_DARK,
                    },
                ],
            },
        },
        {
            title: "Ngôn ngữ",
            icon: <PublicOutlinedIcon fontSize="small" />,
            children: {
                header: "Ngôn ngữ",
                data: [
                    {
                        title: "English",
                        type: MenuType.CHANGE_LANG_EN,
                    },
                    {
                        title: "Tiếng Việt",
                        type: MenuType.CHANGE_LANG_VI,
                    },
                ],
            },
        },
        {
            type: MenuType.SETTING,
            title: "Cài đặt",
            icon: <SettingsIcon fontSize="small" />,
            children: {
                header: "Cài đặt",
                data: [
                    {
                        type: MenuType.CHANGE_THEME,
                        title: "Giao diện",
                        icon: <DarkModeOutlinedIcon fontSize="small" />,
                        children: {
                            header: "Giao diện",
                            data: [
                                {
                                    title: "Giao diện sáng",
                                    type: MenuType.CHANGE_THEME_LIGHT,
                                },
                                {
                                    title: "Giao diện tối",
                                    type: MenuType.CHANGE_THEME_DARK,
                                },
                            ],
                        },
                    },
                    {
                        title: "Ngôn ngữ",
                        icon: <PublicOutlinedIcon fontSize="small" />,
                        children: {
                            header: "Ngôn ngữ",
                            data: [
                                {
                                    title: "English",
                                    type: MenuType.CHANGE_LANG_EN,
                                },
                                {
                                    title: "Tiếng Việt",
                                    type: MenuType.CHANGE_LANG_VI,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};
