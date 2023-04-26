import React, { forwardRef, Ref, useEffect, useState } from "react";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { NavLink } from "react-router-dom";

interface ImgProps {
    src: string;
    alt?: string;
    imgErrorClass?: string;
    className?: string;
    to?: string;
    size?: 20 | 30 | 40 | 50 | 80 | 100 | number;
    [key: string]: any;
}

const Image = forwardRef(function Image(
    props: ImgProps,
    ref: Ref<HTMLImageElement>
) {
    const {
        src,
        alt = "",
        imgErrorClass = "",
        className = "",
        to,
        size,
        ...rest
    } = props;
    const [failBack, setFallback] = useState(false);
    useEffect(() => {
        setFallback(false);
    }, [src]);

    const handleError = () => {
        setFallback(true);
    };

    if (failBack) {
        return (
            <ImgWrapper to={to}>
                <div
                    style={{
                        width: size,
                        height: size,
                    }}
                    className={`wrapper rounded-[inherit] w-full h-full bg-white flex justify-center items-center  ${imgErrorClass}`}
                >
                    <ImageNotSupportedOutlinedIcon></ImageNotSupportedOutlinedIcon>
                </div>
            </ImgWrapper>
        );
    }

    return (
        <ImgWrapper to={to}>
            <img
                style={{
                    width: size,
                    height: size,
                }}
                ref={ref}
                src={src}
                alt={alt}
                className={` w-full h-full object-cover rounded-[inherit] ${className}`}
                onError={handleError}
                loading="lazy"
                {...rest}
            />
        </ImgWrapper>
    );
});

interface ImgWrapperProps {
    children: React.ReactNode;
    to?: string;
}
const ImgWrapper = ({ children, to }: ImgWrapperProps) => {
    if (to) {
        return (
            <NavLink to={to} className="block w-full h-full rounded-[inherit]">
                {children}
            </NavLink>
        );
    } else {
        return <>{children}</>;
    }
};

export default Image;
