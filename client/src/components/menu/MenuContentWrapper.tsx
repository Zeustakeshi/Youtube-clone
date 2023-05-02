import React, { useRef } from "react";
import { useMenu } from "../../context/MenuContext";
import useClickOutSide from "../../hooks/useClickOutsite";

interface IMenuContentWrapperProps {
    className?: string;
    children: React.ReactNode;
}

const MenuContentWrapper: React.FC<IMenuContentWrapperProps> = ({
    className,
    children,
}) => {
    const { menuRef, show, setShow, setHistory } = useMenu();
    const { nodeRef: clickRef } = useClickOutSide<HTMLDivElement>(() => {
        setShow(false);
        setHistory((prev) => (prev.length > 1 ? prev.slice(0, 1) : prev));
    }, menuRef);

    if (!show) return <></>;
    return (
        <div ref={clickRef} className={`${className}`}>
            {children}
        </div>
    );
};

export default MenuContentWrapper;
