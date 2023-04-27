import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUserFromLocalStorage } from "../../../redux/slices/user/userSlice";
import { RootState } from "../../../redux/store";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import MenuAbsolute from "../menu/MenuAbsolute";

const MainLayout = () => {
    const menuStatus = useSelector((state: RootState) => state.app.menuStatus);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserFromLocalStorage());
    }, []);

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
