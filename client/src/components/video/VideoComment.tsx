import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IComment } from "../../interfaces/Comment.interface";
import { RootState } from "../../redux/store";
import { API_URL } from "../../utils/const";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
const VideoComment = ({ videoID }: { videoID: string }) => {
    const [comments, setCommnents] = useState<IComment[]>([]);
    const [showAll, setShowAll] = useState(false);
    const { isMobile } = useSelector((state: RootState) => state.app);
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
        <div className="text-sm">
            <div className="my-3">
                <p>{comments.length} bình luận</p>
            </div>
            <div className="">
                <CommentInput
                    videoID={videoID}
                    setComments={setCommnents}
                ></CommentInput>
                <div className="my-5">
                    {isMobile && !showAll && comments.length > 2
                        ? comments
                              .slice(0, 2)
                              .map((comment: IComment, index) => {
                                  return (
                                      <CommentItem
                                          comment={comment}
                                          key={index}
                                      ></CommentItem>
                                  );
                              })
                        : comments.map((comment: IComment, index) => {
                              return (
                                  <CommentItem
                                      comment={comment}
                                      key={index}
                                  ></CommentItem>
                              );
                          })}
                    {isMobile && comments.length > 2 && (
                        <button
                            onClick={() => setShowAll((prev) => !prev)}
                            className="w-full text-center text-blue-500 px-4 py-1"
                        >
                            {showAll ? "Ẩn bớt" : "Xem thêm"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoComment;
