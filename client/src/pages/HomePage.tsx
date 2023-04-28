import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/layouts/navbar/Navbar";
import VideoList from "../components/video/VideoList";
import { updateMenuStatus } from "../redux/slices/app/appSlice";

const HomePage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateMenuStatus("show"));
    }, []);

    return (
        <div className="flex-1">
            <Navbar></Navbar>
            <VideoList></VideoList>
        </div>
    );
};

export default HomePage;
