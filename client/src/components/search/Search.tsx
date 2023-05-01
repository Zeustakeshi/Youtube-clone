import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const Search = () => {
    const ref = useRef<HTMLDivElement>(null);
    const search = useSearch();
    const navigation = useNavigate();
    const handleClickButtonSearch = () => {
        if (!search?.searchKeyword.trim()) return;
        search?.addSuggestionKeywordHistorys(search.searchKeyword);
        navigation(`/results?q=${encodeURIComponent(search.searchKeyword)}`);
    };
    return (
        <div
            ref={ref}
            className="relative z-40 flex justify-center items-center text-sm h-[42px]"
        >
            <SearchInput />
            <button
                onClick={handleClickButtonSearch}
                className="hover:bg-gray-200 rounded-tr-full rounded-br-full border-gray-300 border bg-gray-100 h-[42px] w-[60px] flex justify-center items-center "
            >
                <SearchRoundedIcon fontSize="small" />
            </button>
            {search?.showResults && <SearchResult ref={ref} />}
        </div>
    );
};

export default Search;
