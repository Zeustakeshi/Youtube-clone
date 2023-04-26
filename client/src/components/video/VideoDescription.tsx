import React, { useState } from "react";

const VideoDescription = () => {
    const [showAll, setShowAll] = useState(false);
    return (
        <div className="my-4 w-full rounded-lg bg-zinc-200 p-4 transition-all">
            <h5 className="flex justify-start items-center gap-1 text-sm font-medium">
                <span>8.818.204 </span>
                <span> lượt xem </span>
                <span>25 thg 7, 2022</span>
            </h5>
            <div
                className={`text-sm ${
                    !showAll ? "max-h-[50px] overflow-clip" : ""
                }`}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus ducimus autem facere sunt totam, vero magnam,
                blanditiis, ea quia ipsa voluptatibus. Enim natus dolorem
                officiis sit accusamus laudantium voluptates recusandae quaerat
                reiciendis laborum velit corrupti, saepe autem itaque libero ut
                laboriosam repellat, neque consectetur fuga? Nobis corrupti
                nostrum ipsa dolore facilis porro est a eos eius nemo.
                Cupiditate fugit totam id cumque, voluptatibus obcaecati qui
                quisquam fugiat in et voluptas deleniti architecto optio volupta
                <div>
                    tatem nulla quo recusandae sint sequi! Et id aspernatur ex
                    cumque expedita ducimus perspiciatis animi sint consequatur,
                    soluta eius dolorem fugiat veniam iure eveniet totam. Unde,
                    quibusdam.
                </div>
            </div>
            <button
                className="text-xs p-1 ml-auto"
                onClick={() => setShowAll((prev) => !prev)}
            >
                {showAll ? "Ẩn bớt" : "Xem thêm"}
            </button>
        </div>
    );
};

export default VideoDescription;
