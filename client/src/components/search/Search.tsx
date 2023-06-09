import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Tooltip } from "@mui/material";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { RootState } from "../../redux/store";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const Search = () => {
    const ref = useRef<HTMLDivElement>(null);
    const search = useSearch();
    const navigation = useNavigate();

    const { isMobile } = useSelector((state: RootState) => state.app);

    const handleClickButtonSearch = () => {
        if (!search?.searchKeyword.trim()) return;
        search?.addSuggestionKeywordHistorys(search.searchKeyword);
        navigation(`/results?q=${encodeURIComponent(search.searchKeyword)}`);
    };
    return (
        <div
            ref={ref}
            className={`relative z-40 flex justify-center items-center text-sm h-[42px] 
            `}
        >
            <SearchInput />
            {!isMobile && (
                <Tooltip title="Tìm kiếm">
                    <button
                        onClick={handleClickButtonSearch}
                        className=" hover:bg-gray-200 rounded-tr-full rounded-br-full border-gray-300 border bg-gray-100 h-[42px] w-[60px] md:flex hidden justify-center items-center "
                    >
                        <SearchRoundedIcon fontSize="small" />
                    </button>
                </Tooltip>
            )}
            {search?.showResults && <SearchResult ref={ref} />}
        </div>
    );
};

export default Search;
