import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useWindowSize from "../../../hooks/useWindowSize";
import {
    setIsMobile,
    updateMenuStatus,
} from "../../../redux/slices/app/appSlice";
import { getUserFromLocalStorage } from "../../../redux/slices/user/userSlice";
import { RootState } from "../../../redux/store";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import MenuAbsolute from "../menu/MenuAbsolute";

const MainLayout = () => {
    const { menuStatus, isMobile } = useSelector(
        (state: RootState) => state.app
    );
    const windowSize = useWindowSize();
    const dispatch = useDispatch();
    useEffect(() => {
        const isMobile = windowSize.width < 1200;
        dispatch(getUserFromLocalStorage());
        dispatch(setIsMobile(isMobile));
        if (isMobile) dispatch(updateMenuStatus("hidden"));
        else dispatch(updateMenuStatus("show"));
    }, [windowSize]);
    return (
        <div className="md:px-3 w-full">
            <ToastContainer
                position={isMobile ? "bottom-right" : "top-right"}
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
