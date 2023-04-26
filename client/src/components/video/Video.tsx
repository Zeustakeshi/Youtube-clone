import React from "react";

const Video = () => {
    return (
        <div className="skeleton w-[1280px] h-[720px]">
            <iframe
                width="1280"
                height="720"
                src="https://www.youtube.com/embed/yIaXoop8gl4"
                title="[作業用BGM] 聴くとポジティブな気持ちになる心地よい音楽 - Morning Mood - Daily Routine"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Video;
