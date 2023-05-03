import React, { forwardRef, ForwardRefRenderFunction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import useClickOutSide from "../../hooks/useClickOutsite";
import SearchResultItem from "./SearchResultItem";

interface ISearchResultProps {}

type SearchResultType = ForwardRefRenderFunction<
    HTMLDivElement,
    ISearchResultProps
>;

interface ISearchSuggestionKeywords {
    from: "history" | "api";
    _id: string;
    keyword: string;
    similarity?: number;
}

const SearchResult: SearchResultType = (
    {},
    ref: React.ForwardedRef<HTMLDivElement>
) => {
    // Custom hook
    const navigation = useNavigate();
    const search = useSearch();

    // Ref
    const nodeRef = ref;
    const { nodeRef: clickRef } = useClickOutSide<HTMLDivElement>(() => {
        search?.setShowResults(false);
    }, nodeRef);

    if (
        !search?.suggestionKeywords?.length &&
        !search?.suggestionKeywordHistorys.length
    ) {
        return <></>;
    }
    return (
        <div
            ref={clickRef}
            className="bg-white z-50 absolute top-[120%] left-0 w-full py-3 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px]"
        >
            {search?.suggestionKeywords.map((item, index) => {
                return (
                    <SearchResultItem
                        key={index}
                        _id={item._id}
                        onClick={() => {
                            navigation(`/results?q=${item.keyword}`);
                        }}
                        keyword={item.keyword}
                    />
                );
            })}
            {search.suggestionKeywords.length <= 10 &&
                search?.suggestionKeywordHistorys.map((item, index) => {
                    return (
                        <SearchResultItem
                            isHistory
                            _id={item._id}
                            key={index}
                            onClick={() => {
                                navigation(`/results?q=${item.keyword}`);
                            }}
                            keyword={item.keyword}
                        />
                    );
                })}
        </div>
    );
};

export default forwardRef(SearchResult);
