import { SESSION_KEY } from "../../constant";

const sessionMiddleware = (storeAPI) => (next) => (action) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(storeAPI.getState()));

  return next(action);
};

export { sessionMiddleware };
