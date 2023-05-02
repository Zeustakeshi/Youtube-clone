import { IMenuItem } from "../../../../interfaces/Menu.interface";
import { logout } from "../../../../redux/slices/user/userSlice";
import { store } from "../../../../redux/store";
import { MenuType } from "./AccountMenuHelper";

export const handleLogout = () => {
    store.dispatch(logout());
};

export const handleChangeMenu = (item: IMenuItem) => {
    switch (item.type) {
        case MenuType.LOGOUT:
            handleLogout();
            break;
        default:
            break;
    }
};
