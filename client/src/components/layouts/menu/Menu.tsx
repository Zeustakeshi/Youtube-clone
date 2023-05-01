import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IMenuItem } from "../../../interfaces/Menu.interface";
import { RootState } from "../../../redux/store";
import { API_URL } from "../../../utils/const";
import Avatar from "../../avatar/Avatar";
import ButtonLogin from "../../button/ButtonLogin";
import { discoverItems, menuItems, menuItemsMini } from "./menuData";
import MenuGroup from "./MenuGroup";

const Menu: React.FC = ({}) => {
    const { user, app } = useSelector((state: RootState) => state);
    const [subscripeChannels, setSubscripeChannels] = useState<IMenuItem[]>([]);

    useEffect(() => {
        if (!user.subscribedUsers.length) return;
        (async () => {
            try {
                const subscribedUsers = await Promise.all(
                    user.subscribedUsers.map(async (subscribedUser) => {
                        const res = await axios({
                            method: "GET",
                            url: API_URL + `/user/${subscribedUser}`,
                            withCredentials: true,
                        });
                        return res.data;
                    })
                );
                setSubscripeChannels(
                    subscribedUsers.map((item) => {
                        return {
                            Icon: <Avatar src={item.avatar} size={28} />,
                            label: item.username,
                            to: "/a",
                        };
                    })
                );
            } catch (error) {
                console.log(error);
            }
        })();
    }, [user.subscribedUsers]);

    return (
        <div
            className={`sticky h-[calc(100vh-80px)] max-w-[200px] top-[80px] flex flex-col justify-start items-start overflow-auto min-w-min  hiden-scrollbar px-2`}
        >
            <MenuGroup items={menuItemsMini}></MenuGroup>

            {!document.cookie && app.menuSize === "large" && (
                <div className="w-full flex flex-col justify-center items-center py-4 border-b border-b-gray-200 ">
                    <div className="text-sm mb-2">
                        Đăng nhập để thích video, bình luận và đăng ký
                    </div>
                    <ButtonLogin></ButtonLogin>
                </div>
            )}
            {document.cookie && (
                <MenuGroup items={menuItems} hidden></MenuGroup>
            )}
            {document.cookie && subscripeChannels.length > 0 && (
                <MenuGroup
                    items={subscripeChannels}
                    hidden
                    name={document.cookie ? "Kênh đăng ký" : ""}
                    maxItem={4}
                />
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
