import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ButtonLogin from "../../button/ButtonLogin";
import {
    discoverItems,
    fakeSubscripeChannels,
    menuItems,
    menuItemsMini,
} from "./menuData";
import MenuGroup from "./MenuGroup";

const Menu: React.FC = ({}) => {
    const { user, app } = useSelector((state: RootState) => state);
    return (
        <div
            className={`sticky h-[calc(100vh-80px)] max-w-[200px] top-[80px] flex flex-col justify-start items-start overflow-auto min-w-min  hiden-scrollbar px-2`}
        >
            <MenuGroup items={menuItemsMini}></MenuGroup>

            {!user._id && app.menuSize === "large" && (
                <div className="w-full flex flex-col justify-center items-center py-4 border-b border-b-gray-200 ">
                    <div className="text-sm mb-2">
                        Đăng nhập để thích video, bình luận và đăng ký
                    </div>
                    <ButtonLogin></ButtonLogin>
                </div>
            )}
            {user._id && <MenuGroup items={menuItems} hidden></MenuGroup>}
            {user._id && (
                <MenuGroup
                    items={fakeSubscripeChannels}
                    hidden
                    name={user._id ? "Kênh đăng ký" : ""}
                    maxItem={3}
                ></MenuGroup>
            )}

            <MenuGroup
                items={discoverItems}
                hidden
                name="Khám phá"
                maxItem={6}
            ></MenuGroup>
        </div>
    );
};

export default Menu;
