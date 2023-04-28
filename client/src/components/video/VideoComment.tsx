import React, { useEffect, useState } from "react";
import { IComment } from "../../interfaces/Comment.interface";
import Avatar from "../avatar/Avatar";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { API_URL } from "../../utils/const";
import { AuthorType } from "../../interfaces/User.interface";
import moment from "moment";
const VideoComment = ({ videoID }: { videoID: string }) => {
    const [comments, setCommnents] = useState<IComment[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios({
                    method: "GET",
                    url: API_URL + `/comment/${videoID}`,
                    withCredentials: true,
                });
                setCommnents(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className="text-sm min-h-[100vh]">
            <div className="my-3">
                <p>{comments.length} bình luận</p>
            </div>
            <div className="">
                <CommentInput></CommentInput>
                <div className="my-5">
                    {comments.map((comment: IComment, index) => {
                        return (
                            <CommentItem
                                comment={comment}
                                key={index}
                            ></CommentItem>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const CommentItem = ({ comment }: { comment: IComment }) => {
    const [author, setAuthor] = useState<AuthorType>();

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

    const [showAll, setShowAll] = useState(false);
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
                <div className="flex justify-start items-center">
                    <div className="cursor-pointer flex w-[35px] h-[35px]  justify-center items-center rounded-full text-sm ">
                        <ThumbUpOutlinedIcon fontSize="inherit"></ThumbUpOutlinedIcon>
                    </div>
                    <span className="text-xs text-gray-600">
                        {comment.likes.length}
                    </span>
                </div>
            </div>
        </div>
    );
};

const CommentInput = () => {
    const [comment, setComment] = useState("");
    const [showAction, setShowAction] = useState(false);
    const { avatar } = useSelector((state: RootState) => state.user);
    return (
        <form className="flex justify-start items-start gap-3">
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
                            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-full font-medium disabled:bg-slate-200 disabled:text-gray-400"
                        >
                            Bình luận
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default VideoComment;
