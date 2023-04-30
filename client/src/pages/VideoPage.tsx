import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Avatar from "../components/avatar/Avatar";
import ButtonLike from "../components/button/ButtonLike";
import ButtonSubscribe from "../components/button/ButtonSubscribe";
import RelatedVideo from "../components/video/RelatedVideo";
import Video from "../components/video/Video";
import VideoComment from "../components/video/VideoComment";
import VideoDescription from "../components/video/VideoDescription";
import { IVideo } from "../interfaces/Video.interface";
import { updateMenuSize, updateMenuStatus } from "../redux/slices/app/appSlice";
import { RootState } from "../redux/store";
import { API_URL } from "../utils/const";

const VideoPage = () => {
    const dispatch = useDispatch();
    const { video }: { video: IVideo } = useLocation().state;
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        document.title = video.title;
    }, [video.title]);

    useEffect(() => {
        dispatch(updateMenuStatus("hidden"));
        dispatch(updateMenuSize("mini"));
    }, []);

    const handleLikeVideo = async () => {
        await axios({
            method: "PATCH",
            url: API_URL + `/video/${video._id}/like`,
            headers: {
                authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
        });
    };

    const handleUnLikeVideo = async () => {
        await axios({
            method: "PATCH",
            url: API_URL + `/video/${video._id}/unlike`,
            headers: {
                authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
        });
    };

    return (
        <div className="mx-auto flex items-start justify-center w-[1780px]  p-3 py-4 gap-10">
            <div className="max-w-[1280px]">
                <Video youtubeID={video.youtubeID} title={video.title}></Video>
                <div className="my-3">
                    <h3 className="my-2 text-lg font-semibold">
                        {video?.title}
                    </h3>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-start items-center gap-3 text-sm">
                            <Avatar
                                src={video.author?.avatar}
                                size={45}
                            ></Avatar>
                            <div className="flex flex-col items-start justify-center">
                                <h4 className="font-medium ">
                                    {video.author?.username}
                                </h4>
                                <span className="text-slate-500 font-medium text-xs">
                                    {video.author?.subscribers} người đăng ký
                                </span>
                            </div>
                            <ButtonSubscribe
                                channelID={video.author?._id}
                                subscribed={
                                    typeof user._id === "string" &&
                                    typeof video.author?._id === "string" &&
                                    user.subscribedUsers.includes(
                                        video.author?._id
                                    )
                                }
                                className=""
                            ></ButtonSubscribe>
                        </div>
                        <div className="flex justify-end items-center gap-3 text-xs">
                            <ButtonLike
                                isLiked={
                                    typeof user._id === "string" &&
                                    video.likes.includes(user._id)
                                }
                                likeNumber={video.likes.length}
                                onLike={handleLikeVideo}
                                onUnLike={handleUnLikeVideo}
                                className="flex justify-center items-center gap-2 rounded-full bg-slate-200 px-4 py-2 text-base"
                            ></ButtonLike>
                            <button className="flex justify-center items-center gap-2 rounded-full bg-slate-200 px-4 py-2">
                                <ShareOutlinedIcon fontSize="small" />
                                <span className="font-medium">Chia sẻ</span>
                            </button>
                            <button className="flex justify-center items-center gap-2 rounded-full bg-slate-200 px-4 py-2">
                                <AddToPhotosOutlinedIcon
                                    fontWeight={400}
                                    fontSize="small"
                                />
                                <span className="font-medium">Lưu</span>
                            </button>
                        </div>
                    </div>
                    <VideoDescription
                        views={video.views}
                        updatedAt={video.updatedAt}
                    ></VideoDescription>
                </div>
                {user._id && typeof video._id === "string" && (
                    <VideoComment videoID={video._id}></VideoComment>
                )}
            </div>
            <div className="min-w-[350px]">
                <RelatedVideo></RelatedVideo>
            </div>
        </div>
    );
};

export default VideoPage;
