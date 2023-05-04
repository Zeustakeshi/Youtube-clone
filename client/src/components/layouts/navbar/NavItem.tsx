import { INavItemProps } from "../../../interfaces/Navbar.interface";

const NavItem: React.FC<INavItemProps> = ({
    isActive,
    data,
    onClick = () => {},
}) => {
    return (
        <div
            onClick={onClick}
            className={`md:px-4 md:py-1 px-2 py-1 rounded-md cursor-pointer md:text-sm text-xs min-w-max ${
                isActive ? "bg-black text-white" : "bg-gray-100"
            }`}
        >
            {data.label}
        </div>
    );
};

export default NavItem;
