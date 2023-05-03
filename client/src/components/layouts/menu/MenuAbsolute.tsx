import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../../redux/slices/app/appSlice";
import { RootState } from "../../../redux/store";
import ButtonToggleMenu from "../../button/ButtonToggleMenu";
import Logo from "../../Logo/Logo";
import Menu from "./Menu";

const MenuAbsolute = () => {
    const menuSize = useSelector((state: RootState) => state.app.menuSize);
    const dispatch = useDispatch();

    if (menuSize === "mini") return <></>;
    return (
        <div
            onClick={() => dispatch(toggleMenu())}
            className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
        >
            <div className="  bg-white max-w-max p-3 h-full">
                <div className="flex items-center">
                    <div className="mx-2">
                        <ButtonToggleMenu
                            onClick={(e: any) => {
                                e.stopPropagation();
                                dispatch(toggleMenu());
                            }}
                        ></ButtonToggleMenu>
                    </div>
                    <div>
                        <Logo className="transition-all w-[100px] h-[48px] flex justify-center items-center"></Logo>
                    </div>
                </div>
                <Menu></Menu>
            </div>
        </div>
    );
};

export default MenuAbsolute;
