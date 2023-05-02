import React, { useContext, useState } from "react";
import { IMenuData, IMenuItem } from "../interfaces/Menu.interface";

interface MenuProviderProps {
    menuRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    data: IMenuData;
    onChange: (item: IMenuItem) => void;
}

interface IMenuContext {
    menuRef: React.RefObject<HTMLDivElement>;
    data: IMenuData;
    show: boolean;
    onChange: (item: IMenuItem) => void;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    history: IMenuData[];
    setHistory: React.Dispatch<React.SetStateAction<IMenuData[]>>;
}

const MenuContext = React.createContext<IMenuContext | null>(null);

const MenuProvider: React.FC<MenuProviderProps> = ({
    menuRef,
    children,
    data,
    onChange,
}) => {
    const [show, setShow] = useState(false);
    const [history, setHistory] = useState<IMenuData[]>([data]);

    const values = {
        menuRef,
        data,
        show,
        history,
        setShow,
        setHistory,
        onChange,
    };
    return (
        <MenuContext.Provider value={values}>{children}</MenuContext.Provider>
    );
};

const useMenu = () => {
    const context = useContext(MenuContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useMenu must be used within MenuProvider");
    }
    return context;
};

export { useMenu, MenuProvider };
