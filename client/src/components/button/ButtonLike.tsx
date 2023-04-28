import React, { useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
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
    const handleClick = async () => {
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
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnLike = async () => {
        if (!liked) return;
    };

    return (
        <button onClick={handleClick} className={className}>
            {liked ? (
                <ThumbUpRoundedIcon fontSize="small" />
            ) : (
                <ThumbUpOutlinedIcon fontSize="small" />
            )}

            {isShowLikeNumber && (
                <span className="font-medium">{couterLike}</span>
            )}
        </button>
    );
};

export default ButtonLike;
