import store, { reducer } from "../store";

type RootState = ReturnType<typeof reducer>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
