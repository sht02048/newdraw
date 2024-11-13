const sessionMiddleware = (storeAPI) => (next) => (action) => {
  sessionStorage.setItem("appState", JSON.stringify(storeAPI.getState()));

  return next(action);
};

export { sessionMiddleware };
