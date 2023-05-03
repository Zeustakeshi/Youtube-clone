import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import { ICollapsedMenuItem } from "../../../interfaces/Menu.interface";

export const menuItemsMini: ICollapsedMenuItem[] = [
    {
        Icon: <HomeOutlinedIcon fontSize="small" />,
        label: "Trang chủ",
        to: "/",
    },
    {
        Icon: <SubscriptionsOutlinedIcon fontSize="small" />,
        label: "Kênh đăng ký",
        to: "/subscriptions",
    },
    {
        Icon: <VideoLibraryOutlinedIcon fontSize="small" />,
        label: "Thư viện",
        to: "/library",
    },
    {
        Icon: <LocalFireDepartmentOutlinedIcon fontSize="small" />,
        label: "Thịnh hành",
        to: "/trending",
    },
];

export const menuItems: ICollapsedMenuItem[] = [
    {
        Icon: <HistoryOutlinedIcon fontSize="small" />,
        label: "Video đã xem",
        to: "/history",
    },
    {
        Icon: <SmartDisplayOutlinedIcon fontSize="small" />,
        label: "Video của bạn",
        to: "/a",
    },
];

export const discoverItems: ICollapsedMenuItem[] = [
    {
        Icon: <LocalFireDepartmentOutlinedIcon fontSize="small" />,
        label: "Thịnh hành",
        to: "/trending",
    },
    {
        Icon: <MusicNoteOutlinedIcon fontSize="small" />,
        label: "Âm nhạc",
        to: "/a",
    },
    {
        Icon: <SportsEsportsOutlinedIcon fontSize="small" />,
        label: "Trò chơi",
        to: "/a",
    },
    {
        Icon: <NewspaperOutlinedIcon fontSize="small" />,
        label: "Tin tức",
        to: "/a",
    },
    {
        Icon: <EmojiEventsOutlinedIcon fontSize="small" />,
        label: "Thể thao",
        to: "/a",
    },
];
