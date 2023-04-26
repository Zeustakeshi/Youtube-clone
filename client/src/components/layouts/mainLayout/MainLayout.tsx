import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../../redux/store";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import MenuAbsolute from "../menu/MenuAbsolute";

const MainLayout = () => {
    const menuStatus = useSelector((state: RootState) => state.app.menuStatus);
    return (
        <div className="px-3">
            <Header></Header>
            <div className="flex justify-start items-start">
                {menuStatus === "show" ? (
                    <Menu></Menu>
                ) : (
                    <MenuAbsolute></MenuAbsolute>
                )}
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;
