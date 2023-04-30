import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { API_URL } from "../utils/const";
import { v4 as uuidv4 } from "uuid";

interface SearchProviderProps {
    children: React.ReactNode;
}

interface ISearchContext {
    searchKeyword: string;
    showResults: boolean;
    suggestionKeywords: ISearchSuggestionKeywords[];
    suggestionKeywordHistorys: ISearchSuggestionKeywords[];
    setSuggestionKeywords: React.Dispatch<
        React.SetStateAction<ISearchSuggestionKeywords[]>
    >;
    setSuggestionKeywordHistories: React.Dispatch<
        React.SetStateAction<ISearchSuggestionKeywords[]>
    >;
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
    removeSuggestionKeywordHistorys: (_id: string) => void;
    addSuggestionKeywordHistorys: (keyword: string) => void;
}

interface ISearchSuggestionKeywords {
    _id: string;
    keyword: string;
    similarity?: number;
}

const SearchContext = React.createContext<ISearchContext | null>(null);

const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [showResults, setShowResults] = useState(false);
    const [suggestionKeywords, setSuggestionKeywords] = useState<
        ISearchSuggestionKeywords[]
    >([]);
    const [suggestionKeywordHistorys, setSuggestionKeywordHistories] = useState<
        ISearchSuggestionKeywords[]
    >([]);

    useEffect(() => {
        const storageData = localStorage.getItem("search-history");
        if (!storageData) return;
        setSuggestionKeywordHistories(JSON.parse(storageData));
    }, []);

    useEffect(() => {
        handleGetSuggestionKeywords(searchKeyword);
    }, [searchKeyword]);

    const handleGetSuggestionKeywords = async (keyword: string) => {
        if (!keyword.trim()) {
            setSuggestionKeywords([]);
            return;
        }
        try {
            const res = await axios({
                method: "GET",
                url: API_URL + `/search/video`,
                params: {
                    keyword: keyword,
                },
                withCredentials: true,
            });

            setSuggestionKeywords(res.data);
            setShowResults(true);
        } catch (error) {
            console.log(error);
        }
    };

    const removeSuggestionKeywordHistorys = (_id: string) => {
        const newSuggestionKeywordHistories = suggestionKeywordHistorys.filter(
            (item) => item._id !== _id
        );
        setSuggestionKeywordHistories(newSuggestionKeywordHistories);
        localStorage.setItem(
            "search-history",
            JSON.stringify(newSuggestionKeywordHistories)
        );
    };

    const addSuggestionKeywordHistorys = (keyword: string) => {
        let newSuggestionKeywordHistories;
        if (suggestionKeywordHistorys.length > 10) {
            suggestionKeywordHistorys.pop();
            newSuggestionKeywordHistories = suggestionKeywordHistorys;
        } else {
            newSuggestionKeywordHistories = suggestionKeywordHistorys;
        }

        newSuggestionKeywordHistories = newSuggestionKeywordHistories.filter(
            (item) => item.keyword !== keyword
        );

        newSuggestionKeywordHistories.unshift({
            _id: uuidv4(),
            keyword: keyword,
        });

        setSuggestionKeywordHistories(newSuggestionKeywordHistories);
        localStorage.setItem(
            "search-history",
            JSON.stringify(newSuggestionKeywordHistories)
        );
    };

    const values = {
        suggestionKeywordHistorys,
        suggestionKeywords,
        searchKeyword,
        showResults,
        setShowResults,
        setSearchKeyword,
        setSuggestionKeywords,
        setSuggestionKeywordHistories,
        removeSuggestionKeywordHistorys,
        addSuggestionKeywordHistorys,
    };

    return (
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    );
};

const useSearch = () => {
    const context = useContext(SearchContext);
    if (typeof context === "undefined")
        throw new Error("useSearch must be used within SearchProvider");
    return context;
};

export { useSearch, SearchProvider };
