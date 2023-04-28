import axios from "axios";
import { useEffect, useState } from "react";
import { IComment } from "../../interfaces/Comment.interface";
import { API_URL } from "../../utils/const";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
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
                <CommentInput
                    videoID={videoID}
                    setComments={setCommnents}
                ></CommentInput>
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

export default VideoComment;
