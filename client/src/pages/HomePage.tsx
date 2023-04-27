import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layouts/navbar/Navbar";
import VideoItem from "../components/video/VideoItem";
import { updateMenuStatus } from "../redux/slices/app/appSlice";
import { fetchVideo } from "../redux/slices/video/videoSlice";
import { RootState } from "../redux/store";

const HomePage = () => {
    const dispatch = useDispatch();
    const { videos } = useSelector((state: RootState) => state.video);
    useEffect(() => {
        dispatch(updateMenuStatus("show"));
        dispatch(fetchVideo());
    }, []);

    return (
        <div className="flex-1">
            <Navbar></Navbar>
            <div className="p-4 flex flex-wrap gap-3 mx-auto justify-center">
                {videos.map((video, index) => {
                    return <VideoItem key={index} video={video}></VideoItem>;
                })}
            </div>
        </div>
    );
};

export default HomePage;
