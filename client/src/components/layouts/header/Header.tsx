import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchProvider } from "../../../context/SearchContext";
import { toggleMenu } from "../../../redux/slices/app/appSlice";
import { RootState } from "../../../redux/store";
import ButtonToggleMenu from "../../button/ButtonToggleMenu";
import Logo from "../../Logo/Logo";
import Search from "../../search/Search";
import SearchMobile from "../../search/SearchMobile";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HearderAction from "./HearderAction";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const dispatch = useDispatch();
    const { isMobile } = useSelector((state: RootState) => state.app);

    return (
        <div className="sticky top-0 bg-white z-50 py-2 min-h-[80px] w-full flex items-center">
            {!showSearch && (
                <div className="flex items-center gap-2 justify-between w-full">
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
                        {isMobile ? (
                            <button
                                className="w-full flex justify-end"
                                onClick={() => setShowSearch(true)}
                            >
                                <SearchOutlinedIcon></SearchOutlinedIcon>
                            </button>
                        ) : (
                            <Search></Search>
                        )}
                    </SearchProvider>
                    <HearderAction />
                </div>
            )}
            {showSearch && (
                <div className="flex w-full items-center gap-2 justify-start px-3">
                    <button onClick={() => setShowSearch(false)}>
                        <ArrowBackOutlinedIcon fontSize="small"></ArrowBackOutlinedIcon>
                    </button>
                    <SearchProvider>
                        <SearchMobile></SearchMobile>
                    </SearchProvider>
                </div>
            )}
        </div>
    );
};

export default Header;
