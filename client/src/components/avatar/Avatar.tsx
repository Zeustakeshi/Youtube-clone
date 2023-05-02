import React from "react";
import { IAvatarProps } from "../../interfaces/Avatar.interface";
// import useWindowSize from "../hooks/useWindowSize";
import Image from "../image/Image";

const Avatar: React.FC<IAvatarProps> = ({
    src,
    to,
    className = "",
    size = 50,
    onClick = () => {},
}) => {
    // const windowSize = useWindowSize();
    // if (windowSize.width && windowSize.width < 680) {
    //     size *= 0.8;
    // }

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
