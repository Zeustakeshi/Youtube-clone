import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IVideo } from "../../interfaces/Video.interface";
import Avatar from "../avatar/Avatar";
import moment from "moment";
import Image from "../image/Image";
import { AuthorType, User } from "../../interfaces/User.interface";
import axios from "axios";
import { API_URL } from "../../utils/const";

const VideoItem = ({ video }: { video: IVideo }) => {
    const [author, setAuthor] = useState<AuthorType>();
    const navigation = useNavigate();
    useEffect(() => {
        (async () => {
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
    }, []);

    const isLoading = false;
    return (
        <div
            onClick={() => {
                navigation(`/video/${video._id}`, {
                    state: {
                        video: {
                            ...video,
                            author: author,
                        },
                    },
                });
            }}
            className="block w-[335px] my-4 "
        >
            <div className="skeleton w-full h-[190px] rounded-lg">
                <Image src={video.thumbnailURL}></Image>
            </div>
            <div>
                <div className="flex justify-start items-start gap-2 mt-4">
                    <div className="min-w-[35px]">
                        <Avatar src={author?.avatar} size={35}></Avatar>
                    </div>
                    <div className="flex flex-col items-start justify-center text-sm">
                        {isLoading ? (
                            <>
                                <div className="w-[250px] h-[10px] rounded-full skeleton mb-2"></div>
                                <div className="w-[100px] h-[10px]  rounded-full skeleton "></div>
                                <div className="w-[125px] h-[10px] rounded-full skeleton mt-2"></div>
                            </>
                        ) : (
                            <>
                                <p className="content-overflow-limitline  font-medium mb-2">
                                    {video.title}
                                </p>
                                <h5 className="text-slate-600">
                                    {author?.username}
                                </h5>
                                <div className="flex justify-start items-center gap-1 text-slate-600">
                                    <span>{video.views} lượt xem</span>
                                    <span> • </span>
                                    <span>
                                        {moment(video.updatedAt).fromNow()}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoItem;
