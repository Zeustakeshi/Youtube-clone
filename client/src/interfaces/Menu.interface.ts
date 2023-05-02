import React from "react";

export interface ICollapsedMenuGroup {
    name?: string;
    items: ICollapsedMenuItem[];
    hidden?: boolean;
    maxItem?: number;
    showMoreLabel?: string;
    children?: React.ReactNode;
}

export interface ICollapsedMenuItem {
    isOpen?: boolean;
    Icon: React.ReactNode;
    label?: string;
    to?: string;
}

export interface IMenuItem {
    type?: string;
    title: string;
    children?: IMenuData;
    to?: string;
    icon?: React.ReactNode;
}

export interface IMenuData {
    header: React.ReactNode;
    data: IMenuItem[];
}
