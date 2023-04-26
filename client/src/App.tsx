import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./routers/Routes";

function ScrollToTop({ history }: { history: any }) {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, [history]);

    return null;
}

function App() {
    return <RouterProvider router={Router}></RouterProvider>;
}

export default App;
