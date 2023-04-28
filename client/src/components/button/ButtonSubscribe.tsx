import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserSubscribed } from "../../redux/slices/user/userSlice";
import { RootState } from "../../redux/store";
import { API_URL } from "../../utils/const";

interface IButtonSubscribe {
    className?: string;
    subscribed: boolean;
    channelID?: string | null | number;
}

const ButtonSubscribe: React.FC<IButtonSubscribe> = ({
    className = "",
    subscribed,
    channelID,
}) => {
    const [isSubscribed, setIsSubsctibed] = useState(subscribed);
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const handleSubscribe = async () => {
        if (!channelID || typeof channelID !== "string") return;
        if (!document.cookie) {
            navigation("/auth");
            return;
        }
        try {
            if (!isSubscribed) {
                await axios({
                    method: "PATCH",
                    url: API_URL + `/user/sub/${channelID}`,
                    headers: {
                        authorization: `Bearer ${
                            document.cookie.split("=")[1]
                        }`,
                    },
                });
                setIsSubsctibed(true);
                dispatch(
                    updateUserSubscribed([...user.subscribedUsers, channelID])
                );
            } else {
                await axios({
                    method: "PATCH",
                    url: API_URL + `/user/unsub/${channelID}`,
                    headers: {
                        authorization: `Bearer ${
                            document.cookie.split("=")[1]
                        }`,
                    },
                });
                setIsSubsctibed(false);
                dispatch(
                    updateUserSubscribed(
                        user.subscribedUsers.filter(
                            (item) => item !== channelID
                        )
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            onClick={handleSubscribe}
            className={`px-3 py-2 text-xs rounded-full text-white font-medium bg-black ${
                subscribed ? "bg-gray-200 !text-gray-500" : ""
            } ${className}`}
        >
            {subscribed ? "Đã đăng ký" : "Đăng ký"}
        </button>
    );
};

export default ButtonSubscribe;
