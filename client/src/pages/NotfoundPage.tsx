import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotfoundPage = () => {
    useEffect(() => {
        document.title = "404 Not Found";
    }, []);
    const navigation = useNavigate();
    return (
        <div className="w-full h-screen bg-gradient-to-r  from-indigo-400 to-pink-300 flex justify-center items-center">
            <div className="bg-white shadow-2xl min-w-[800px] min-h-[500px] rounded-lg p-4">
                <h1 className="text-8xl text-center my-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-400 ">
                    404
                </h1>
                <div className="flex flex-col justify-center items-center max-w-[600px] mx-auto text-center h-full text-2xl font-semibold">
                    <p className="my-4 uppercase w-full text-center text-slate-800">
                        opp! page not found
                    </p>
                    <p className="text-lg font-normal text-slate-700">
                        Sorry, the page you're looking for doesn't exist. if you
                        think something is broken, report a problem
                    </p>
                </div>
                <div className="w-full flex justify-center my-6">
                    <button
                        onClick={() => navigation("/")}
                        className="mx-auto inline-block px-5 py-3 bg-gradient-to-r from-pink-300 to-indigo-400 text-white font-semibold rounded-lg"
                    >
                        Go to home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotfoundPage;
