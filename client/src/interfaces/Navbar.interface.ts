import React from "react";

export type NavbarTagType = "All" | "Music" | "Pops" | "Code" | "Book";
export interface INavbarItem {
    label: NavbarTagType;
}
