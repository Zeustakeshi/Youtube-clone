export type navItemLabelType =
    | "Tất cả"
    | "Hoạt hình"
    | "Trò chơi"
    | "Lập trình"
    | "Javascript"
    | "Âm nhạc"
    | "Hài kịch";

export interface INavItem {
    label: navItemLabelType;
    to: string;
}

export interface INavbarProps {
    setActive: React.Dispatch<React.SetStateAction<INavItem>>;
    active: INavItem;
    items: INavItem[];
}

export interface INavItemProps {
    isActive: boolean;
    data: INavItem;
    onClick?: () => void;
}
