import React from "react";
import { NavLink } from "react-router-dom";
import Image from "../image/Image";
//
const RelatedVideo = () => {
    return (
        <div>
            <h3 className="text-xl font-medium mb-4">Video liên quan</h3>
            <div className="flex flex-col justify-start items-start gap-2">
                {new Array(20).fill(0).map((item, index) => {
                    return <RelatedVideoItem key={index}></RelatedVideoItem>;
                })}
            </div>
        </div>
    );
};

const RelatedVideoItem = () => {
    return (
        <NavLink to="/" className="flex justify-start items-start gap-2">
            <div className="skeleton min-w-[184px] h-[94px] rounded-md">
                <Image src="https://source.unsplash.com/featured?superman"></Image>
            </div>
            <div className="text-sm">
                <h3 className="text-ellipsis max-h-[50px] overflow-clip font-medium">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Officia, harum! Officia, harum! Officia, harum! Officia,
                    harum!
                </h3>
                <p className="text-xs text-gray-500 my-[2px]">Minh Hieu</p>
                <div className="flex justify-start items-start gap-2 text-xs text-gray-500">
                    <span>3,9N lượt xem</span>
                    <span>•</span>
                    <span>6 tháng trước</span>
                </div>
            </div>
        </NavLink>
    );
};

export default RelatedVideo;
