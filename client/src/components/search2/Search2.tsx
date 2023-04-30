import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import {
    fetchSearchKeyword,
    loadSearchHistory,
    setSearchHistory,
} from "../../redux/slices/search/searchSlice";
import SearchResults from "./SearchResults";

export const Search = () => {
    const [inputFocus, setInputFocus] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debounceValue = useDebounce<string>(searchValue);
    const [showClearButton, setShowClearButton] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const nodeRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSearchHistory());
    }, []);

    useEffect(() => {
        if (!debounceValue.trim()) return;
        dispatch(fetchSearchKeyword(debounceValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue]);

    return (
        <div
            ref={nodeRef}
            className="relative z-40 flex justify-center items-center text-sm h-[42px]"
        >
            <div
                className={`relative flex flex-1 border border-gray-300 rounded-tl-full rounded-bl-full px-3 py-1 gap-2 transition-all min-w-[540px] h-[42px] 
            ${
                inputFocus
                    ? " !border-blue-600 shadow-[rgba(204,219,232,0.5)_3px_3px_6px_0px_inset]"
                    : ""
            }
            `}
            >
                <div
                    className={`text-gray-400 transition-all  flex justify-center items-center ${
                        inputFocus ? "" : "hidden"
                    }
                    `}
                >
                    <SearchRoundedIcon fontSize="small" />
                </div>
                <div className="h-full w-full">
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={(e) => {
                            if (!e.target.value.trim()) {
                                setShowClearButton(false);
                            } else {
                                setShowClearButton(true);
                            }
                            setSearchValue(e.target.value);
                        }}
                        className="bg-transparent px-1 h-full w-full border-none outline-none transition-all"
                        onFocus={() => {
                            setInputFocus(true);
                            setShowResults(true);
                        }}
                        onBlur={() => setInputFocus(false)}
                        type="text"
                        placeholder="Tìm kiếm"
                    />
                </div>
                {showClearButton && (
                    <button
                        className="text-slate-500"
                        onClick={() => {
                            inputRef.current?.focus();
                            setSearchValue("");
                            setShowClearButton(false);
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </button>
                )}
            </div>
            <button
                onClick={() => {
                    dispatch(setSearchHistory("hello"));
                }}
                className="hover:bg-gray-200 rounded-tr-full rounded-br-full border-gray-300 border bg-gray-100 h-[42px] w-[60px] flex justify-center items-center "
            >
                <SearchRoundedIcon fontSize="small" />
            </button>
            {showResults && (
                <SearchResults setShow={setShowResults} ref={nodeRef} />
            )}
        </div>
    );
};
