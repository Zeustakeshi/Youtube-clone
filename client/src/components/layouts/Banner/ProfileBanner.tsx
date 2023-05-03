import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthorType } from "../../../interfaces/User.interface";
import { updateUser } from "../../../redux/slices/user/userSlice";
import { RootState } from "../../../redux/store";
import Image from "../../image/Image";

import Modal from "../../modal/Modal";

interface IProfileBannerProps {
    user: AuthorType;
    className?: string;
}

const ProfileBanner: React.FC<IProfileBannerProps> = ({ user, className }) => {
    const [showModal, setShowModal] = useState(false);
    const { channelID } = useParams();
    const currentUser = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();

    const handleUpdateBannerURL = async (bannerURL: string) => {
        if (!bannerURL.trim()) {
            toast("Vui lòng nhập đủ thông tin!");
            return;
        } else {
            dispatch(
                updateUser({
                    type: "background",
                    data: bannerURL,
                })
            );
            setShowModal(false);
        }
    };

    return (
        <>
            <div className={`relative skeleton w-full h-[270px] ${className}`}>
                <div className="absolute w-full h-full bg-slate-900 opacity-20"></div>
                <Image src={user.background}></Image>
                {(!channelID || channelID === currentUser._id) && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="absolute bottom-5 right-5 w-[50px] h-[50px] bg-gray-100 rounded-full flex justify-center items-center"
                    >
                        <Tooltip title="chỉnh sửa">
                            <ModeEditOutlineOutlinedIcon fontSize="inherit" />
                        </Tooltip>
                    </button>
                )}
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
                    <div>
                        <ModalEditBanner
                            onSave={handleUpdateBannerURL}
                        ></ModalEditBanner>
                    </div>
                </div>
            </Modal>
        </>
    );
};

interface IModalEditBannerProps {
    onSave: (bannerURL: string) => void;
}
const ModalEditBanner: React.FC<IModalEditBannerProps> = ({ onSave }) => {
    const [bannerURL, setBannerURL] = useState("");

    return (
        <div className="w-[800px] flex justify-start items-start flex-col p-4 gap-5 ">
            <label
                htmlFor="ip-banner-url"
                className="w-full text-lg text-gray-600 font-medium "
            >
                Nhập liên kết ảnh bìa
            </label>
            <input
                value={bannerURL}
                onChange={(e) => setBannerURL(e.target.value)}
                type="text"
                id="ip-banner-url"
                placeholder="URL"
                autoFocus
                className="px-5 py-3 outline-blue-500 rounded-md w-full border"
            />
            <div className="w-full flex justify-end items-center">
                <button
                    onClick={() => onSave(bannerURL)}
                    className="px-4 py-3 rounded-md bg-blue-500 text-white font-medium"
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default ProfileBanner;
