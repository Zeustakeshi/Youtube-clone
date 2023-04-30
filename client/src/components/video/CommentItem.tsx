import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IComment } from "../../interfaces/Comment.interface";
import { AuthorType } from "../../interfaces/User.interface";
import { RootState } from "../../redux/store";
import { API_URL } from "../../utils/const";
import Avatar from "../avatar/Avatar";
import ButtonLike from "../button/ButtonLike";

const CommentItem = ({ comment }: { comment: IComment }) => {
    const [author, setAuthor] = useState<AuthorType>();
    const [showAll, setShowAll] = useState(false);

    const user = useSelector((state: RootState) => state.user);
    useEffect(() => {
        (async () => {
            try {
                const res = await axios({
                    method: "GET",
                    url: API_URL + `/user/${comment.userID}`,
                    withCredentials: true,
                });
                setAuthor(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleLikeComment = async () => {
        await axios({
            method: "PATCH",
            url: API_URL + `/comment/${comment._id}/like`,
            headers: {
                authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
        });
    };
    const handleUnLikeComment = async () => {
        await axios({
            method: "PATCH",
            url: API_URL + `/comment/${comment._id}/unlike`,
            headers: {
                authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
        });
    };

    return (
        <div className="group flex justify-start items-start gap-2 my-5 transition-all">
            <Avatar
                src={author?.avatar}
                size={40}
                className="min-w-[40px]"
            ></Avatar>
            <div>
                <div className="flex justify-start items-center gap-1 text-xs">
                    <span className="font-medium">{author?.username}</span>
                    <span className="text-gray-500">
                        {moment(comment.updatedAt).fromNow()}
                    </span>
                </div>
                <p
                    className={`my-2 ${
                        !showAll ? "max-h-[100px]  overflow-clip" : ""
                    }`}
                >
                    {comment.comment}
                </p>
                {comment.comment.length >= 800 && (
                    <button
                        className="text-slate-500 text-xs"
                        onClick={() => setShowAll((prev) => !prev)}
                    >
                        {showAll ? "Ẩn bớt" : "Xem thêm"}
                    </button>
                )}
                <ButtonLike
                    isLiked={
                        typeof user._id === "string" &&
                        comment.likes.includes(user._id)
                    }
                    likeNumber={comment.likes.length}
                    onLike={handleLikeComment}
                    onUnLike={handleUnLikeComment}
                    className="flex w-[35px] h-[35px]  justify-center items-center rounded-full text-sm gap-2"
                ></ButtonLike>
            </div>
        </div>
    );
};

export default CommentItem;
