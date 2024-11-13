import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import paint from "../slices/paint";

const reducer = { paint };

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
