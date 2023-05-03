import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import VideoItem from "../components/video/VideoItem";
import { IVideo } from "../interfaces/Video.interface";
import { RootState } from "../redux/store";
import { API_URL } from "../utils/const";

const ResultPage = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const { isMobile } = useSelector((state: RootState) => state.app);
    const query = useSearchParams()[0].get("q");

    useEffect(() => {
        document.title = "YouTube";
    }, []);

    const fetchVideo = async (query: string) => {
        const res = await axios({
            method: "GET",
            url: API_URL + `/search/video?q=${encodeURIComponent(query)}`,
            withCredentials: true,
        });
        let videos = res.data;
        setVideos(videos);
    };

    useEffect(() => {
        if (!query) return;
        fetchVideo(query);
    }, [query]);

    return (
        <div className="flex  justify-center items-start w-full mt-6">
            <div className="flex justify-start items-center flex-col gap-2 md:w-full w-[90%]">
                {videos.length === 0
                    ? new Array(5).fill(0).map((item, index) => {
                          return (
                              <VideoItem
                                  key={index}
                                  type={isMobile ? "normal" : "horizontal"}
                              ></VideoItem>
                          );
                      })
                    : videos.map((video) => {
                          return (
                              <VideoItem
                                  video={video}
                                  key={video._id}
                                  type={isMobile ? "normal" : "horizontal"}
                              ></VideoItem>
                          );
                      })}
            </div>
        </div>
    );
};

export default ResultPage;
