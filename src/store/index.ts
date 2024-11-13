import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import paint from "../slices/paint";
import { sessionMiddleware } from "../lib/redux/middleware";
import loadState from "../lib/redux/preloadState";

const reducer = { paint };

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sessionMiddleware),
  preloadedState: loadState(),
});

export default store;
