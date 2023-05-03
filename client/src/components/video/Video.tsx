import React from "react";
import { useSelector } from "react-redux";
import { IVideo } from "../../interfaces/Video.interface";
import { RootState } from "../../redux/store";

interface IVideoProps {
    youtubeID: string;
    title: string;
}

const Video: React.FC<IVideoProps> = ({ youtubeID, title }) => {
    const { isMobile } = useSelector((state: RootState) => state.app);
    return (
        <div className="skeleton md:w-[1280px] w-full aspect-video">
            <iframe
                className="w-full h-full object-fill"
                src={`https://www.youtube.com/embed/${youtubeID}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Video;
