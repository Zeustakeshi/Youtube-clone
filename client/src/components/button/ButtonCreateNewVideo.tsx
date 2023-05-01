import React, { useState } from "react";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import Modal from "../modal/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import UploadVideo from "../upload/UploadVideo";
const ButtonCreateNewVideo = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div
                onClick={() => setShowModal(true)}
                className="p-2 cursor-pointer"
            >
                <VideoCallOutlinedIcon></VideoCallOutlinedIcon>
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="bg-white shadow-md rounded-md min-w-[300px] min-h-[200px]">
                    <div className="text-gray-500 flex justify-end items-center">
                        <span
                            onClick={() => setShowModal(false)}
                            className="p-3 hover:bg-slate-200 rounded-md cursor-pointer transition-all"
                        >
                            <CloseOutlinedIcon></CloseOutlinedIcon>
                        </span>
                    </div>
                    <UploadVideo></UploadVideo>
                </div>
            </Modal>
        </>
    );
};

export default ButtonCreateNewVideo;
