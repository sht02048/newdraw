import logger from "redux-logger";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import paint from "../slices/paint";
import loadState from "../lib/redux/preloadState";
import { sessionMiddleware } from "../lib/redux/middleware";

const reducer = combineReducers({ paint });

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sessionMiddleware),
  preloadedState: loadState(),
});

export { reducer };
export default store;
