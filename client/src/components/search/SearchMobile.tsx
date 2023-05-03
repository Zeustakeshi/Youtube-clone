import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Tooltip } from "@mui/material";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { RootState } from "../../redux/store";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const SearchMobile = () => {
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
            className={`relative w-full z-40 flex justify-center items-center text-sm h-[42px] 
            `}
        >
            <SearchInput />
            {search?.showResults && <SearchResult ref={ref} />}
        </div>
    );
};

export default SearchMobile;
