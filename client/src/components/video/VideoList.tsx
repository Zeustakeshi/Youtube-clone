import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IVideo, IVideoResponse } from "../../interfaces/Video.interface";
import { API_URL } from "../../utils/const";
import VideoItem from "./VideoItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IVideoList {
    url: string;
    params?: any;
}

const VideoList: React.FC<IVideoList> = ({ url, params }) => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const firstFetching = useRef<boolean>(true);
    const [page, setPage] = useState({
        itemCount: 0,
        pageCount: 1,
        currentPage: 1,
    });
    const fetchVideos = async () => {
        toast("fetch");
        try {
            const { data }: { data: IVideoResponse | any } = await axios({
                method: "GET",
                url: API_URL + url,
                headers: {
                    authorization: `Bearer ${document.cookie.split("=")[1]}`,
                },
                params: {
                    page: page.currentPage,
                    limit: 8,
                    ...params,
                },
                withCredentials: true,
            });

            setVideos((prev) => [...prev, ...data.videos]);

            setPage((prev) => {
                return {
                    pageCount: data.pageCount || 1,
                    currentPage: prev.currentPage + 1,
                    itemCount: data.itemCount || 1,
                };
            });
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (firstFetching.current) {
            fetchVideos();
            firstFetching.current = false;
        }
        return () => {
            setVideos([]);
            setPage({
                itemCount: 0,
                pageCount: 1,
                currentPage: 1,
            });
        };
    }, [url]);

    return (
        <InfiniteScroll
            className="p-4 flex flex-wrap gap-3 mx-auto justify-center min-h-screen"
            dataLength={videos.length}
            next={() => {
                fetchVideos();
            }}
            hasMore={page.currentPage <= page.pageCount}
            loader={new Array(8).fill(0).map((video, index: number) => {
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
