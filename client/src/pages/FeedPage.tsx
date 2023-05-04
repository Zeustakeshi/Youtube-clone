import React from "react";
import { useParams } from "react-router-dom";
import VideoList from "../components/video/VideoList";

const FeedPage = () => {
    const { tag } = useParams();
    return (
        <div>
            {/* <VideoList
                url="/video"
                params={{ tags: "code,coding" }}
            ></VideoList> */}
        </div>
    );
};

export default FeedPage;
