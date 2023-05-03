import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../../interfaces/App.interface";

const initialState: AppState = {
    theme: "light",
    isOpenMenu: true,
    isMobile: false,
    menuSize: "large",
    menuStatus: "hidden",
};

const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        toggleMenu(state) {
            state.isOpenMenu = !state.isOpenMenu;
            state.menuSize = state.menuSize === "large" ? "mini" : "large";
        },
        updateMenuSize(state, action: PayloadAction<"large" | "mini">) {
            state.menuSize = action.payload;
        },
        updateMenuStatus(state, action: PayloadAction<"show" | "hidden">) {
            state.menuStatus = action.payload;
        },
        setIsMobile(state, action: PayloadAction<boolean>) {
            state.isMobile = action.payload;
        },
    },
});

export const { toggleMenu, updateMenuStatus, updateMenuSize, setIsMobile } =
    appSlice.actions;
export default appSlice.reducer;
