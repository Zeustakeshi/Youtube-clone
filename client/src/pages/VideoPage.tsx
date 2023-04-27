import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../components/avatar/Avatar";
import Video from "../components/video/Video";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import { updateMenuSize, updateMenuStatus } from "../redux/slices/app/appSlice";
import VideoDescription from "../components/video/VideoDescription";
import VideoComment from "../components/video/VideoComment";
import RelatedVideo from "../components/video/RelatedVideo";
import { useLocation } from "react-router-dom";
import { IVideo } from "../interfaces/Video.interface";
import { RootState } from "../redux/store";
const VideoPage = () => {
    const dispatch = useDispatch();
    const { video }: { video: IVideo } = useLocation().state;
    const user = useSelector((state: RootState) => state.user);
    useEffect(() => {
        dispatch(updateMenuStatus("hidden"));
        dispatch(updateMenuSize("mini"));
    }, []);
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
                            <button className="px-3 py-2 text-xs rounded-full text-white font-medium bg-black">
                                Đăng ký
                            </button>
                        </div>
                        <div className="flex justify-end items-center gap-3 text-xs">
                            <button className="flex justify-center items-center gap-2 rounded-full bg-slate-200 px-4 py-2">
                                <ThumbUpOutlinedIcon fontSize="small" />
                                <span className="font-medium">
                                    {video.likes.length}
                                </span>
                            </button>
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
                {user._id && <VideoComment></VideoComment>}
            </div>
            <div className="min-w-[350px]">
                <RelatedVideo></RelatedVideo>
            </div>
        </div>
    );
};

export default VideoPage;
