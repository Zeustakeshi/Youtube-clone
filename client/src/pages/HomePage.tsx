import { useEffect } from "react";
import { useDispatch } from "react-redux";
import VideoList from "../components/video/VideoList";
import { updateMenuStatus } from "../redux/slices/app/appSlice";

const HomePage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateMenuStatus("show"));
        document.title = "YouTube";
    }, []);
    return (
        <div className="flex-1">
            <VideoList url="/video"></VideoList>
        </div>
    );
};

export default HomePage;
