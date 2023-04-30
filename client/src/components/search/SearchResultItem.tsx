import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
interface ISearchResultItem {
    keyword: string;
    onClick: () => void;
    isHistory?: boolean;
}
const SearchResultItem: React.FC<ISearchResultItem> = ({
    keyword,
    isHistory = false,
}) => {
    return (
        <div className="px-3 py-2 hover:bg-gray-200 cursor-pointer font-medium flex justify-start gap-2 items-center">
            <span className="text-gray-500">
                {isHistory ? (
                    <RestoreRoundedIcon fontSize="small" />
                ) : (
                    <SearchRoundedIcon fontSize="small" />
                )}
            </span>
            <span className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
                {keyword}
            </span>
            {isHistory && (
                <button className="text-sm text-blue-500 font-normal">
                    Xóa
                </button>
            )}
        </div>
    );
};

export default SearchResultItem;
