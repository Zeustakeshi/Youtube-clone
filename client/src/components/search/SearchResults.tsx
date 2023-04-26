import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { ForwardedRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSearchHistory } from "../../redux/slices/search/searchSlice";
import { RootState } from "../../redux/store";
import useClickOutSide from "./useClickOutsite";

const SearchResults = (
    { setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> },
    ref: ForwardedRef<HTMLDivElement>
) => {
    const { searchHistory, keywordSuggestions } = useSelector(
        (state: RootState) => state.search
    );

    const nodeRef = ref;
    const { nodeRef: clickRef } = useClickOutSide<HTMLDivElement>(() => {
        console.log("out");
        setShow(false);
    }, nodeRef);

    return (
        <div
            ref={clickRef}
            className="absolute top-[120%] left-0 w-full py-3 rounded-lg z-50 bg-white shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px]"
        >
            {keywordSuggestions.length <= 0 &&
                searchHistory &&
                [...searchHistory].slice(0, 10).map((item, index) => {
                    return (
                        <SearchResultItem
                            key={index}
                            id={item.id}
                            keyword={item.value}
                            isHistory
                        />
                    );
                })}
        </div>
    );
};

interface SearchResultItemProps {
    keyword: string;
    id: string;
    isHistory?: boolean;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
    keyword,
    id,
    isHistory = false,
}) => {
    const dispatch = useDispatch();

    return (
        <div className="p-3 flex justify-between items-center hover:bg-slate-100 cursor-pointer">
            <div className="flex justify-start items-center gap-2">
                {isHistory && (
                    <div>
                        <HistoryOutlinedIcon fontSize="small" />
                    </div>
                )}
                <p className="font-medium">{keyword}</p>
            </div>
            {isHistory && (
                <button
                    className="text-blue-500"
                    onClick={() => dispatch(removeSearchHistory(id))}
                >
                    Xóa
                </button>
            )}
        </div>
    );
};

export default forwardRef(SearchResults);
