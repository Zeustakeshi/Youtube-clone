import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "../components/avatar/Avatar";
import ButtonSubscribe from "../components/button/ButtonSubscribe";
import ProfileBanner from "../components/layouts/Banner/ProfileBanner";
import Modal from "../components/modal/Modal";
import VideoList from "../components/video/VideoList";
import { AuthorType } from "../interfaces/User.interface";
import { updateMenuStatus } from "../redux/slices/app/appSlice";
import { updateUser } from "../redux/slices/user/userSlice";
import { RootState } from "../redux/store";
import { API_URL } from "../utils/const";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [profileUser, setProfileUser] = useState<AuthorType>(user);
    const { channelID } = useParams();

    // Set default menu state
    useEffect(() => {
        dispatch(updateMenuStatus("show"));
    }, []);

    // Set title
    useEffect(() => {
        if (profileUser.username) {
            document.title = profileUser.username;
        }
    }, [profileUser.username]);

    // Set user profile if !channelID
    useEffect(() => {
        if (!channelID) {
            setProfileUser(user);
        }
    }, [user, channelID]);

    // Fetch user profile
    useEffect(() => {
        if (!channelID) return;
        (async () => {
            try {
                const res = await axios({
                    method: "GET",
                    url: API_URL + `/user/${channelID}`,
                    withCredentials: true,
                });
                setProfileUser(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [channelID]);

    return (
        <div className="w-full">
            <ProfileBanner user={profileUser}></ProfileBanner>
            <ProfileTop user={profileUser}></ProfileTop>
            <div className="mt-5">
                {profileUser._id && (
                    <VideoList
                        url={`/video/channel/${profileUser._id}`}
                    ></VideoList>
                )}
            </div>
        </div>
    );
};

interface IProfileTopProps {
    user: AuthorType;
}

const ProfileTop: React.FC<IProfileTopProps> = ({ user }) => {
    const currentUser = useSelector((state: RootState) => state.user);
    return (
        <div className="flex justify-between items-center my-5 mx-2">
            <div className="flex justify-start items-start gap-4">
                <ProfileAvatar user={user}></ProfileAvatar>
                <div className="flex flex-col justify-start items-start">
                    <ProfileUserName user={user}></ProfileUserName>
                    <div className="text-gray-400 text-sm font-medium">
                        {user.subscribers} người đăng ký
                    </div>
                </div>
            </div>
            <div>
                <ButtonSubscribe
                    subscribed={
                        typeof currentUser._id === "string" &&
                        typeof user._id === "string" &&
                        currentUser.subscribedUsers.includes(user._id)
                    }
                    channelID={user._id}
                    className="px-5 py-3 text-base"
                ></ButtonSubscribe>
            </div>
        </div>
    );
};

// EDIT AVATAR
interface IProfileAvatarProps {
    user: AuthorType;
}
const ProfileAvatar: React.FC<IProfileAvatarProps> = ({ user }) => {
    const [showModal, setShowModal] = useState(false);

    const { channelID } = useParams();
    const currentUser = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();

    const handleUpdateAvatar = async (avatarURL: string) => {
        if (!avatarURL.trim()) {
            toast("Vui lòng nhập đủ thông tin!");
            return;
        } else {
            dispatch(
                updateUser({
                    type: "avatar",
                    data: avatarURL,
                })
            );
            setShowModal(false);
        }
    };
    return (
        <>
            <div className="relative group">
                <Avatar
                    className="border-4 border-slate-200 !cursor-auto"
                    size={128}
                    src={user.avatar}
                ></Avatar>
                {(!channelID || channelID === currentUser._id) && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="absolute w-[40px] h-[40px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-full bg-gray-100 bg-opacity-80  text-gray-600"
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
                    <ModalEditAvatar
                        onSave={handleUpdateAvatar}
                    ></ModalEditAvatar>
                </div>
            </Modal>
        </>
    );
};

interface IModalEditAvatarProps {
    onSave: (avatarURL: string) => void;
}
const ModalEditAvatar: React.FC<IModalEditAvatarProps> = ({ onSave }) => {
    const [avatarURL, setAvatarURL] = useState("");

    return (
        <div className="w-[800px] flex justify-start items-start flex-col p-4 gap-5 ">
            <label
                htmlFor="ip-avatar-url"
                className="w-full text-lg text-gray-600 font-medium "
            >
                Nhập liên kết ảnh đại diện
            </label>
            <input
                value={avatarURL}
                onChange={(e) => setAvatarURL(e.target.value)}
                type="text"
                id="ip-avatar-url"
                placeholder="URL"
                autoFocus
                className="px-5 py-3 outline-blue-500 rounded-md w-full border"
            />
            <div className="w-full flex justify-end items-center">
                <button
                    onClick={() => onSave(avatarURL)}
                    className="px-4 py-3 rounded-md bg-blue-500 text-white font-medium"
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

// EDIT USERNAME
interface IProfileUserNameProps {
    user: AuthorType;
}
const ProfileUserName: React.FC<IProfileUserNameProps> = ({ user }) => {
    const [showModal, setShowModal] = useState(false);

    const { channelID } = useParams();
    const currentUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleUpdateUserName = async (userName: string) => {
        if (!userName.trim()) {
            toast("Vui lòng nhập đủ thông tin!");
            return;
        } else if (user.username === userName) {
            toast.success("Không có dữ liệu thay đổi");
            setShowModal(false);
            return;
        }
        dispatch(
            updateUser({
                type: "username",
                data: userName,
            })
        );
        setShowModal(false);
    };
    return (
        <>
            <div className="group flex justify-start items-center gap-4">
                <div className="text-2xl font-medium">{user.username}</div>
                {(!channelID || currentUser._id === channelID) && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-[40px] h-[40px] rounded-full bg-gray-100 bg-opacity-80 text-gray-600"
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
                    <ModalEditUserName
                        onSave={handleUpdateUserName}
                    ></ModalEditUserName>
                </div>
            </Modal>
        </>
    );
};

interface IModalEditAvatarProps {
    onSave: (userName: string) => void;
}
const ModalEditUserName: React.FC<IModalEditAvatarProps> = ({ onSave }) => {
    const [userName, setUserName] = useState("");

    return (
        <div className="w-[800px] flex justify-start items-start flex-col p-4 gap-5 ">
            <label
                htmlFor="ip-username"
                className="w-full text-lg text-gray-600 font-medium "
            >
                Nhập tên mới của bạn
            </label>
            <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                id="ip-username"
                placeholder="Tên"
                autoFocus
                className="px-5 py-3 outline-blue-500 rounded-md w-full border"
            />
            <div className="w-full flex justify-end items-center">
                <button
                    onClick={() => onSave(userName)}
                    className="px-4 py-3 rounded-md bg-blue-500 text-white font-medium"
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
