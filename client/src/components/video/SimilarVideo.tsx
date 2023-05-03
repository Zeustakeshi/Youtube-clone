import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthorType } from "../../interfaces/User.interface";
import { IVideo, IVideoSimilar } from "../../interfaces/Video.interface";
import { RootState } from "../../redux/store";
import { API_URL } from "../../utils/const";
import Image from "../image/Image";
import VideoItem from "./VideoItem";
//
const SimilarVideo = ({ similars }: { similars: IVideoSimilar[] }) => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const { isMobile } = useSelector((state: RootState) => state.app);
    useEffect(() => {
        (async () => {
            const videos = await Promise.all(
                similars.map(async (similar) => {
                    const res = await axios({
                        method: "GET",
                        url: API_URL + `/search/video`,
                        params: {
                            q: similar.keyword,
                        },
                        withCredentials: true,
                    });
                    return res.data[0];
                })
            );
            setVideos(videos);
        })();
    }, [similars]);
    if (!videos.length) return <></>;
    return (
        <div className="min-w-[350px]">
            <h3 className="md:text-xl text-lg font-medium mb-4">
                Video liên quan
            </h3>
            <div className="flex flex-col justify-start items-start gap-2">
                {videos.map((item, index) => {
                    if (isMobile)
                        return (
                            <VideoItem key={item._id} video={item}></VideoItem>
                        );
                    return <RelatedVideoItem key={item._id} video={item} />;
                })}
            </div>
        </div>
    );
};

const RelatedVideoItem = ({ video }: { video?: IVideo }) => {
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

    const handleClick = () => {
        if (!video?._id) return;
        navigation(`/video/${video._id}`, {
            state: {
                video: {
                    ...video,
                    author: author,
                },
            },
        });
    };

    return (
        <div
            onClick={handleClick}
            className="flex justify-start items-start gap-2 cursor-pointer"
        >
            <div className="skeleton min-w-[184px] h-[94px] rounded-md">
                <Image src={video?.thumbnailURL}></Image>
            </div>
            <div className="text-sm">
                <h3 className="text-ellipsis max-h-[50px] overflow-clip font-medium">
                    {video?.title}
                </h3>
                <p className="text-xs text-gray-500 my-[2px]">
                    {author?.username}
                </p>
                <div className="flex justify-start items-start gap-2 text-xs text-gray-500">
                    <span>{video?.views}</span>
                    <span>•</span>
                    <span>{moment(video?.createdAt).fromNow()}</span>
                </div>
            </div>
        </div>
    );
};

export default SimilarVideo;
