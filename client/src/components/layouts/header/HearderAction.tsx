import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ButtonCreateNewVideo from "../../button/ButtonCreateNewVideo";
import ButtonLogin from "../../button/ButtonLogin";

import Notification from "../../notification/Notification";
import HeaderAvatar from "./HeaderAvatar";

const HearderAction = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <div className="flex justify-end items-center gap-3">
            {user._id && document.cookie ? (
                <>
                    <ButtonCreateNewVideo />
                    <Notification />
                    <HeaderAvatar></HeaderAvatar>
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

export default HearderAction;
