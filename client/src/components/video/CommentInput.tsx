import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IComment } from "../../interfaces/Comment.interface";
import { RootState } from "../../redux/store";
import { API_URL } from "../../utils/const";
import Avatar from "../avatar/Avatar";

interface ICommentInputProps {
    videoID: string;
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const CommentInput: React.FC<ICommentInputProps> = ({
    setComments,
    videoID,
}) => {
    const [comment, setComment] = useState("");
    const [showAction, setShowAction] = useState(false);
    const { avatar } = useSelector((state: RootState) => state.user);
    const navigation = useNavigate();
    const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!comment.trim()) return;
        if (!document.cookie) {
            navigation("/auth");
            return;
        }
        try {
            const res = await axios({
                method: "POST",
                url: API_URL + `/comment`,
                headers: {
                    authorization: `Bearer ${document.cookie.split("=")[1]}`,
                },
                data: {
                    videoID: videoID,
                    comment: comment,
                },
            });
            const newCommentData = res.data as IComment;
            setComments((prev) => [newCommentData, ...prev]);
            setComment("");
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <form
            onSubmit={handleComment}
            className="flex justify-start items-start gap-3"
        >
            <Avatar src={avatar} size={45}></Avatar>
            <div className="flex-1 flex flex-col items-start justify-center gap-2">
                <input
                    onFocus={() => setShowAction(true)}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Viết bình luận..."
                    className="w-full outline-none border-b border-b-gray-200 py-2 focus:border-b-blue-500"
                />
                {showAction && (
                    <div className="w-full flex justify-end items-center gap-3">
                        <button
                            onClick={() => {
                                setShowAction(false);
                                setComment("");
                            }}
                            className="px-3 py-2 text-sm"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={!comment.trim()}
                            className="md:px-4 md:py-2 px-4 py-1 text-sm bg-blue-500 text-white rounded-full font-medium disabled:bg-slate-200 disabled:text-gray-400"
                        >
                            Bình luận
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default CommentInput;
