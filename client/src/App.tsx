import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./routers/Routes";

function App() {
    return <RouterProvider router={Router}></RouterProvider>;
}

export default App;
