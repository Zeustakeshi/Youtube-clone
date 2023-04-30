import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchProvider } from "../../../context/SearchContext";
import { toggleMenu } from "../../../redux/slices/app/appSlice";
import { RootState } from "../../../redux/store";
import Avatar from "../../avatar/Avatar";
import ButtonCreateNewVideo from "../../button/ButtonCreateNewVideo";
import ButtonLogin from "../../button/ButtonLogin";
import ButtonToggleMenu from "../../button/ButtonToggleMenu";
import Logo from "../../Logo/Logo";
import Notification from "../../notification/Notification";
import Search from "../../search/Search";
const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className="sticky top-0 bg-white z-50 py-2 min-h-[80px]">
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center">
                    <div className="mx-2">
                        <ButtonToggleMenu
                            onClick={() => dispatch(toggleMenu())}
                        ></ButtonToggleMenu>
                    </div>
                    <div>
                        <Logo className="transition-all w-[100px] h-[48px] flex justify-center items-center"></Logo>
                    </div>
                </div>
                <SearchProvider>
                    <Search></Search>
                </SearchProvider>
                <HeaderAction></HeaderAction>
            </div>
        </div>
    );
};

const HeaderAction = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <div className="flex justify-end items-center gap-3">
            {user._id ? (
                <>
                    <ButtonCreateNewVideo />
                    <Notification />
                    <Avatar
                        className="m-2"
                        src={user.avatar}
                        size={40}
                    ></Avatar>
                </>
            ) : (
                <>
                    <button className=" rounded-full hover:bg-gray-100 cursor-pointer w-[40px] h-[40px] flex justify-center items-center transition-all text-slate-800">
                        <MoreVertOutlinedIcon fontSize="small" />
                    </button>
                    <ButtonLogin></ButtonLogin>
                </>
            )}
        </div>
    );
};

export default Header;
