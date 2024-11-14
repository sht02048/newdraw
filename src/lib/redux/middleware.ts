import { Middleware } from "@reduxjs/toolkit";

import { SESSION_KEY } from "../../constant";
import { RootState } from "../../types/redux";

const sessionMiddleware: Middleware<object, RootState> =
  (storeAPI) => (next) => (action) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(storeAPI.getState()));

    return next(action);
  };

export { sessionMiddleware };
