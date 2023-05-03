import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMenu } from "../../../context/MenuContext";
import { IMenuData, IMenuItem } from "../../../interfaces/Menu.interface";
import { RootState } from "../../../redux/store";
import Avatar from "../../avatar/Avatar";
import Menu from "../../menu/Menu";
import MenuContentWrapper from "../../menu/MenuContentWrapper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import {
    AccountMenuData,
    MenuType,
} from "./accountMenuLogics/AccountMenuHelper";
import { handleChangeMenu } from "./accountMenuLogics";

const HeaderAvatar: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <>
            <Menu
                onChange={handleChangeMenu}
                data={AccountMenuData}
                label={
                    <Avatar
                        className="m-2"
                        src={user.avatar}
                        size={40}
                    ></Avatar>
                }
            >
                <MenuContentWrapper className="absolute top-[110%] -right-[2px]  bg-white rounded-md shadow-[rgba(0,0,0,0.1)_0px_10px_50px]">
                    <MenuContent></MenuContent>
                </MenuContentWrapper>
            </Menu>
        </>
    );
};

const MenuContent = () => {
    const { history, setHistory } = useMenu();
    const topHistory = history[history.length - 1];

    const handleBack = () => {
        if (history.length <= 1) return;
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    return (
        <div className="min-w-[300px]  p-2">
            <div className=" w-full flex justify-between items-center border-b border-b-gray-300">
                <button
                    className={`${
                        history.length > 1 ? "inline-block" : "hidden"
                    } w-[40px] h-[40px] flex justify-center items-center hover:bg-gray-100 rounded-full`}
                    onClick={handleBack}
                >
                    <ArrowBackIosIcon fontSize="inherit"></ArrowBackIosIcon>
                </button>
                <div className="text-center w-full font-medium">
                    {topHistory.header}
                </div>
            </div>

            <div className="">
                {topHistory.data.map((item, index) => {
                    return <MenuItem key={index} item={item}></MenuItem>;
                })}
            </div>
        </div>
    );
};

const MenuItem = ({ item }: { item: IMenuItem }) => {
    const { setHistory, onChange } = useMenu();
    const navigation = useNavigate();
    const handleClickItem = (item: IMenuItem) => {
        if (item.children) {
            const newHistory: IMenuData = item.children;
            setHistory((prev) => [...prev, newHistory]);
        } else if (item.to) {
            navigation(item.to);
        } else {
            onChange(item);
        }
    };
    return (
        <div
            className="p-3 cursor-pointer hover:bg-gray-200 rounded-md"
            onClick={(e) => {
                e.stopPropagation();
                handleClickItem(item);
            }}
        >
            <div className="flex justify-start items-center gap-4">
                <span>{item.icon}</span>
                <span>{item.title}</span>
            </div>
        </div>
    );
};

export default HeaderAvatar;
