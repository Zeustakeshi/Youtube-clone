import { useEffect } from "react";
import VideoList from "../components/video/VideoList";

const HomePage = () => {
    useEffect(() => {
        document.title = "YouTube";
    }, []);
    return (
        <div className="flex-1">
            <VideoList url="/video"></VideoList>
        </div>
    );
};

export default HomePage;
