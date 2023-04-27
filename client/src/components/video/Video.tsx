import React from "react";
import { IVideo } from "../../interfaces/Video.interface";

interface IVideoProps {
    youtubeID: string;
    title: string;
}

const Video: React.FC<IVideoProps> = ({ youtubeID, title }) => {
    return (
        <div className="skeleton w-[1280px] h-[720px]">
            <iframe
                width="1280"
                height="720"
                src={`https://www.youtube.com/embed/${youtubeID}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Video;
