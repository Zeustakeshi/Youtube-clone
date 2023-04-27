import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import appSlice from "./slices/app/appSlice";
import searchSlice from "./slices/search/searchSlice";
import userSlice from "./slices/user/userSlice";
import videoSlice from "./slices/video/videoSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: userSlice,
        search: searchSlice,
        video: videoSlice,
    },
    middleware: (gDM) => gDM({ thunk: false }).concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
