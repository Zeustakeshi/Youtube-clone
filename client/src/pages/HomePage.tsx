import { useEffect, useState } from "react";
import { NavBar } from "../components/layouts/navbar/NavBar";
import VideoList from "../components/video/VideoList";
import { INavItem } from "../interfaces/Navbar.interface";

const navItems: INavItem[] = [
    {
        label: "Tất cả",
        to: "",
    },
    {
        label: "Lập trình",
        to: "code,coding,programming,python,javascript,cpp,c#,java,nodejs,php,devops",
    },
    {
        label: "Hoạt hình",
        to: "anime,pops",
    },
    {
        label: "Âm nhạc",
        to: "music,listen",
    },
    {
        label: "Javascript",
        to: "nodejs,js,javascript,react,nextjs,next",
    },
    {
        label: "Hài kịch",
        to: "funny,funy",
    },
];

const HomePage = () => {
    const [navActive, setNavActive] = useState<INavItem>(navItems[0]);
    useEffect(() => {
        document.title = "YouTube";
    }, []);
    return (
        <div className="flex-1">
            <NavBar
                active={navActive}
                setActive={setNavActive}
                items={navItems}
            ></NavBar>
            <VideoList
                url="/video"
                params={
                    navActive.to && {
                        tags: navActive.to,
                    }
                }
            ></VideoList>
        </div>
    );
};

export default HomePage;
