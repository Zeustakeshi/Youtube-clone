import { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/mainLayout/MainLayout";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import VideoPage from "../pages/VideoPage";

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
                path: "/video/:id",
                element: <VideoPage></VideoPage>,
            },
            {
                path: "/auth",
                element: <AuthPage></AuthPage>,
            },
        ],
    },
]);

export default Router;
