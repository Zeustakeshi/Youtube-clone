import React, { useRef } from "react";
import { MenuProvider } from "../../context/MenuContext";
import { IMenuData, IMenuItem } from "../../interfaces/Menu.interface";
import MenuLabel from "./MenuLabel";

interface IMenuProps {
    children: React.ReactNode;
    label: React.ReactNode;
    data: IMenuData;
    onChange?: (item: IMenuItem) => void;
}

const Menu: React.FC<IMenuProps> = ({
    children,
    label,
    data,
    onChange = () => {},
}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    return (
        <MenuProvider menuRef={menuRef} data={data} onChange={onChange}>
            <div ref={menuRef} className="relative">
                <MenuLabel>{label}</MenuLabel>
                {children}
            </div>
        </MenuProvider>
    );
};

export default Menu;
