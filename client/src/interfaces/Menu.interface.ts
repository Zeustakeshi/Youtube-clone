import React from "react";

export interface IMenuGroup {
    name?: string;
    items: IMenuItem[];
    hidden?: boolean;
    maxItem?: number;
    showMoreLabel?: string;
    children?: React.ReactNode;
}

export interface IMenuItem {
    isOpen?: boolean;
    Icon: React.ReactNode;
    label: string;
    to?: string;
}
