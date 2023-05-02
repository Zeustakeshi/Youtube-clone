import { useDispatch } from "react-redux";
import { SearchProvider } from "../../../context/SearchContext";
import { toggleMenu } from "../../../redux/slices/app/appSlice";
import ButtonToggleMenu from "../../button/ButtonToggleMenu";
import Logo from "../../Logo/Logo";
import Search from "../../search/Search";
import HearderAction from "./HearderAction";
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
                <HearderAction />
            </div>
        </div>
    );
};

export default Header;
