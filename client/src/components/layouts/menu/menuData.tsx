import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import { IMenuItem } from "../../../interfaces/Menu.interface";
import Avatar from "../../avatar/Avatar";
export const menuItemsMini: IMenuItem[] = [
    { Icon: <HomeRoundedIcon fontSize="small" />, label: "Trang chủ", to: "/" },
    {
        Icon: <SubscriptionsOutlinedIcon fontSize="small" />,
        label: "Kênh đăng ký",
        to: "/",
    },
    {
        Icon: <VideoLibraryOutlinedIcon fontSize="small" />,
        label: "Thư viện",
        to: "/",
    },
    {
        Icon: <LocalFireDepartmentOutlinedIcon fontSize="small" />,
        label: "Thịnh hành",
        to: "/",
    },
];

export const menuItems: IMenuItem[] = [
    {
        Icon: <HistoryOutlinedIcon fontSize="small" />,
        label: "Video đã xem",
        to: "/",
    },
    {
        Icon: <SmartDisplayOutlinedIcon fontSize="small" />,
        label: "Video của bạn",
        to: "/",
    },
];

export const fakeSubscripeChannels: IMenuItem[] = [
    {
        Icon: (
            <Avatar
                src="https://source.unsplash.com/featured/?story"
                size={28}
            />
        ),
        label: "Cartoon",
        to: "/",
    },
    {
        Icon: (
            <Avatar
                src="https://source.unsplash.com/featured/?story"
                size={28}
            />
        ),
        label: "Cartoon",
        to: "/",
    },
    {
        Icon: (
            <Avatar
                src="https://source.unsplash.com/featured/?story"
                size={28}
            />
        ),
        label: "Cartoon",
        to: "/",
    },
    {
        Icon: (
            <Avatar
                src="https://source.unsplash.com/featured/?story"
                size={28}
            />
        ),
        label: "Cartoon",
        to: "/",
    },
    {
        Icon: (
            <Avatar
                src="https://source.unsplash.com/featured/?story"
                size={28}
            />
        ),
        label: "Cartoon",
        to: "/",
    },
    {
        Icon: (
            <Avatar
                src="https://source.unsplash.com/featured/?story"
                size={28}
            />
        ),
        label: "Cartoon",
        to: "/",
    },
    {
        Icon: (
            <Avatar
                src="https://source.unsplash.com/featured/?story"
                size={28}
            />
        ),
        label: "Cartoon",
        to: "/",
    },
    {
        Icon: (
            <Avatar
                src="https://source.unsplash.com/featured/?story"
                size={28}
            />
        ),
        label: "Cartoon",
        to: "/",
    },
    {
        Icon: (
            <Avatar
                src="https://source.unsplash.com/featured/?story"
                size={28}
            />
        ),
        label: "Cartoon",
        to: "/",
    },
    {
        Icon: (
            <Avatar
                src="https://source.unsplash.com/featured/?story"
                size={28}
            />
        ),
        label: "Cartoon",
        to: "/",
    },
];

export const discoverItems: IMenuItem[] = [
    {
        Icon: <LocalFireDepartmentOutlinedIcon fontSize="small" />,
        label: "Thịnh hành",
        to: "/",
    },
    {
        Icon: <MusicNoteOutlinedIcon fontSize="small" />,
        label: "Âm nhạc",
        to: "/",
    },
    {
        Icon: <SportsEsportsOutlinedIcon fontSize="small" />,
        label: "Trò chơi",
        to: "/",
    },
    {
        Icon: <NewspaperOutlinedIcon fontSize="small" />,
        label: "Tin tức",
        to: "/",
    },
    {
        Icon: <EmojiEventsOutlinedIcon fontSize="small" />,
        label: "Thể thao",
        to: "/",
    },
];
