import axios from "axios";
import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        if (!query) return;
        (async () => {
            const res = await axios({
                method: "GET",
                url: API_URL + `/search/video?q=${encodeURIComponent(query)}`,
                withCredentials: true,
            });
            setVideos(res.data);
        })();
    }, [query]);

    return (
        <div className="flex  justify-center items-start w-full mt-6">
            <div className="flex justify-start items-center flex-col gap-2 w-full">
                {videos.map((video) => {
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
