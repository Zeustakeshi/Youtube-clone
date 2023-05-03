import React, { useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
interface IButtonLikeProps {
    className?: string;
    isShowLikeNumber?: boolean;
    isLiked: boolean;
    likeNumber: number;
    onLike?: () => void | Promise<any>;
    onUnLike?: () => void | Promise<any>;
}

const ButtonLike: React.FC<IButtonLikeProps> = ({
    className = "",
    isLiked,
    likeNumber,
    isShowLikeNumber = true,
    onLike = () => {},
    onUnLike = () => {},
}) => {
    const [liked, setLiked] = useState(isLiked);
    const [couterLike, setCouterLike] = useState(likeNumber);
    const user = useSelector((state: RootState) => state.user);
    const navigation = useNavigate();
    const handleClick = async () => {
        if (!document.cookie || !user._id) {
            navigation("/auth");
            return;
        }
        try {
            if (!liked) {
                await onLike();
                setCouterLike((prev) => prev + 1);
                setLiked(true);
            } else {
                await onUnLike();
                setCouterLike((prev) => (prev > 0 ? prev - 1 : 0));
                setLiked(false);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleUnLike = async () => {
        if (!liked) return;
    };

    return (
        <button onClick={handleClick} className={className}>
            {liked ? (
                <ThumbUpRoundedIcon fontSize="inherit" />
            ) : (
                <ThumbUpOutlinedIcon fontSize="inherit" />
            )}

            {isShowLikeNumber && (
                <span className="font-medium">{couterLike}</span>
            )}
        </button>
    );
};

export default ButtonLike;
