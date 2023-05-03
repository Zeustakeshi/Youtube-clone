import React from "react";
import VideoList from "../components/video/VideoList";

const TrendingPage = () => {
    return (
        <div className="py-5">
            <VideoList url="/video/trend"></VideoList>
        </div>
    );
};

export default TrendingPage;
