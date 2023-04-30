import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IVideo, IVideoResponse } from "../../interfaces/Video.interface";
import { API_URL } from "../../utils/const";
import VideoItem from "./VideoItem";
import InfiniteScroll from "react-infinite-scroll-component";

interface IVideoListProps {
    videos: IVideo[];
}

const VideoList = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const firstFetching = useRef<boolean>(true);
    const [page, setPage] = useState({
        itemCount: 0,
        pageCount: 1,
        currentPage: 1,
    });
    const fetchVideos = async () => {
        try {
            const { data }: { data: IVideoResponse } = await axios({
                method: "GET",
                url: API_URL + `/video`,
                params: {
                    page: page.currentPage,
                    limit: 10,
                },
                withCredentials: true,
            });
            setVideos((prev) => [...prev, ...data.videos]);
            setPage((prev) => {
                return {
                    pageCount: data.pageCount,
                    currentPage: prev.currentPage + 1,
                    itemCount: data.itemCount,
                };
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (firstFetching.current) {
            fetchVideos();
            firstFetching.current = false;
        }
    }, []);

    return (
        <InfiniteScroll
            className="p-4 flex flex-wrap gap-3 mx-auto justify-center"
            dataLength={videos.length}
            next={() => {
                !firstFetching.current && fetchVideos();
            }}
            hasMore={page.currentPage <= page.pageCount}
            loader={new Array(20).fill(0).map((video, index) => {
                return <VideoItem key={index}></VideoItem>;
            })}
        >
            {videos.map((video, index) => {
                return <VideoItem key={index} video={video}></VideoItem>;
            })}
        </InfiniteScroll>
    );
};

export default VideoList;
