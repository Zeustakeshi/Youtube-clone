import React from "react";
import { useSelector } from "react-redux";
import { IAvatarProps } from "../../interfaces/Avatar.interface";
import { RootState } from "../../redux/store";
// import useWindowSize from "../hooks/useWindowSize";
import Image from "../image/Image";

const Avatar: React.FC<IAvatarProps> = ({
    src,
    to,
    className = "",
    size = 50,
    onClick = () => {},
}) => {
    const { isMobile } = useSelector((state: RootState) => state.app);
    if (isMobile) {
        size *= 0.9;
    }

    return (
        <div
            onClick={onClick}
            style={{
                width: size,
                height: size,
            }}
            className={`relative md:w-[${size}px] md:h-[${size}px] !w-[${
                size * 0.8
            }px] !h-[${
                size * 0.8
            }px] rounded-full skeleton ${className} cursor-pointer`}
        >
            <Image to={to} src={src}></Image>
        </div>
    );
};

export default Avatar;
