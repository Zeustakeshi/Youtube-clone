import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/layouts/navbar/Navbar";
import VideoItem from "../components/video/VideoItem";
import { updateMenuStatus } from "../redux/slices/app/appSlice";

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateMenuStatus("show"));
    }, []);

    return (
        <div className="flex-1">
            <Navbar></Navbar>
            <div className="p-4 flex flex-wrap gap-3 mx-auto justify-center">
                {new Array(20).fill(0).map((video, index) => {
                    return <VideoItem key={index}></VideoItem>;
                })}
            </div>
        </div>
    );
};

export default HomePage;
