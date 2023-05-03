import { useEffect } from "react";
import VideoList from "../components/video/VideoList";

const SubscriptionPage = () => {
    useEffect(() => {
        document.title = "YouTube";
    }, []);
    return (
        <div className="flex-1">
            <VideoList url="/video/subscibed"></VideoList>
        </div>
    );
};

export default SubscriptionPage;
