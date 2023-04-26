import React from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import Image from "../image/Image";

const VideoItem = () => {
    const isLoading = false;
    return (
        <NavLink to="/video/1" className="block w-[335px] my-4 ">
            <div className="skeleton w-full h-[190px] rounded-lg">
                <Image src="https://source.unsplash.com/featured?macbook"></Image>
            </div>
            <div>
                <div className="flex justify-start items-start gap-2 mt-4">
                    <div className="min-w-[35px]">
                        <Avatar
                            src="https://source.unsplash.com/featured?fish"
                            size={35}
                        ></Avatar>
                    </div>
                    <div className="flex flex-col items-start justify-center text-sm">
                        {isLoading ? (
                            <>
                                <div className="w-[250px] h-[10px] rounded-full skeleton mb-2"></div>
                                <div className="w-[100px] h-[10px]  rounded-full skeleton "></div>
                                <div className="w-[125px] h-[10px] rounded-full skeleton mt-2"></div>
                            </>
                        ) : (
                            <>
                                <p className=" font-medium mb-2">
                                    Lorem ipsum dolor sit amet consectet
                                </p>
                                <h5 className="text-slate-600">Minh Hieu</h5>
                                <div className="flex justify-start items-center gap-1 text-slate-600">
                                    <span>21N lượt xem</span>
                                    <span> • </span>
                                    <span>5 ngày trước</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default VideoItem;
