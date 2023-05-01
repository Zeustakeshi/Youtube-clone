import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const UploadVideo = () => {
    const [title, setTitle] = useState("");
    const [thumbnailURL, setThumbnailURL] = useState("");
    const [youtubeID, setYoutubeID] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    return (
        <div className="p-4 pt-0 max-w-[850px]">
            <h4 className="mb-4 text-center font-medium text-xl">
                Tạo video mới
            </h4>
            <div className="px-4 py-4 flex flex-col justify-start items-end gap-4">
                <div className="flex justify-center items-start flex-col gap-2 w-full">
                    <label
                        className="w-full  text-lg font-medium text-slate-600"
                        htmlFor="ip-video-title"
                    >
                        Tên video
                    </label>
                    <input
                        className="w-full outline-blue-500 border border-slate-400 px-5 py-3 rounded-md"
                        type="text"
                        id="ip-video-title"
                        placeholder="Video"
                        required
                    />
                </div>
                <div className="w-full flex justify-between items-center gap-4">
                    <div className="flex justify-center items-start flex-col gap-2 w-full">
                        <label
                            className="w-full  text-lg font-medium text-slate-600"
                            htmlFor="ip-video-thumbnail"
                        >
                            Địa chỉ ảnh bìa
                        </label>
                        <input
                            className="w-full outline-blue-500 border border-slate-400 px-5 py-3 rounded-md"
                            type="text"
                            id="ip-video-thumbnail"
                            placeholder="URL"
                            required
                        />
                    </div>
                    <div className="flex justify-center items-start flex-col gap-2 w-full">
                        <label
                            className="w-full  text-lg font-medium text-slate-600"
                            htmlFor="ip-video-youtube-id"
                        >
                            Youtube ID
                        </label>
                        <input
                            className="w-full outline-blue-500 border border-slate-400 px-5 py-3 rounded-md"
                            type="text"
                            id="ip-video-youtube-id"
                            placeholder="ID"
                            required
                        />
                    </div>
                </div>
                <InputTags tags={tags} setTags={setTags}></InputTags>
                <button
                    type="submit"
                    className="mt-5 px-5 py-3 rounded-md bg-blue-500 text-white text-lg font-medium"
                >
                    Tạo
                </button>
            </div>
        </div>
    );
};

interface InputTagsProps {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const InputTags: React.FC<InputTagsProps> = ({ tags, setTags }) => {
    const [tagValue, setTagValue] = useState("");
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCloseInput = () => {
        setShowInput(false);
    };

    const handleAddTag = () => {
        if (!tagValue.trim()) return;
        setTags((prev) => [...prev, tagValue]);
        setTagValue("");
        setShowInput(false);
    };
    const handleRemoveTag = (index: number) => {
        setTags((prev) => prev.filter((tag, i) => i !== index));
    };
    return (
        <div className="w-full my-4 h-[250px] max-w-[800px]">
            <h3 className="w-full mb-3  text-lg font-medium text-slate-600">
                Nhập từ khóa cho video của bạn
            </h3>
            <div className="w-full h-full overflow-auto border rounded border-slate-400 p-2 flex justify-start items-start flex-wrap gap-2">
                {tags.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="relative group px-2 py-1 rounded-lg bg-gray-300"
                        >
                            {item}
                            <span
                                onClick={() => {
                                    handleRemoveTag(index);
                                }}
                                className=" absolute -top-1 -right-1 bg-gray-400 z-50 rounded-full text-xs w-4 h-4 group-hover:flex hidden  justify-center items-center text-white cursor-pointer"
                            >
                                <CloseOutlinedIcon fontSize="inherit" />
                            </span>
                        </div>
                    );
                })}
                {!showInput && tags.length <= 30 && (
                    <button
                        onClick={() => setShowInput(true)}
                        className="w-[40px] h-[40px] flex justify-center items-center rounded-md bg-gray-200"
                    >
                        <AddIcon fontSize="small" />
                    </button>
                )}
                {showInput && (
                    <span className="relative max-w-[150px]">
                        <input
                            ref={inputRef}
                            className="w-full border-b outline-none focus:border-b-blue-500"
                            autoFocus
                            value={tagValue}
                            onChange={(e) => setTagValue(e.target.value)}
                            onBlur={handleCloseInput}
                            type="text"
                            placeholder="tag"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAddTag();
                                }
                            }}
                        />
                    </span>
                )}
            </div>
        </div>
    );
};

export default UploadVideo;
