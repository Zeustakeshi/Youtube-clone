import React, { useEffect } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { AxiosResponse } from "axios";
import { useSearch } from "../../context/SearchContext";

interface ISearchInput {}

const SearchInput: React.FC<ISearchInput> = ({}) => {
    const [searchValue, setSearchValue] = useState("");
    // const [inputFocus, setInputFocus] = useState(false);
    const [showClearButton, setShowClearButton] = useState(false);

    const search = useSearch();

    //Ref
    const inputRef = useRef<HTMLInputElement>(null);

    // Debounce
    const debounceValue = useDebounce<string>(searchValue);

    // Effect

    useEffect(() => {
        search?.setSearchKeyword(debounceValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue]);

    // Handller
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(val);
        if (val.trim()) setShowClearButton(true);
        else setShowClearButton(false);
    };
    return (
        <div
            className={`relative flex flex-1 border border-gray-300 rounded-tl-full rounded-bl-full px-3 py-1 gap-2 transition-all min-w-[540px] h-[42px] 
            focus-within:border-blue-600 focus-within:shadow-[rgba(204,219,232,0.5)_3px_3px_6px_0px_inset]
        `}
        >
            <div className="header-search-input flex order-2 h-full w-full">
                <input
                    ref={inputRef}
                    className=" bg-transparent px-1 h-full w-full border-none outline-none transition-all"
                    type="text"
                    placeholder="Tìm kiếm"
                    onChange={handleChange}
                    // onBlur={() => (isFocusedRef.current = false)}
                    onFocus={() => search?.setShowResults(true)}
                    value={searchValue}
                />
            </div>
            {showClearButton && (
                <button
                    className="text-slate-500 flex justify-center items-center order-last"
                    onClick={() => {
                        inputRef.current?.focus();
                        setShowClearButton(false);
                        setSearchValue("");
                    }}
                >
                    <CloseIcon fontSize="small" />
                </button>
            )}
            <div className="header-search-icon  order-1 text-gray-400 transition-all hidden justify-center items-center">
                <SearchRoundedIcon fontSize="small" />
            </div>
        </div>
    );
};

export default SearchInput;
