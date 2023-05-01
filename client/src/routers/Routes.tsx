import { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/mainLayout/MainLayout";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import VideoPage from "../pages/VideoPage";
import ResultPage from "../pages/ResultPage";
import SubscriptionPage from "../pages/SubscriptionPage";
import LibraryPage from "../pages/LibraryPage";
import TrendingPage from "../pages/TrendingPage";
import HistoryPage from "../pages/HistoryPage";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>,
            },
            {
                path: "/subscriptions",
                element: <SubscriptionPage></SubscriptionPage>,
            },
            {
                path: "/library",
                element: <LibraryPage></LibraryPage>,
            },
            {
                path: "/trending",
                element: <TrendingPage></TrendingPage>,
            },
            {
                path: "/history",
                element: <HistoryPage></HistoryPage>,
            },
            {
                path: "/video/:id",
                element: <VideoPage></VideoPage>,
            },
            {
                path: "/results",
                element: <ResultPage></ResultPage>,
            },
            {
                path: "/auth",
                element: <AuthPage></AuthPage>,
            },
        ],
    },
]);

export default Router;
