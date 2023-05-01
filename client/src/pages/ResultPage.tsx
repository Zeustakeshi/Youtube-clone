import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import VideoItem from "../components/video/VideoItem";
import { IVideo } from "../interfaces/Video.interface";
import { updateMenuStatus } from "../redux/slices/app/appSlice";
import { API_URL } from "../utils/const";

const ResultPage = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);

    const dispatch = useDispatch();
    const query = useSearchParams()[0].get("q");

    useEffect(() => {
        dispatch(updateMenuStatus("show"));
        document.title = "YouTube";
    }, []);

    const fetchVideo = async (query: string) => {
        console.log("fetch video");
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
            <div className="flex justify-start items-center flex-col gap-2 w-full">
                {videos.length === 0
                    ? new Array(5).fill(0).map((item, index) => {
                          return (
                              <VideoItem
                                  key={index}
                                  type="horizontal"
                              ></VideoItem>
                          );
                      })
                    : videos.map((video) => {
                          return (
                              <VideoItem
                                  video={video}
                                  key={video._id}
                                  type="horizontal"
                              ></VideoItem>
                          );
                      })}
            </div>
        </div>
    );
};

export default ResultPage;
