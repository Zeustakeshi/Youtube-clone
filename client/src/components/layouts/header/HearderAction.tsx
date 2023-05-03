import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ButtonCreateNewVideo from "../../button/ButtonCreateNewVideo";
import ButtonLogin from "../../button/ButtonLogin";
import ButtonSettingHeader from "../../button/ButtonSettingHeader";

import Notification from "../../notification/Notification";
import HeaderAvatar from "./HeaderAvatar";

const HearderAction = () => {
    const { user, app } = useSelector((state: RootState) => state);
    return (
        <div className="flex justify-end items-center gap-3 px-2">
            {user._id && document.cookie ? (
                <>
                    {!app.isMobile && <ButtonCreateNewVideo />}
                    <Notification />
                    <HeaderAvatar></HeaderAvatar>
                </>
            ) : (
                <>
                    {!app.isMobile && <ButtonLogin></ButtonLogin>}
                    <Notification />
                    {!app.isMobile && (
                        <ButtonSettingHeader></ButtonSettingHeader>
                    )}
                </>
            )}
        </div>
    );
};

export default HearderAction;
