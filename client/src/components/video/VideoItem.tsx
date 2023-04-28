import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IVideo } from "../../interfaces/Video.interface";
import Avatar from "../avatar/Avatar";
import moment from "moment";
import Image from "../image/Image";
import { AuthorType, User } from "../../interfaces/User.interface";
import axios from "axios";
import { API_URL } from "../../utils/const";

const VideoItem = ({
    video,
    isLoading = false,
}: {
    video?: IVideo;
    isLoading?: boolean;
}) => {
    const [author, setAuthor] = useState<AuthorType>();
    const navigation = useNavigate();
    useEffect(() => {
        (async () => {
            if (!video?.userID) return;
            try {
                const res = await axios({
                    method: "GET",
                    url: API_URL + `/user/${video.userID}`,
                    withCredentials: true,
                });
                setAuthor(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [video]);
    return (
        <div
            onClick={() => {
                if (!video?._id) return;
                navigation(`/video/${video._id}`, {
                    state: {
                        video: {
                            ...video,
                            author: author,
                        },
                    },
                });
            }}
            className="block w-[335px] my-4 cursor-pointer"
        >
            <div className="skeleton w-full h-[190px] rounded-lg">
                {video?.thumbnailURL && (
                    <Image src={video.thumbnailURL}></Image>
                )}
            </div>
            <div>
                <div className="flex justify-start items-start gap-2 mt-4">
                    <div className="min-w-[35px]">
                        {author?.avatar ? (
                            <Avatar src={author.avatar} size={35}></Avatar>
                        ) : (
                            <div className="w-[35px] h-[35px] rounded-full skeleton"></div>
                        )}
                    </div>

                    <div className="flex flex-col items-start justify-center text-sm">
                        {video?.title ? (
                            <p className="content-overflow-limitline  font-medium mb-2">
                                {video?.title}
                            </p>
                        ) : (
                            <div className="w-[250px] h-[10px] rounded-full skeleton mb-2"></div>
                        )}

                        {author?.username ? (
                            <h5 className="text-slate-600">
                                {author?.username}
                            </h5>
                        ) : (
                            <div className="w-[100px] h-[10px]  rounded-full skeleton "></div>
                        )}
                        {video?.createdAt ? (
                            <div className="flex justify-start items-center gap-1 text-slate-600">
                                <span>{video?.views} lượt xem</span>
                                <span> • </span>
                                <span>
                                    {moment(video?.createdAt).fromNow()}
                                </span>
                            </div>
                        ) : (
                            <div className="w-[125px] h-[10px] rounded-full skeleton mt-2"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoItem;
